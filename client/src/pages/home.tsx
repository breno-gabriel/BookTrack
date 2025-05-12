import AddBookDialog from "@/components/add-book-dialog";
import BookCard from "@/components/book-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Home() {

  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 mt-15 text-center">
        <h1 className="text-5xl font-bold mb-2">BookTrack</h1>
        <p className="text-lg text-muted-foreground">
          Gerencie suas leituras de forma simples e organizada
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <Button className="p-6 cursor-pointer" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar livro
        </Button>
        <AddBookDialog open={open} onOpenChange={setOpen}/>
      </div>

      <div className="flex flex-wrap gap-4">
        <BookCard title="Dom Casmurro" author="Machado de Assis" status="Lido" rating="5"/>
      </div>

    </div>
  );
}
