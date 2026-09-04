# 🐾 PetFácil

Aplicativo mobile desenvolvido em **React Native + Expo + TypeScript** com o objetivo de facilitar a gestão e o acompanhamento de produtos e serviços relacionados a animais de estimação.

O projeto foi desenvolvido como parte da disciplina de **Projeto Integrador**, utilizando tecnologias modernas de desenvolvimento mobile.

---

# 📱 Sobre o projeto

O **PetFácil** é uma aplicação mobile voltada para o gerenciamento de produtos para pets.

A aplicação permite ao usuário navegar por um catálogo de produtos, visualizar informações dos produtos e adicionar itens a um carrinho de compras.

O projeto foi desenvolvido utilizando:

- React Native
- Expo
- TypeScript
- React Navigation
- Context API
- JavaScript/TypeScript
- npm

---

# 🎯 Objetivo

O objetivo do PetFácil é disponibilizar uma interface simples e intuitiva para que usuários possam:

- Visualizar produtos disponíveis;
- Navegar pelo catálogo;
- Consultar informações dos produtos;
- Adicionar produtos ao carrinho;
- Visualizar os produtos adicionados;
- Alterar a quantidade dos produtos;
- Remover produtos do carrinho;
- Visualizar o valor total da compra.

A proposta é manter o sistema simples, permitindo demonstrar os principais conceitos de desenvolvimento de aplicações mobile.

---

# 🛠️ Tecnologias utilizadas

## React Native

Framework utilizado para desenvolvimento da aplicação mobile.

Permite desenvolver aplicações para Android e iOS utilizando uma base de código compartilhada.

## Expo

Plataforma utilizada para facilitar o desenvolvimento, execução e testes da aplicação React Native.

O projeto utiliza uma versão do **Expo SDK 54**.

## TypeScript

Linguagem utilizada no projeto para adicionar tipagem estática ao JavaScript.

## React Navigation

Biblioteca utilizada para realizar a navegação entre as telas da aplicação.

## Context API

Utilizada para compartilhar o estado do carrinho entre diferentes telas da aplicação.

## npm

Gerenciador de pacotes utilizado para instalar e gerenciar as dependências do projeto.

---

# 📂 Estrutura do projeto

A estrutura principal do projeto é semelhante a:

    petfacil/
    │
    ├── .gitignore
    ├── AGENTS.md
    ├── app.json
    ├── App.tsx
    ├── index.ts
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── tsconfig.json
    │
    ├── assets/
    │   ├── icon.png
    │   ├── adaptive-icon.png
    │   └── favicon.png
    │
    ├── navigation/
    │   └── ...
    │
    ├── screens/
    │   ├── ...
    │   └── CatalogoScreen.tsx
    │
    └── src/
        ├── contexts/
        │   └── CartContext.tsx
        │
        └── data/
            └── ...

---

# 🖥️ Principais partes do projeto

## App.tsx

É o componente principal da aplicação.

É responsável por iniciar a aplicação e configurar a estrutura principal de navegação.

---

# 🧭 Navegação

A navegação da aplicação é realizada utilizando o **React Navigation**.

A aplicação possui diferentes telas que podem ser acessadas através da navegação configurada no projeto.

A estrutura de navegação foi criada para permitir que o usuário navegue entre as funcionalidades do aplicativo.

---

# 🛍️ Catálogo

A tela de catálogo apresenta os produtos disponíveis para o usuário.

Nela é possível visualizar informações dos produtos e escolher quais itens deseja adicionar ao carrinho.

A implementação principal do catálogo está em:

    screens/CatalogoScreen.tsx

---

# 🛒 Carrinho

O carrinho é responsável por armazenar os produtos selecionados pelo usuário.

O estado do carrinho é compartilhado entre as telas através do **Context API**.

A implementação principal está localizada em:

    src/contexts/CartContext.tsx

O contexto permite controlar operações como:

- Adicionar produto;
- Remover produto;
- Alterar quantidade;
- Consultar produtos adicionados;
- Calcular o total da compra.

Dessa forma, diferentes telas conseguem acessar e atualizar o mesmo carrinho.

---

# 📦 Dados dos produtos

Os dados utilizados pelo catálogo ficam organizados dentro de:

    src/data/

Essa estrutura permite separar os dados da lógica da interface.

Atualmente, o projeto utiliza dados locais para representar os produtos.

---

# 💻 Requisitos para executar o projeto

Antes de começar, é necessário instalar alguns programas.

## 1. Node.js

O projeto utiliza Node.js para executar o npm e as ferramentas do Expo.

Recomenda-se utilizar uma versão compatível com o projeto.

Para verificar se o Node.js está instalado:

    node --version

