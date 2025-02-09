import express from "express";
import {
  checkout,
  getStripeProducts,
  getUserPlan,
  stripeWebhook,
} from "../controllers/stripe.controller.js";
import bodyParser from "body-parser";

const StripeRouter = express.Router();

StripeRouter.post("/create-checkout-session", checkout);

StripeRouter.post("/user-plan", getUserPlan);

StripeRouter.get("/products", getStripeProducts);

StripeRouter.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhook
);

export default StripeRouter;
