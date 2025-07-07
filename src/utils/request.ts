export const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = async (res: Response) => {
  if (res.ok) {
    const data = await res.json();
    if (data.success) {
      return data;
    }
    return Promise.reject(`Ответ не success: ${JSON.stringify(data)}`);
  }
  const errorText = await res.text();
  return Promise.reject(
    `Ошибка HTTP: ${res.status} ${res.statusText} - ${errorText}`
  );
};

export const request = (endpoint: string, options?: RequestInit) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};
