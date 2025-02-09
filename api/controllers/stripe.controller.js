import Stripe from "stripe";
import User from "../models/user.model.js";

export const checkout = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { price, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?payment_status=success`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?payment_status=cancel`,
      metadata: { userId },
    });

    return res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export async function getUserPlan(req, res) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { subscriptionId } = req.body;

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price.product"],
    });

    const plans = subscription.items.data.map((item) => ({
      id: item.price.product.id,
      name: item.price.product.name,
      price_id: item.price.id,
      amount: item.price.unit_amount / 100,
      interval: item.price.recurring.interval,
    }));

    return res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getStripeProducts = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const prices = await stripe.prices.list({ expand: ["data.product"] });

    // Organize products with their prices
    const productsWithPrices = prices.data.reduce((acc, price) => {
      const product = price.product;

      if (!acc[product.id]) {
        acc[product.id] = {
          id: product.id,
          name: product.name,
          prices: [],
        };
      }

      acc[product.id].prices.push({
        id: price.id,
        currency: price.currency,
        unit_amount: price.unit_amount / 100,
        recurring: price.recurring ? price.recurring.interval : null,
      });

      return acc;
    }, {});

    return res.status(200).json(Object.values(productsWithPrices));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const stripeWebhook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event = req.body;

  if (webhookSecret) {
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (!session?.metadata?.userId) {
      return res.status(200).json("");
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription
    );

    await User.findOneAndUpdate(
      { _id: session.metadata.userId },
      {
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
      { runValidators: true }
    );
  }

  res.send();
};
