import axiosInstance from "@/lib/axios";

export const getUser = async () => {
  try {
    const { data } = await axiosInstance.get("/user");
    return data.user;
  } catch (error: any) {
    console.log(error);
  }
};