Exemplo:

    v24.x.x

---

# 📱 2. Expo Go

Para testar o aplicativo diretamente no celular, é necessário instalar o aplicativo **Expo Go**.

No Android:

1. Abra a Google Play Store;
2. Procure por Expo Go;
3. Instale o aplicativo.

No iPhone:

1. Abra a App Store;
2. Procure por Expo Go;
3. Instale o aplicativo.

É importante observar que a versão do Expo Go instalada no celular precisa ser compatível com o SDK utilizado pelo projeto.

---

# 📥 Como baixar o projeto

Abra o terminal e navegue até a pasta onde deseja armazenar o projeto.

Exemplo:

    cd C:\Users\SEU_USUARIO\Documentos\Workspaces

Depois execute:

    git clone https://github.com/nataliatviana/petfacil.git

Entre na pasta do projeto:

    cd petfacil

---

# 📦 Instalação das dependências

Depois de clonar o projeto, é necessário instalar todas as dependências.

Dentro da pasta `petfacil`, execute:

    npm install

O npm irá ler o arquivo:

    package.json

e instalar todas as dependências necessárias.

Após a instalação, será criada a pasta:

    node_modules

Essa pasta não precisa ser enviada para o GitHub.

Ela é criada localmente através do `npm install`.

---

# 🔍 Verificando o projeto

Depois de instalar as dependências, é recomendado executar:

    npx expo-doctor

O comando verifica se existem problemas conhecidos de configuração ou incompatibilidade entre as dependências do projeto.

O resultado esperado é algo semelhante a:

    18/18 checks passed. No issues detected!

Caso apareçam avisos de vulnerabilidades do npm, isso não significa necessariamente que o projeto não possa ser executado.

Por exemplo:

    24 vulnerabilities

significa que algumas dependências possuem vulnerabilidades conhecidas.

Para consultar os detalhes:

    npm audit

Não execute automaticamente:

    npm audit fix --force

sem analisar antes, pois esse comando pode atualizar dependências para versões incompatíveis e quebrar o projeto.

---

# ▶️ Como executar o projeto

Depois de instalar as dependências, execute:

    npx expo start

O Expo iniciará o Metro Bundler.

Será exibido um QR Code no terminal.

Também aparecerá algo semelhante a:

    › Scan the QR code above to open in Expo Go.
    › Metro: exp://192.168.x.x:8081

---

# 📱 Executando no celular

Para abrir o projeto no celular:

1. Instale o Expo Go;
2. Conecte o computador e o celular à mesma rede Wi-Fi;
3. Execute:

       npx expo start

4. Aguarde o QR Code aparecer;
5. Abra o Expo Go no celular;
6. Escaneie o QR Code.

O aplicativo deverá ser carregado no celular.

---

# 🍎 Observação importante para iPhone

O iPhone utiliza a versão atual disponível do Expo Go na App Store.

Por isso, pode acontecer de o projeto utilizar um SDK antigo e o Expo Go instalado no iPhone utilizar um SDK mais novo.

Nesse caso, pode aparecer uma mensagem semelhante a:

    Project is incompatible with this version of Expo Go

Isso acontece porque o Expo Go atual pode não ser compatível com o SDK utilizado pelo projeto.

Como o projeto utiliza **Expo SDK 54**, é importante utilizar uma versão do Expo Go compatível com esse SDK.

No iOS, não é possível simplesmente instalar uma versão antiga do Expo Go pela App Store.

Por esse motivo, caso o Expo Go do iPhone esteja incompatível, recomenda-se testar o projeto em um ambiente compatível, como:

- Android com uma versão compatível do Expo Go;
- Simulador iOS;
- Ou realizar uma atualização planejada do projeto para uma versão mais recente do Expo.

---

# 🤖 Executando no Android

Caso o computador tenha um ambiente Android configurado, é possível executar:

    npx expo start --android

Também é possível iniciar normalmente:

    npx expo start

e utilizar o QR Code pelo Expo Go no Android.

---

# 🌐 Executando no navegador

O projeto também pode ser executado na web caso as dependências de suporte web estejam configuradas.

Execute:

    npx expo start --web

ou:

    npm run web

Caso o Expo informe que faltam dependências para web, execute:

    npx expo install react-dom react-native-web

Depois tente novamente:

    npx expo start --web

---

# 🧹 Limpando o cache

Caso ocorram problemas estranhos relacionados ao Metro Bundler, pode ser útil limpar o cache.

Execute:

    npx expo start --clear

Depois disso, o Expo será iniciado novamente com o cache limpo.

---

# 🔄 Fluxo recomendado para executar o projeto do zero

Para uma pessoa que acabou de baixar o projeto, o processo recomendado é:

