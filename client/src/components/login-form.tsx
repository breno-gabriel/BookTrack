import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      return response.data;
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
    onSuccess: (response) => {
      toast.success("Login realizado com sucesso");
      localStorage.setItem("token", response.token);
      navigate("/home");
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    mutate(data);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem vindo de volta !</CardTitle>
          <CardDescription>Faça login para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isPending}
                >
                  Entrar
                </Button>
              </div>
              <div className="text-center text-sm">
                Ainda não tem uma conta?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Cadastre-se
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
