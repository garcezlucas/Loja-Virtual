import type { Metadata } from "next";
import "./global.css";
import Header from "./header/header";
import Footer from "./footer/footer";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "Dashboard | Loja Virtual",
    template: " %s | Loja Virtual",
  },
  description: "Projeto Loja Virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
