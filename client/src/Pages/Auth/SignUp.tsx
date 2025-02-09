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
import {setUser} from "@/lib/store/authSlice.ts";
import {useDispatch} from "react-redux";

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const {data} = await axiosInstance.post("/auth/sign-up", form);
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
                        <CardTitle>Sign up</CardTitle>
                        <CardDescription>Create a account for free.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <GoogleAuth/>
                        <div className="grid w-full items-center gap-4 mt-3">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                        </div>
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

export default SignUp
