# Loja Virtual

### **Em construção**

Este é um projeto de uma **loja virtual** completa, incluindo backend, painel de controle e site da loja. O objetivo é criar uma solução escalável e moderna utilizando tecnologias como **Spring**, **React.js** e **Next.js**.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java Spring Boot**: Framework para o desenvolvimento do backend, garantindo robustez e escalabilidade.
- **Spring Security**: Gerenciamento de autenticação e autorização.
- **Spring Data JPA**: Integração com banco de dados.
- **Banco de Dados**: MySQL ou PostgreSQL (configurável).
- **API REST**: Comunicação entre frontend e backend.

### Painel de Controle
- **React.js**: Framework para criação de interfaces dinâmicas.
- **TypeScript**: Para maior segurança e produtividade no desenvolvimento.
- **React Router DOM**: Navegação entre páginas.
- **Ant Design** (ou outra lib): Para componentes estilizados e consistentes.

### Site da Loja
- **Next.js**: Framework React para renderização do lado do servidor (SSR) e performance otimizada.
- **Styled Components** ou **TailwindCSS**: Para estilização de componentes.
- **SWR** ou **React Query**: Gerenciamento eficiente de dados do frontend.

---

## 📁 Estrutura do Projeto

```plaintext
loja-virtual/
├── backend/              # Aplicação Spring Boot
│   ├── src/main/         # Código-fonte
│   ├── src/test/         # Testes
│   └── pom.xml           # Configurações do Maven
├── painel-controle/      # Painel administrativo
│   ├── src/              # Código-fonte React.js
│   ├── public/           # Arquivos estáticos
│   └── package.json      # Configurações do Node.js
├── site-loja/            # Site público
│   ├── src/              # Código-fonte Next.js
│   ├── public/           # Arquivos estáticos
│   └── package.json      # Configurações do Node.js
└── README.md             # Documentação do projeto
```

---

## 📋 Funcionalidades

### Backend
- Autenticação de usuários (JWT).
- Gerenciamento de produtos, pedidos e usuários.
- API REST para comunicação com frontend.

### Painel de Controle
- Cadastro, edição e exclusão de produtos.
- Visualização e gerenciamento de pedidos.
- Relatórios de vendas e usuários.

### Site da Loja
- Exibição de produtos com busca e filtros.
- Carrinho de compras e finalização de pedido.
- Integração com métodos de pagamento.

---

## 🚀 Executando o Projeto

### **1. Clonando o Repositório**
```bash
git clone https://github.com/seu-usuario/loja-virtual.git
cd loja-virtual
```

### **2. Configurando o Backend**

#### - Navegue até o diretório do backend:
```bash
cd backend
```

#### - Configure o arquivo application.properties com as credenciais do banco de dados:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/loja_virtual
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

#### - Execute o backend:
```bash
mvn spring-boot:run
```

### **3. Configurando o Painel de Controle**
#### - Navegue até o diretório do painel:
```bash
cd painel-controle
```

#### - Instale as dependências:
```bash
yarn install
```

#### - Execute o painel:
```bash
yarn start
```

### **4. Configurando o Site da Loja**
#### - Navegue até o diretório do site:
```bash
cd site-loja
```

#### - Instale as dependências:
```bash
yarn install
```

#### - Execute o site:
```bash
yarn dev
```

---

## ⚙️ Configurações
### Certifique-se de criar arquivos .env para definir variáveis de ambiente nos projetos React e Next.js, como a URL do backend.

#### Exemplo de .env:
```bash

# Configuração para o Painel de Controle
REACT_APP_URL_API=http://localhost:8080/
REACT_APP_ENCRYPTION=4pJxhJ3pe8kTamQUCJ1oVs3jiudhvnaik

# Configuração para o Site da Loja
NEXT_PUBLIC_API_URL=http://localhost:8080/api

```

---

## 🧪 Testes

### Backend
#### Utilize JUnit para executar os testes automatizados:
```bash
mvn test
```

### Frontend
#### Utilize Jest e React Testing Library para executar os testes no Painel de Controle e no Site:
```bash
yarn test
```

---

## 🤝 Contribuindo
### Contribuições são sempre bem-vindas! Siga as etapas abaixo para contribuir:

#### Faça um fork do projeto.
#### Crie uma branch para sua feature:
```bash
git checkout -b minha-feature
```

#### Faça commit das suas alterações:
```bash
git commit -m "Descrição da alteração"
```

#### Envie para sua branch:
```bash
git push origin minha-feature
```

#### Abra um Pull Request no repositório principal.

---

## ✨ Obrigado por visitar este repositório! ✨

### **Como adicionar ao GitHub**
1. Copie o conteúdo acima.
2. No repositório do GitHub, crie ou edite o arquivo `README.md`.
3. Cole o conteúdo e salve as alterações.

Se precisar de ajustes ou adicionar mais informações, é só avisar! 😊