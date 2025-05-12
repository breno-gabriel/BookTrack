import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookForm from "./book-form";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddBookDialog({ open, onOpenChange }: DialogProps) {
  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar livro</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do livro que deseja adicionar à sua biblioteca.
          </DialogDescription>
        </DialogHeader>
        <BookForm onSave={handleSave} />
      </DialogContent>
    </Dialog>
  );
}
