const API_URL = "http://192.168.2.107:3000";

export async function apiGet<T>(
  rota: string,
  token?: string
): Promise<T> {
  const resposta = await fetch(`${API_URL}${rota}`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || `Erro na API: ${resposta.status}`);
  }

  return dados as T;
}

export async function apiPost<T>(
  rota: string,
  dados: unknown,
  token?: string
): Promise<T> {
  const resposta = await fetch(`${API_URL}${rota}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(dados),
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      resultado.message || `Erro na API: ${resposta.status}`
    );
  }

  return resultado as T;
}