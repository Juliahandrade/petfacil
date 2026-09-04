# 🐾 PetFácil

Aplicativo mobile desenvolvido em **React Native + Expo + TypeScript**, criado com o objetivo de facilitar a visualização de produtos para animais de estimação e o gerenciamento de um carrinho de compras.

O projeto foi desenvolvido como parte da disciplina de **Projeto Integrador**, aplicando conceitos de desenvolvimento de aplicações mobile, componentização, navegação entre telas e gerenciamento de estado.

---

# 📱 Sobre o projeto

O **PetFácil** é uma aplicação mobile voltada para o segmento de produtos para animais de estimação.

A aplicação permite que o usuário navegue pelo catálogo de produtos, visualize os itens disponíveis e adicione produtos ao carrinho de compras.

O projeto foi desenvolvido com foco em uma interface simples e intuitiva, permitindo demonstrar na prática conceitos importantes do desenvolvimento mobile.

---

# 🎯 Objetivo

O principal objetivo do PetFácil é oferecer uma aplicação simples para consulta e seleção de produtos para pets.

Por meio da aplicação, o usuário pode:

- Visualizar o catálogo de produtos;
- Consultar informações dos produtos;
- Adicionar produtos ao carrinho;
- Visualizar os produtos adicionados ao carrinho;
- Alterar a quantidade dos produtos;
- Remover produtos do carrinho;
- Visualizar o valor total da compra.

---

# ✨ Funcionalidades

## 🛍️ Catálogo de produtos

A aplicação apresenta uma lista de produtos disponíveis para o usuário.

Cada produto possui informações que permitem sua identificação e seleção.

O usuário pode navegar pelo catálogo e escolher os produtos que deseja adicionar ao carrinho.

---

## 🛒 Carrinho de compras

O usuário pode adicionar produtos ao carrinho.

No carrinho é possível:

- Visualizar os produtos selecionados;
- Alterar a quantidade de um produto;
- Remover produtos;
- Visualizar o total da compra.

O estado do carrinho é compartilhado entre as telas da aplicação por meio da **Context API**.

---

## 📊 Gerenciamento do estado

O gerenciamento do carrinho é realizado de forma centralizada utilizando o `CartContext`.

Isso permite que diferentes telas tenham acesso às mesmas informações do carrinho.

As principais operações disponibilizadas pelo contexto são:

- Adicionar produto;
- Remover produto;
- Alterar quantidade;
- Consultar produtos;
- Calcular o valor total.

---

# 🛠️ Tecnologias utilizadas

## React Native

Framework utilizado para o desenvolvimento da aplicação mobile.

O React Native permite criar aplicações para dispositivos móveis utilizando uma base de código compartilhada.

---

## Expo

O Expo é utilizado para facilitar o desenvolvimento e a execução da aplicação React Native.

### Versão utilizada

O projeto utiliza:

**Expo SDK 54**

---

## TypeScript

O projeto utiliza TypeScript para adicionar tipagem estática ao JavaScript.

Isso contribui para maior segurança e organização durante o desenvolvimento.

---

## React Navigation

A biblioteca React Navigation é utilizada para controlar a navegação entre as telas da aplicação.

---

## Context API

A Context API do React é utilizada para compartilhar o estado do carrinho entre diferentes componentes e telas.

---

## npm

O npm é utilizado para instalar e gerenciar as dependências do projeto.

---

# 📂 Estrutura do projeto

A estrutura principal do projeto está organizada da seguinte maneira:

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

# 📁 Principais diretórios e arquivos

## `App.tsx`

É o componente principal da aplicação.

É responsável pela inicialização da estrutura principal do aplicativo e pela configuração da navegação.

---

## `index.ts`

É o ponto de entrada da aplicação.

É utilizado para iniciar o aplicativo e carregar o componente principal.

---

## `navigation/`

Contém os arquivos relacionados à configuração da navegação entre as telas.

A navegação permite que o usuário se movimente entre as diferentes partes do aplicativo.

---

## `screens/`

Contém as telas da aplicação.

Entre elas está a tela responsável pelo catálogo de produtos:

    screens/CatalogoScreen.tsx

---

## `src/contexts/`

Contém os contextos utilizados para gerenciamento de estado.

O principal contexto relacionado à funcionalidade do carrinho é:

    src/contexts/CartContext.tsx

---

## `src/data/`

Contém os dados utilizados pela aplicação, incluindo os dados dos produtos apresentados no catálogo.

Os produtos são armazenados localmente para fins de demonstração.

---

## `assets/`

