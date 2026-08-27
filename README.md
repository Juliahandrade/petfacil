🐾 PetFacil

Aplicativo de compras para pet shop com recomendações personalizadas, desenvolvido em React Native.

Projeto da disciplina de Sistemas de Informação — Desenvolvimento Mobile 

📋 Sobre o projeto

O PetFacil é um aplicativo mobile que aproxima o pet shop de seus clientes, permitindo que tutores façam login, naveguem pelo catálogo de produtos, montem um carrinho de compras, finalizem pedidos e tirem dúvidas com um assistente virtual de IA. O pagamento e a retirada continuam sendo feitos presencialmente na loja — o app apenas registra o pedido.

Esta é a Fase 1 do projeto: todo o comportamento é implementado de forma visual, com dados simulados (mock) em memória, sem integração com back-end ou banco de dados real.

🎯 Objetivos
Implementar telas de cadastro e login com validação completa dos campos.
Exibir um catálogo de produtos simulado, com preço atual e preço promocional.
Permitir adicionar e remover itens de um carrinho de compras dinâmico.
Registrar uma compra para cada produto ao finalizar o pedido com sucesso.
Oferecer um assistente com IA para auxiliar o usuário a esclarecer dúvidas.
Organizar o código em componentes reutilizáveis, com nomenclatura clara e consistente.

✅ Escopo da Fase 1
Está no escopo	Fora do escopo (fases futuras)
Telas, navegação e componentes visuais	Back-end e banco de dados reais
Autenticação simulada (sem token real)	Autenticação com token e criptografia
Catálogo e compras com dados mock	Integração com API e persistência remota
Validação de formulários no dispositivo	Meios de pagamento e gateway
Assistente com IA para dúvidas do usuário	Recomendação automática por histórico real

🚀 Funcionalidades (Requisitos Funcionais)
Código	Requisito	Descrição
RF01	Cadastrar usuário	Criar conta com nome completo, e-mail, CPF e senha (com confirmação).
RF02	Efetuar login	Autenticar o usuário via login e senha (simulado).
RF03	Visualizar produtos	Exibir catálogo com nome, preço atual e preço promocional.
RF04	Adicionar ao carrinho	Incluir um produto selecionado no carrinho.
RF05	Visualizar carrinho	Mostrar itens adicionados e valor total do pedido.
RF06	Remover do carrinho	Excluir um item específico do carrinho.
RF07	Finalizar pedido	Concluir a compra (pagamento no caixa da loja).
RF08	Registrar compra	Gerar um registro de compra para cada produto do carrinho.
RF09	Assistente com IA	Disponibilizar assistente para dúvidas sobre produtos e pedidos.

🔐 Regras de validação do cadastro
Campo	Regra
Nome completo	Obrigatório, mínimo de 2 caracteres.
E-mail	Obrigatório, formato de e-mail válido.
CPF	Obrigatório, apenas CPF válido (dígitos verificadores conferem).
Senha	Obrigatória.
Repetir senha	Obrigatória e idêntica ao campo Senha.

Enquanto alguma regra não for atendida, o botão de cadastro permanece indisponível (ou o envio é bloqueado), com mensagens claras indicando o que corrigir.

🗂️ Modelo de dados
Usuário
cpf — identificador único
nomeCompleto
login
senha
Produto
nome
precoAtual
precoPromocional
tipo (ex.: ração, brinquedo, higiene)
descricao
dataValidade
Compra
nomeProduto
preco
dataDaCompra

Para um carrinho com vários itens, uma compra é gerada por produto no momento da finalização do pedido.

🧭 Fluxo de navegação
Login ──login ok──▶ Lista de Produtos ──adicionar──▶ Carrinho de Compras ──finalizar──▶ Pedido Finalizado
  ▲                        │      ▲
  │                    ver/voltar │
cadastrar             ▼           │
Cadastro          Detalhe do Produto
                        │
                 ajuda em qualquer tela
                        ▼
                Assistente virtual (IA)
Telas
Login — campos de login e senha, botão de acesso e atalho para cadastro.
Cadastro — nome completo, e-mail, CPF, senha e repetição de senha, com validação em tempo real.
Lista de produtos — catálogo com nome, preços e selo de promoção; cada item permite adicionar ao carrinho.
Detalhe do produto — descrição, tipo, validade e preços, com opção de adicionar ao carrinho.
Carrinho — itens adicionados, valor total, remoção individual e botão de finalizar pedido.
🤖 Diferencial: assistente virtual com IA

O PetFacil oferece um assistente com IA para ajudar o usuário a esclarecer dúvidas, como:

"Qual ração é indicada para filhotes?"
"Quais produtos estão em promoção hoje?"
"Como finalizo meu pedido?"

Um botão flutuante presente nas telas principais abre uma janela de conversa (chat). Na Fase 1, as respostas podem ser simuladas a partir de um conjunto de perguntas e respostas frequentes.

🏗️ Arquitetura e tecnologias

A aplicação organiza-se em camadas: apresentação (telas e componentes), navegação (controle de rotas), estado e regras (carrinho e validações) e dados locais simulados. O assistente com IA conversa com a camada de apresentação, sem interferir no fluxo de compra.

Tecnologias sugeridas
React Native — construção da interface mobile multiplataforma.
React Navigation — gerenciamento de rotas e fluxo entre telas.
Hooks (useState, useContext) ou biblioteca de estado — gerenciamento do carrinho.
Componentes reutilizáveis (botões, campos, cartões de produto) organizados por responsabilidade.
Dados mock em arquivos locais para produtos e registros de compra.


📦 Como executar
bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npx expo start
# ou, para React Native CLI:
npx react-native run-android
npx react-native run-ios

Ajuste os comandos acima conforme a ferramenta utilizada para inicializar o projeto (Expo ou React Native CLI
