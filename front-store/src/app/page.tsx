import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1> Ola next</h1>
      <Link href="/products">Ir para pagina produtos</Link>
    </div>
  );
}
