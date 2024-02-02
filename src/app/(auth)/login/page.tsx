"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post(
        "https://phase2-aio.vercel.app/apis/login",
        values
      );
      console.log(res);
      router.push("/"); // later go to dashboard or something
    } catch (error) {
      toast.error("Login error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:item-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Login</h1>
        <p className="text-sm text-slate-600">
          Enter your credentials to access the site.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="test@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your registered email here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} type="password" {...field} />
                  </FormControl>
                  <FormDescription>Enter your password here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex item-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Home
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
