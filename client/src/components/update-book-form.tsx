import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const BookSchema = z.object({
  id: z.number().optional(), 
  title: z
    .string()
    .min(3, "O nome precisa ter pelo menos 3 caracteres")
    .max(100, "O nome precisa ter menos de 100 caracteres"),
  author: z.string().optional(),
  status: z.string().min(1, "Selecione uma categoria"),
  rating: z.string().optional(),
});

type Book = z.infer<typeof BookSchema>;

export default function UpdateBookForm({
  onSave,
  book,
}: {
  onSave: () => void;
  book: Book;
}) {
  const form = useForm<Book>({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      title: book.title,
      author: book.author,
      status: book.status,
      rating: book.rating || "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: Book) => {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/books/update/${book.id}`,
        {
          ...data,
          rating: data.rating ? Number(data.rating) : undefined,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro atualizado com sucesso!");
      onSave();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Erro ao atualizar o livro.");
    },
  });

  const onSubmit = (data: Book) => {
    mutate(data);
  };

  const status = form.watch("status");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Dom Casmurro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autor</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Machado de Assis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Quero Ler">Quero Ler</SelectItem>
                      <SelectItem value="Lendo">Lendo</SelectItem>
                      <SelectItem value="Lido">Lido</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {status === "Lido" && (
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nota</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma nota" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button className="w-full" type="submit">
          Salvar
        </Button>
      </form>

      <Button
        variant="outline"
        className="mt-2"
        onClick={() => onSave()}
      >
        Cancelar
      </Button>
    </Form>
  );
}