## 1. Clonar o repositório

    git clone https://github.com/nataliatviana/petfacil.git

## 2. Entrar na pasta

    cd petfacil

## 3. Instalar dependências

    npm install

## 4. Verificar o projeto

    npx expo-doctor

## 5. Iniciar o Expo

    npx expo start

## 6. Abrir no celular

Escaneie o QR Code utilizando o Expo Go.

---

# 🧪 Comandos úteis

## Iniciar o projeto

    npm start

ou:

    npx expo start

---

## Iniciar no Android

    npm run android

ou:

    npx expo start --android

---

## Iniciar no iOS

    npm run ios

ou:

    npx expo start --ios

---

## Iniciar na Web

    npm run web

ou:

    npx expo start --web

---

## Limpar cache

    npx expo start --clear

---

## Verificar dependências

    npx expo-doctor

---

## Verificar versão do Expo

    npx expo --version

---

## Verificar versão do Node.js

    node --version

---

## Verificar versão do npm

    npm --version

---

# 🔧 Configuração do projeto

O arquivo:

    app.json

contém as principais configurações do aplicativo Expo.

Entre outras informações, ele define:

- Nome do aplicativo;
- Slug;
- Versão;
- Orientação da tela;
- Ícone;
- Configurações para iOS;
- Configurações para Android;
- Configurações para Web.

---

# 📋 package.json

O arquivo `package.json` contém as informações do projeto e suas dependências.

Exemplo das principais dependências utilizadas:

    {
      "dependencies": {
        "@react-navigation/native": "^7.3.18",
        "@react-navigation/native-stack": "^7.18.10",
        "expo": "~54.0.36",
        "expo-status-bar": "~3.0.9",
        "react": "19.1.0",
        "react-native": "0.81.5",
        "react-native-safe-area-context": "~5.6.0",
        "react-native-screens": "~4.16.0"
      }
    }

O `package-lock.json` registra as versões específicas das dependências instaladas.

Por isso, os dois arquivos devem ser mantidos no repositório.

---

# 🌳 Git e branches

O projeto utiliza Git para controle de versão.

A branch principal é:

    main

Para criar uma nova branch para desenvolver uma funcionalidade:

    git checkout -b feature/nome-da-funcionalidade

Para verificar a branch atual:

    git branch

Para verificar alterações:

    git status

---

# 💾 Salvando alterações

Depois de realizar alterações no código:

## 1. Verificar alterações

    git status

## 2. Adicionar arquivos

    git add .

## 3. Criar commit

    git commit -m "feat: descrição da alteração"

## 4. Enviar para o GitHub

    git push origin nome-da-branch

---

# 🔄 Atualizando o projeto

Antes de começar a trabalhar, é recomendado atualizar a branch:

    git pull

Se estiver trabalhando em uma branch específica:

    git pull origin nome-da-branch

---

# 🤝 Pull Request

Quando uma funcionalidade estiver concluída:

1. Criar uma branch para a funcionalidade;
2. Desenvolver a funcionalidade;
3. Testar localmente;
4. Fazer `git add`;
5. Fazer `git commit`;
6. Fazer `git push`;
7. Abrir um Pull Request no GitHub;
8. Solicitar revisão dos integrantes do projeto;
9. Após aprovação, realizar o merge na `main`.

---

# 🧑‍💻 Exemplo completo de desenvolvimento

Supondo que seja necessário criar uma funcionalidade chamada `catalogo`.

Criar a branch:

    git checkout -b feature/catalogo

Desenvolver a funcionalidade.

Verificar alterações:

    git status

Adicionar os arquivos:

    git add .

Criar o commit:

    git commit -m "feat: implementa catalogo"

Enviar para o GitHub:

    git push origin feature/catalogo

Depois disso, abrir um Pull Request para a branch `main`.

---

# ⚠️ Problemas comuns

## "Project is incompatible with this version of Expo Go"

Significa que a versão do Expo Go instalada no dispositivo não é compatível com o SDK do projeto.

Primeiro verifique a versão utilizada pelo projeto:

    npx expo --version

Também é possível verificar o `package.json`.

No caso deste projeto, a versão principal utilizada é:

    Expo SDK 54

---

# ⚠️ "PluginError: Failed to resolve plugin"

Esse erro geralmente está relacionado a uma configuração de plugin no `app.json` ou a uma dependência que não está instalada corretamente.

Caso aconteça após alterar dependências:

1. Verifique o `package.json`;
2. Execute:

       npm install

3. Execute:

       npx expo-doctor

4. Se necessário, limpe o cache:

       npx expo start --clear

---

# ⚠️ Problemas depois de instalar dependências

