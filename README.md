![RefundMe](docs/banner-refundme.png)

# RefundMe - Mobile (App do Funcionário)

Este é o repositório da aplicação mobile do projeto RefundMe, destinada ao **registro de solicitações de reembolso** por parte dos colaboradores da empresa.

## 📲 Objetivo

Permitir que colaboradores não administradores cadastrem despesas, anexem comprovantes, visualizem projetos e acompanhem o status de suas solicitações de reembolso.

## ⚙️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/) com [TypeScript](https://www.typescriptlang.org/)
- [Expo](https://expo.dev/) para facilitar o desenvolvimento e testes
- [Gluestack UI](https://gluestack.io/) e [TailwindCSS](https://tailwindcss.com/) para estilização e componentes

## 🔐 Acesso

Apenas **usuários comuns (não-admin)** têm acesso à aplicação mobile.

## ✨ Funcionalidades Exclusivas

- Cadastro de **novas solicitações de reembolso**
- Registro de **despesas**, com:
  - Tipo de despesa (valor fixo ou quantidade)
  - Valor ou quantidade
  - Descrição
  - Anexo de imagem (comprovante)
- Visualização de **projetos disponíveis**
- Acompanhamento do **status das solicitações**
- Alerta se o valor informado exceder o limite permitido