import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { toast } from "sonner";
import { loginUser, signupUser } from "@/state/user/user-slice";
import { toggleAuth } from "@/state/auth/auth-slice";
import { useToast } from "./ui/use-toast";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      await dispatch(
        signupUser({ email: values.email, password: values.password })
      );

      dispatch(toggleAuth());
      setIsLoading(false);
      form.reset();

      // toast("login successfull!");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="max-w-[300px] rounded-md sm:max-w-[425px] font-sg">
      <DialogHeader>
        <DialogTitle className="font-sgb">Singup</DialogTitle>
        <DialogDescription>Let's get you an account!</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  p-5">
          {/* <div className="flex flex-col">
            <FormLabel className="text-xl font-bold">Signin</FormLabel>
            <FormLabel className="text-sm text-slate-500">to Tijori</FormLabel>
          </div> */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tonystark@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passord</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Jarvis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isLoading ? (
            <Button disabled className="w-full max-w-[400px]">
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Signin in...
            </Button>
          ) : (
            <Button className="w-full max-w-[400px]" type="submit">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </DialogContent>
  );
};

export default SignUp;
