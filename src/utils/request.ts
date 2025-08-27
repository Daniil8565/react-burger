export const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = async (res: Response) => {
  const data = await res.json();

  if (res.ok && data.success) {
    return data;
  }
  console.log(data);
  const errorMessage = data.message || `Ошибка HTTP: ${res.status}`;
  throw new Error(errorMessage);
};

export const request = (endpoint: string, options?: RequestInit) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};
