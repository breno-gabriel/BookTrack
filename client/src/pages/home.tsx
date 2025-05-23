import AddBookDialog from "@/components/add-book-dialog";
import BookCard from "@/components/book-card";
import ExportCSVButton from "@/components/export-button";
import { Button } from "@/components/ui/button";
import UpdateBookDialog from "@/components/update-book-dialog";
import { Book } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { LogOut, Plus } from "lucide-react";
import { useState } from "react";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    status: "",
    rating: "",
  });

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<{ id: number }>(token) : null;
  const userId = decoded?.id;

  const { data, isPending } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/user/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
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

      <div className="flex justify-between mb-12">
        <Button
          className="p-6 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
        <div className="flex gap-4">
          <Button className="p-6 cursor-pointer" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar livro
          </Button>

          <ExportCSVButton />
        </div>
        <AddBookDialog open={open} onOpenChange={setOpen} />
        <UpdateBookDialog
          open={updateOpen}
          onOpenChange={setUpdateOpen}
          book={currentBook}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isPending ? (
          <p>Carregando livros...</p>
        ) : (
          data?.map((book: Book) => (
            <BookCard
              key={book.id}
              book={book}
              setCurrentBook={setCurrentBook}
              setUpdateOpen={setUpdateOpen}
            />
          ))
        )}
      </div>
    </div>
  );
}