Contém os arquivos de imagem utilizados pela aplicação, como ícones e elementos visuais.

---

# 🧭 Navegação da aplicação

A aplicação utiliza o **React Navigation** para realizar a navegação entre as telas.

De forma simplificada, o fluxo da aplicação pode ser representado como:

    Usuário
       │
       ▼
    Aplicação
       │
       ├── Catálogo
       │      │
       │      └── Produtos
       │
       └── Carrinho
              │
              ├── Produtos selecionados
              ├── Alteração de quantidade
              ├── Remoção de produtos
              └── Total da compra

---

# 🛒 Funcionamento do carrinho

O carrinho utiliza um contexto global para manter os produtos selecionados pelo usuário.

O fluxo funciona da seguinte maneira:

    Usuário acessa o catálogo
              ↓
    Seleciona um produto
              ↓
    Produto é adicionado ao carrinho
              ↓
    CartContext atualiza o estado
              ↓
    Usuário acessa o carrinho
              ↓
    Produtos selecionados são apresentados
              ↓
    Usuário pode alterar quantidades
              ↓
    Usuário pode remover produtos
              ↓
    Sistema apresenta o total

---

# 🧠 Context API

O `CartContext` centraliza as informações relacionadas ao carrinho.

A utilização de um contexto evita que cada tela tenha uma cópia independente do carrinho.

De forma conceitual:

    CartContext
         │
         ├── Lista de produtos
         │
         ├── Adicionar produto
         │
         ├── Remover produto
         │
         ├── Alterar quantidade
         │
         └── Calcular total
                  │
                  ▼
            Telas da aplicação

Dessa forma, quando o usuário adiciona ou remove um produto, as informações podem ser utilizadas pelas diferentes telas que dependem do carrinho.

---

# 📦 Dados dos produtos

Os produtos utilizados no catálogo são mantidos localmente no projeto.

Essa abordagem foi escolhida para manter o escopo do projeto simples e adequado à proposta acadêmica.

Não existe, atualmente, uma API externa ou banco de dados responsável pelo armazenamento dos produtos.

Os dados ficam organizados no diretório:

    src/data/

---

# 💻 Requisitos para execução

Para executar o projeto é necessário ter instalado:

- Node.js;
- npm;
- Expo;
- Expo Go, caso o aplicativo seja executado em um celular.

Não é necessário instalar um banco de dados para executar o projeto.

---

# 🟢 1. Instalar o Node.js

O Node.js é necessário para executar o npm e as ferramentas utilizadas pelo Expo.

Para verificar se o Node.js já está instalado, abra um terminal e execute:

    node --version

Também é possível verificar a versão do npm:

    npm --version

Caso os comandos não sejam reconhecidos, é necessário instalar o Node.js antes de continuar.

---

# 📥 2. Instalar as dependências

Depois de obter o projeto, abra um terminal dentro da pasta `petfacil`.

Execute:

    npm install

Esse comando irá instalar todas as dependências especificadas no arquivo:

    package.json

Após a instalação, será criada a pasta:

    node_modules

Essa pasta contém as bibliotecas utilizadas pelo projeto.

---

# 🔍 3. Verificar se o projeto está configurado corretamente

Após instalar as dependências, recomenda-se executar:

    npx expo-doctor

O comando verifica a configuração do projeto e suas dependências.

Em uma instalação correta, o resultado deverá indicar que as verificações foram concluídas sem problemas.

Exemplo:

    18/18 checks passed. No issues detected!

---

# ▶️ 4. Executar o projeto

Depois de instalar as dependências, execute:

    npx expo start

O Expo irá iniciar o **Metro Bundler**.

No terminal será exibido um QR Code.

Também será exibido um endereço semelhante a:

    exp://192.168.x.x:8081

---

# 📱 5. Executar no celular utilizando Expo Go

Para executar o aplicativo diretamente em um celular:

### Passo 1

Instale o aplicativo **Expo Go** no celular.

### Passo 2

Conecte o computador e o celular à mesma rede Wi-Fi.

### Passo 3

Na pasta do projeto execute:

    npx expo start

### Passo 4

O terminal apresentará um QR Code.

### Passo 5

Abra o Expo Go no celular.

### Passo 6

Escaneie o QR Code apresentado pelo Expo.

### Passo 7

Aguarde o carregamento da aplicação.

Depois disso, o PetFácil deverá ser exibido no celular.

---

# 🤖 Execução no Android

Também é possível executar o projeto em um dispositivo Android.

Com um dispositivo Android configurado ou utilizando o Expo Go, execute:

    npx expo start

