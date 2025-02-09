import { Button } from "@/components/ui/button.tsx";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase.ts";
import axiosInstance from "@/lib/axios.ts";
import { useNavigate } from "react-router";
import {useDispatch} from "react-redux";
import {setUser} from "@/lib/store/authSlice.ts";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleSignIn = async (user: any) => {
    const { displayName, email, photoURL } = user;
    try {
      const { data } = await axiosInstance.post("/auth/google-sign-in", {
        name: displayName,
        email,
        avatar: photoURL,
      });
      if(data.success){
        dispatch(setUser(data.user));
        navigate("/dashboard");
      };

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
