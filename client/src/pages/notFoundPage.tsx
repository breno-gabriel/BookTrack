
export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-6 justify-center h-screen">
      <div className="text-center">
        <h1 className="text-8xl">404</h1>
        <h2 className="text-2xl">Página não encontrada</h2>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-center">Ops... Parece que alguem se perdeu. Vamos voltar para a página inicial?</p>
        <a href="/" className="text-blue-500 underline self-center">Voltar para a página inicial</a>
      </div>
    </div>
  );
}
