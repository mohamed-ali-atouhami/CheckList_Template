import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useUserContext } from "@/Context/UserContext";
import { ADMIN_DASHBOARD_ROUTE, EMPLOYE_DASHBOARD_ROUTE, redirectToDashboard } from "@/router";

const formSchema = z.object({
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(30),
});

export default function UserLogin() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    setError,
    formState: { isSubmitting },
  } = form;
  const navigate = useNavigate();
  const { setIsAuthenticate, login, setToken, setUser } = useUserContext();
  const onSubmit = async (values) => {
    await login(values.email, values.password)
      .then((req) => {
        if (req.status === 200) {
          const { token } = req.data;
          console.log(req.data.token);
          //setUser(user)
          setToken(token);
          setIsAuthenticate(true);
          const { role } = req.data.user;
          navigate(redirectToDashboard(role));
          console.log(req);
          //
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setError("email", {
          //message:response.data.message
          message: "these credentials doesn't match our records",
        });
      });
  };
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Left side - Image */}
        <div className="relative hidden h-full flex-col items-center justify-center p-10 lg:flex ">
          <img src="/background.png" />
        </div>
        {/* Right side - Login Form */}
        <div className="lg:p-8 flex items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="email" {...field} />
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
                        <FormControl>
                          <Input
                            type={"password"}
                            placeholder="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button disabled={isSubmitting} type="submit">
                    {isSubmitting && (
                      <Loader className="mx-2 my-2 animate-spin" />
                    )}{" "}
                    Login
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
