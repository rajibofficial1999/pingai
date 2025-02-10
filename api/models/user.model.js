import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    bio: String,
    avatar: String,
    stripeSubscriptionId: {
      type: String,
      default: null,
    },
    stripePriceId: String,
    stripeCurrentPeriodEnd: Date,
    availableCredits: Number,
  },
  { timestamps: true }
);

userSchema.index(
  { stripeSubscriptionId: 1 },
  {
    unique: true,
    partialFilterExpression: { stripeSubscriptionId: { $ne: null } },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