Caso o projeto apresente comportamentos inesperados após alterações nas dependências, pode ser necessário reinstalar as dependências.

No Windows:

    rmdir /s /q node_modules

Depois:

    npm install

Caso o comando acima não funcione no PowerShell, também é possível excluir manualmente a pasta `node_modules`.

Depois execute:

    npm install

E novamente:

    npx expo-doctor

---

# ⚠️ Não alterar versões do Expo sem necessidade

O projeto utiliza versões específicas de React Native, React e Expo.

Portanto, não é recomendado executar comandos como:

    npm install expo@latest

ou atualizar várias dependências manualmente sem verificar a compatibilidade.

Alterações de versão do Expo podem exigir atualização de:

- React;
- React Native;
- Expo Router;
- React Navigation;
- Plugins;
- Dependências nativas;
- Configuração do `app.json`.

Sempre que houver necessidade de atualização, deve ser feito um processo de upgrade planejado.

---

# 📊 Arquitetura simplificada

A estrutura lógica do aplicativo pode ser representada da seguinte maneira:

    Usuário
       │
       ▼
    Aplicação Mobile
       │
       ├── Navegação
       │
       ├── Catálogo
       │      │
       │      └── Produtos
       │
       └── Carrinho
              │
              ├── Adicionar produto
              ├── Remover produto
              ├── Alterar quantidade
              └── Calcular total

---

# 🛒 Fluxo do carrinho

O funcionamento básico do carrinho é:

    Usuário acessa o catálogo
              ↓
    Escolhe um produto
              ↓
    Adiciona ao carrinho
              ↓
    Produto é armazenado no CartContext
              ↓
    Usuário acessa o carrinho
              ↓
    Visualiza os produtos
              ↓
    Pode alterar quantidades
              ↓
    Pode remover produtos
              ↓
    Sistema calcula o total

---

# 🧠 Context API

O `CartContext` é utilizado para evitar que cada tela tenha uma cópia independente do carrinho.

A ideia é centralizar o estado.

Exemplo conceitual:

    CartContext
         │
         ├── produtos
         ├── adicionarProduto()
         ├── removerProduto()
         ├── alterarQuantidade()
         └── calcularTotal()
              │
              ▼
          Telas do app

Assim, qualquer tela que utilize o contexto pode acessar as informações atualizadas do carrinho.

---

# 🔐 Segurança

Este projeto é acadêmico e não possui, atualmente, um sistema completo de autenticação ou processamento real de pagamentos.

Os dados dos produtos são utilizados localmente na aplicação.

Por isso, o projeto não deve ser considerado uma aplicação de e-commerce pronta para produção.

---

# 🚀 Possíveis melhorias futuras

Algumas funcionalidades que poderiam ser adicionadas futuramente:

- Login e cadastro de usuários;
- Banco de dados;
- API própria;
- Backend;
- Autenticação;
- Histórico de pedidos;
- Favoritos;
- Busca de produtos;
- Filtros por categoria;
- Integração com pagamentos;
- Controle de estoque;
- Cadastro de pets;
- Agendamento de serviços;
- Notificações;
- Persistência do carrinho;
- Integração com serviços externos.

---

# 👩‍💻 Desenvolvimento

Projeto desenvolvido para fins acadêmicos como parte da disciplina de Projeto Integrador.

O desenvolvimento utiliza práticas de:

- Controle de versão com Git;
- Desenvolvimento em branches;
- Pull Requests;
- Componentização;
- Gerenciamento de estado;
- Navegação entre telas;
- Desenvolvimento mobile;
- TypeScript.

---

# 📌 Resumo rápido

Se você já possui Node.js instalado e acabou de clonar o projeto:

    git clone https://github.com/nataliatviana/petfacil.git

    cd petfacil

    npm install

    npx expo-doctor

    npx expo start

Depois:

1. Abra o Expo Go;
2. Escaneie o QR Code;
3. Aguarde o aplicativo carregar.

---

# 📚 Observação

O projeto deve ser executado utilizando as versões de dependências presentes no `package.json` e registradas no `package-lock.json`.

Caso outro integrante esteja conseguindo executar normalmente o projeto em seu dispositivo, recomenda-se evitar alterações desnecessárias nas versões das dependências.

Em caso de problemas específicos de compatibilidade entre dispositivo e Expo Go, primeiro verifique a versão do SDK do projeto e a versão do Expo Go instalada no dispositivo.

---

# 🐾 PetFácil

Aplicação mobile acadêmica desenvolvida para facilitar a navegação por produtos para pets e o gerenciamento de um carrinho de compras.

**Tecnologias principais:** React Native • Expo • TypeScript • React Navigation • Context API • Git
