
export type Produto = {
  id: string;
  nome: string;
  precoAtual: number;
  precoPromocional: number;
  tipo: string;
  descricao: string;
  dataValidade: string;
};

export const produtosMock: Produto[] = [
  {
    id: "1",
    nome: "Ração Premium para Cães",
    precoAtual: 89.9,
    precoPromocional: 69.9,
    tipo: "Ração",
    descricao: "Ração completa para cães adultos de médio porte.",
    dataValidade: "20/12/2027",
  },
  {
    id: "2",
    nome: "Brinquedo Mordedor",
    precoAtual: 29.9,
    precoPromocional: 24.9,
    tipo: "Brinquedo",
    descricao: "Mordedor resistente indicado para cães de pequeno e médio porte.",
    dataValidade: "Não se aplica",
  },
  {
    id: "3",
    nome: "Shampoo Pet Neutro",
    precoAtual: 35.9,
    precoPromocional: 29.9,
    tipo: "Higiene",
    descricao: "Shampoo neutro para higiene de cães e gatos.",
    dataValidade: "15/08/2028",
  },
  {
    id: "4",
    nome: "Areia Higiênica para Gatos",
    precoAtual: 42.9,
    precoPromocional: 42.9,
    tipo: "Higiene",
    descricao: "Areia higiênica com alta absorção e controle de odores.",
    dataValidade: "10/05/2028",
  },
];
