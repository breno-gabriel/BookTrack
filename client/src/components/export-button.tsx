import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { unparse } from 'papaparse';

export default function ExportCSVButton({ data }: { data: any }) {
  const handleExport = () => {
    console.log(data);
    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'meus-livros.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button className="p-6 cursor-pointer" variant="outline" onClick={handleExport}>
      <Upload className="mr-2 h-4 w-4" />
      Exportar CSV
    </Button>
  );
}
