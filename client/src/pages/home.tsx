import AddBookDialog from "@/components/add-book-dialog";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {jwtDecode} from "jwt-decode";

interface Book {
  id: number;
  title: string;
  author: string;
  status: string;
  rating: number;
}

export default function Home() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<{ id: number }>(token) : null;
  const userId = decoded?.id;

  const { data, isPending } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/books/user/${userId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
      return response.data["books"];
    },
  });
  console.log(data);
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 mt-15 text-center">
        <h1 className="text-5xl font-bold mb-2">BookTrack</h1>
        <p className="text-lg text-muted-foreground">
          Gerencie suas leituras de forma simples e organizada
        </p>
      </div>

      <div className="flex justify-end mb-12">
        <Button className="p-6 cursor-pointer" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar livro
        </Button>
        <AddBookDialog open={open} onOpenChange={setOpen} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isPending ? (
          <p>Carregando livros...</p>
        ) : (
          data?.map((book: Book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              status={book.status}
              rating={book.rating}
            />
          ))
        )}
      </div>
    </div>
  );
}