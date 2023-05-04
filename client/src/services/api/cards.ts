import { ICard } from '../../types/cards';

export const getCards = (): Promise<ICard[]> =>
  fetch(`${process.env.REACT_APP_API_URL}cards`).then(res => res.json());

export const updateCardsOrder = (
  data: { type: string; position: number }[],
): Promise<any> =>
  fetch(`${process.env.REACT_APP_API_URL}cards`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