Depois escaneie o QR Code utilizando o Expo Go.

Também é possível utilizar:

    npx expo start --android

caso exista um ambiente Android configurado no computador.

---

# 🍎 Execução no iOS

No iPhone, o aplicativo pode ser executado utilizando o Expo Go, desde que a versão do Expo Go instalada seja compatível com a versão do Expo SDK utilizada pelo projeto.

Este projeto utiliza:

    Expo SDK 54

Por isso, caso o Expo Go instalado no iPhone seja de uma versão incompatível, poderá aparecer a mensagem:

    Project is incompatible with this version of Expo Go

Essa mensagem indica incompatibilidade entre a versão do SDK utilizada pelo projeto e a versão do Expo Go instalada no dispositivo.

Nesse cenário, a execução pode ser realizada em um ambiente compatível, como um dispositivo Android com uma versão compatível do Expo Go ou um simulador iOS adequado.

---

# 🌐 Execução na Web

O projeto também pode ser executado no navegador caso as dependências de suporte à Web estejam instaladas.

Para iniciar:

    npx expo start --web

ou:

    npm run web

Caso o Expo informe que as dependências necessárias para Web não estão instaladas, execute:

    npx expo install react-dom react-native-web

Depois:

    npx expo start --web

---

# 🧹 Limpando o cache

Caso ocorram problemas durante a execução relacionados ao cache do Expo ou Metro Bundler, pode ser utilizado:

    npx expo start --clear

Esse comando inicia o projeto limpando o cache utilizado pelo Expo.

---

# 🔄 Passo a passo completo para executar o projeto

Para uma pessoa que nunca executou o projeto anteriormente, basta seguir os passos abaixo.

## Passo 1 — Abrir o terminal

Abra o terminal do computador.

Pode ser utilizado:

- Terminal do VS Code;
- PowerShell;
- Prompt de Comando;
- Outro terminal compatível.

---

## Passo 2 — Acessar a pasta do projeto

Entre na pasta onde o projeto está localizado.

Exemplo:

    cd C:\Users\SEU_USUARIO\Documentos\Workspaces\petfacil

---

## Passo 3 — Instalar as dependências

Execute:

    npm install

Aguarde a instalação terminar.

---

## Passo 4 — Verificar o projeto

Execute:

    npx expo-doctor

Se as verificações forem concluídas sem problemas, continue.

---

## Passo 5 — Iniciar o projeto

Execute:

    npx expo start

Aguarde o Expo iniciar.

---

## Passo 6 — Abrir no celular

Abra o Expo Go no celular e escaneie o QR Code exibido no terminal.

O computador e o celular devem estar conectados à mesma rede Wi-Fi.

---

# 🧪 Comandos úteis

## Verificar versão do Node.js

    node --version

---

## Verificar versão do npm

    npm --version

---

## Verificar versão do Expo

    npx expo --version

---

## Instalar dependências

    npm install

---

## Verificar dependências e configuração

    npx expo-doctor

---

## Iniciar aplicação

    npx expo start

---

## Iniciar aplicação no Android

    npx expo start --android

---

## Iniciar aplicação no iOS

    npx expo start --ios

---

## Iniciar aplicação na Web

    npx expo start --web

---

## Limpar cache

    npx expo start --clear

---

# ⚙️ Configuração do Expo

As configurações principais da aplicação estão no arquivo:

    app.json

Esse arquivo contém informações como:

- Nome do aplicativo;
- Identificação do projeto;
- Versão;
- Orientação da tela;
- Ícone;
- Configurações do Android;
- Configurações do iOS;
- Configurações da Web.

---

# 📋 Dependências principais

O projeto utiliza as seguintes tecnologias e bibliotecas principais:

    Expo SDK 54
    React 19.1.0
    React Native 0.81.5
    TypeScript
    React Navigation
    React Native Screens
    React Native Safe Area Context
    Expo Status Bar

As versões específicas das dependências estão registradas nos arquivos:

    package.json

e:

    package-lock.json

---

# 🗄️ Banco de dados

O projeto não necessita de banco de dados para ser executado.

Os produtos utilizados na aplicação são dados locais armazenados no próprio projeto.

Portanto, não é necessário:

- Configurar MongoDB;
- Configurar MySQL;
- Configurar PostgreSQL;
- Criar banco de dados;
- Configurar credenciais;
- Configurar variáveis de ambiente.

Basta instalar as dependências e executar o projeto.

---

# 🔐 Autenticação

O projeto não possui, em sua versão atual, um sistema de autenticação com usuário e senha.

A aplicação foi desenvolvida com foco nas funcionalidades de catálogo e carrinho.

