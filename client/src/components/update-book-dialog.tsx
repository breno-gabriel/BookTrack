import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Book } from "@/utils/utils";
import UpdateBookForm from "./update-book-form";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book;
}

export default function UpdateBookDialog({
  open,
  onOpenChange,
  book,
}: DialogProps) {
  const handleSave = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualizar livro</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do livro que deseja atualizar.
          </DialogDescription>
        </DialogHeader>
        <UpdateBookForm onSave={handleSave} book={book} />
      </DialogContent>
    </Dialog>
  );
}
