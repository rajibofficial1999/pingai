import axiosInstance from "@/lib/axios";

export const getStripeProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/stripe/products");

    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getUserPlan = async (subscriptionId: string) => {
  try {
    const { data } = await axiosInstance.post("/stripe/user-plan", {
      subscriptionId,
    });

    return data;
  } catch (error: any) {
    console.log(error);
  }
};