---

# 💳 Pagamentos

O projeto não possui integração com sistemas reais de pagamento.

O carrinho é utilizado para demonstrar a seleção de produtos e o cálculo do valor total.

---

# 🌐 API

A aplicação não depende de uma API externa para apresentar o catálogo.

Os dados utilizados na demonstração são armazenados localmente no projeto.

Essa decisão mantém a aplicação simples e facilita sua execução durante a apresentação e avaliação.

---

# 🧩 Arquitetura simplificada

A arquitetura da aplicação pode ser representada da seguinte maneira:

    React Native / Expo
             │
             ▼
        Interface
             │
       ┌─────┴─────┐
       ▼           ▼
    Catálogo     Carrinho
       │           │
       ▼           ▼
    Produtos    CartContext
       │           │
       └─────┬─────┘
             ▼
        Dados locais

---

# 📌 Escopo atual

O escopo atual do projeto contempla:

- Aplicação mobile;
- Catálogo de produtos;
- Navegação entre telas;
- Carrinho de compras;
- Adição de produtos;
- Remoção de produtos;
- Alteração de quantidade;
- Cálculo do total;
- Gerenciamento de estado utilizando Context API.

---

# 🚀 Possíveis evoluções

Como possíveis evoluções futuras do projeto, poderiam ser implementadas:

- Cadastro de usuários;
- Login;
- Banco de dados;
- API própria;
- Backend;
- Autenticação;
- Histórico de pedidos;
- Favoritos;
- Busca de produtos;
- Filtros por categoria;
- Controle de estoque;
- Integração com pagamentos;
- Cadastro de animais;
- Agendamento de serviços;
- Notificações;
- Persistência do carrinho;
- Integração com serviços externos.

Essas funcionalidades não fazem parte do escopo atual da aplicação.

---

# ⚠️ Solução de problemas

## Erro: "Project is incompatible with this version of Expo Go"

Esse erro ocorre quando a versão do Expo Go instalada no dispositivo não é compatível com o SDK utilizado pelo projeto.

Verifique a versão do Expo:

    npx expo --version

O projeto foi desenvolvido utilizando:

    Expo SDK 54

Caso o Expo Go do dispositivo seja incompatível, utilize um ambiente compatível para executar o projeto.

---

## Erro durante a instalação das dependências

Caso ocorram problemas durante o `npm install`, verifique:

1. Se o Node.js está instalado;
2. Se o terminal está aberto na pasta correta;
3. Se existe um arquivo `package.json`;
4. Se existe conexão com a internet.

Depois tente novamente:

    npm install

---

## Aplicação não atualiza depois de uma alteração

Tente limpar o cache:

    npx expo start --clear

Depois abra novamente a aplicação no Expo Go.

---

## QR Code não funciona

Verifique se:

- O computador está conectado à internet;
- O celular está conectado à mesma rede Wi-Fi;
- O Expo está executando;
- O Expo Go está instalado;
- O QR Code foi escaneado corretamente.

Também é possível reiniciar o Expo:

    npx expo start

---

# 👨‍🏫 Informações para avaliação

O projeto foi desenvolvido com o objetivo de demonstrar conhecimentos relacionados ao desenvolvimento de aplicações mobile.

Entre os conceitos aplicados estão:

- Desenvolvimento com React Native;
- Utilização do Expo;
- TypeScript;
- Componentização;
- Navegação entre telas;
- Gerenciamento de estado;
- Context API;
- Organização de código;
- Separação entre telas, contexto e dados;
- Controle de dependências através do npm.

---

# 📚 Resumo do projeto

O **PetFácil** é uma aplicação mobile desenvolvida em React Native utilizando Expo e TypeScript.

A aplicação apresenta um catálogo de produtos para animais de estimação e permite que o usuário selecione produtos e gerencie um carrinho de compras.

O estado do carrinho é centralizado utilizando Context API, permitindo que as diferentes telas compartilhem as informações dos produtos selecionados.

Os produtos utilizados na aplicação são armazenados localmente, não sendo necessário configurar banco de dados ou API externa para executar o projeto.

---

# 🚀 Execução rápida

Para executar o projeto de forma resumida:

    npm install

    npx expo-doctor

    npx expo start

Depois, abra o **Expo Go** no celular e escaneie o QR Code apresentado.

---

# 🐾 PetFácil

**Aplicação mobile acadêmica para catálogo de produtos e gerenciamento de carrinho para pets.**

### Tecnologias

**React Native • Expo • TypeScript • React Navigation • Context API • npm**
