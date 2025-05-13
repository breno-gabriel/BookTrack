import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { Book } from "../utils/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface BookProps {
  book: Book;
  setCurrentBook: (book: Book) => void;
  setUpdateOpen: (open: boolean) => void;
}

export default function BookCard({
  book,
  setCurrentBook,
  setUpdateOpen,
}: BookProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (bookId: number) => {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/books/delete/${bookId}`,
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
      toast.success("Livro deletado com sucesso!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });

  return (
    <Card className="w-full rounded-2xl shadow-lg border border-gray-200 bg-white transition hover:shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{book.title}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {book.author || "Autor desconhecido"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Status:</span>
          <Badge
            variant={
              book.status === "Lendo"
                ? "yellow"
                : book.status === "Lido"
                ? "green"
                : "brown"
            }
          >
            {book.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Avaliação:</span>
          <span>{"⭐".repeat(Number(book.rating)) || "—"}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <Button
          variant="outline"
          className="px-4 cursor-pointer"
          onClick={() => mutate(book.id)}
        >
          <Trash className="mr-2 h-4 w-4" />
          Deletar
        </Button>

        <Button
          variant="default"
          className="px-4 cursor-pointer"
          disabled={book.status === "Lido"}
          onClick={() => {
            setCurrentBook(book);
            setUpdateOpen(true);
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
}
