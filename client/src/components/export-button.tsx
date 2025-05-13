import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";

export default function ExportCSVButton() {
  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado.");

      const decoded = jwtDecode<{ id: number }>(token);
      const userId = decoded.id;

      const response = await axios.get(
        `http://localhost:3000/books/export_csv/${userId}`,
        {
          headers: {
            Authorization: token,
          },
          responseType: "blob",
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      const url = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "meus_livros.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onError: (error: any) => {
      console.error("Erro ao exportar CSV:", error);
      alert("Falha ao exportar CSV.");
    },
  });

  return (
    <Button
      className="p-6 cursor-pointer"
      variant="outline"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      <Upload className="mr-2 h-4 w-4" />
      {mutation.isPending ? "Exportando..." : "Exportar CSV"}
    </Button>
  );
}
