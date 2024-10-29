import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#64748B] text-gray-300 py-10">
            <div className="container mx-auto px-6 md:flex md:justify-around md:space-y-0 space-y-8">
            
            {/* Navegação */}
            <nav aria-label="Navegação principal" className="flex-1 space-y-4">
                <h2 className="text-lg font-semibold">Navegação</h2>
                <ul className="space-y-2">
                <li><Link href="/" className="hover:text-gray-100">Home</Link></li>
                <li><Link href="/products" className="hover:text-gray-100">Produtos</Link></li>
                <li><Link href="/about" className="hover:text-gray-100">Sobre Nós</Link></li>
                <li><Link href="/contact" className="hover:text-gray-100">Contato</Link></li>
                </ul>
            </nav>
    
            {/* Contato */}
            <section aria-labelledby="contact-info" className="flex-1 space-y-4">
                <h2 id="contact-info" className="text-lg font-semibold">Contato</h2>
                <address className="not-italic space-y-2">
                <p>Email: <Link href="mailto:contato@lojavirtual.com" className="hover:text-gray-100">contato@lojavirtual.com</Link></p>
                <p>Telefone: <Link href="tel:+551199999999" className="hover:text-gray-100">(11) 9999-9999</Link></p>
                <p>Endereço: Rua da loja, 123 - São Paulo, SP</p>
                </address>
            </section>
    
            {/* Redes Sociais */}
            <section aria-labelledby="social-media" className="flex-1 space-y-4">
                <h2 id="social-media" className="text-lg font-semibold">Siga-nos</h2>
                <ul className="flex space-x-4">
                <li><Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100">Facebook</Link></li>
                <li><Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100">Instagram</Link></li>
                <li><Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-100">Twitter</Link></li>
                </ul>
            </section>
            </div>
    
            {/* Direitos Autorais */}
            <div className="text-center pt-8 border-t border-gray-700 mt-8">
            <p>&copy; {new Date().getFullYear()} Loja Virtual. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}