import {Button} from "@/components/ui/button.tsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {FormEvent, useState} from "react";
import axiosInstance from "@/lib/axios.ts";
import {useNavigate} from "react-router";
import GoogleAuth from "@/components/GoogleAuth.tsx";
import {useDispatch} from "react-redux";
import {setUser} from "@/lib/store/authSlice.ts";

interface FormData {
    email: string;
    password: string;
}

const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState<FormData>({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const {data} = await axiosInstance.post("/auth/sign-in", form);
            if(data.success){
                dispatch(setUser(data.user))
            }

            navigate("/dashboard");
        }catch(error: any){
            console.log(error);
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Card className="w-[350px]">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Sign in</CardTitle>
                        <CardDescription>Sign in to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GoogleAuth/>
                        <div className="grid w-full items-center gap-4 mt-3">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                            </div>
                        </div>

                        <div className="grid w-full items-center gap-4 mt-3">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type='password' id="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}/>
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type='submit'>Sign up</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default SignIn
