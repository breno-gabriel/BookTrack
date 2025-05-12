import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 mt-15 text-center">
        <h1 className="text-5xl font-bold mb-2">BookTrack</h1>
        <p className="text-lg text-muted-foreground">
          Gerencie suas leituras de forma simples e organizada
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="p-6 cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar livro
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar livro</DialogTitle>
              <DialogDescription>
                Preencha os detalhes do livro que deseja adicionar à sua
                biblioteca.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="titulo">Título</Label>
                <Input id="titulo" placeholder="Digite o título do livro" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="autor">Autor</Label>
                <Input id="autor" placeholder="Digite o nome do autor" />
              </div>
              <div className="flex gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="categoria">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ler">Quero Ler</SelectItem>
                      <SelectItem value="lendo">Lendo</SelectItem>
                      <SelectItem value="lido">Lido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="avaliacao">Avaliação</Label>
                  <Select>
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
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Adicionar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
