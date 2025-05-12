import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface BookProps {
  title: string;
  author: string;
  status: string;
  rating: number;
}

export default function BookCard({ title, author, status, rating }: BookProps) {
  return (
    <Card className="w-[320px] rounded-2xl shadow-lg border border-gray-200 bg-white transition hover:shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {author || "Autor desconhecido"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Status:</span>
          <span className="capitalize">{status}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">Avaliação:</span>
          <span>{"⭐".repeat(Number(rating)) || "—"}</span>
        </div>      
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <Button variant="outline" className="rounded-full px-4">
          Editar
        </Button>
        <Button variant="destructive" className="rounded-full px-4">
          Deletar
        </Button>
      </CardFooter>
    </Card>
  );
}
