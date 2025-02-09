export const PLANS: Plan[] = [
  {
    name: "Free",
    credits: 3,
    description: "For small side projects.",
    features: [
      {
        text: "{} monthly credits",
      },
      {
        text: "Bonus credits for daily login",
      },
      {
        text: "Fast-track generation",
        negative: true,
      },
      {
        text: "Remove watermarks",
        negative: true,
      },
      {
        text: "Priority access to new features",
        negative: true,
      },
    ],
  },
  {
    name: "Standard",
    credits: 1000,
    description: "For larger projects with higher needs.",
    features: [
      {
        text: "{} monthly credits",
      },
      {
        text: "Bonus credits for daily login",
      },
      {
        text: "Fast-track generation",
      },
      {
        text: "Remove watermarks",
      },
      {
        text: "Priority access to new features",
      },
    ],
  },
  {
    name: "Pro",
    credits: 4500,
    description: "For larger projects with higher needs.",
    features: [
      {
        text: "{} monthly credits",
      },
      {
        text: "Bonus credits for daily login",
      },
      {
        text: "Fast-track generation",
      },
      {
        text: "Remove watermarks",
      },
      {
        text: "Priority access to new features",
      },
    ],
  },
];
