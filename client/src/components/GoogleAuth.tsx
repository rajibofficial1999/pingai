import { Button } from "@/components/ui/button.tsx";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase.ts";
import axiosInstance from "@/lib/axios.ts";
import { useNavigate } from "react-router";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const googleSignIn = async (user: any) => {
    const { displayName, email, photoURL } = user;
    try {
      const response = await axiosInstance.post("/auth/google-sign-in", {
        name: displayName,
        email,
        avatar: photoURL,
      });
      console.log(response);

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    const googleResponse = await signInWithPopup(auth, provider);
    await googleSignIn(googleResponse.user);
  };
  return (
    <Button type="button" onClick={handleSignIn}>
      Sign in with Google
    </Button>
  );
};

export default GoogleAuth;
