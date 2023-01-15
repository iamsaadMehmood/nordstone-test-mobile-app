import {create} from 'apisauce';
import {API_URL} from '../config/url';
import {notifyToast} from '../utils/toast';
import {messages} from '../helpers/messages';

const api = create({
  baseURL: API_URL,
  headers: {Accept: 'application/vnd.github.v3+json'},
});

export const calculate = async (
  firstNumber: number,
  secondNumber: number,
  operation: string,
): Promise<number | undefined> => {
  const response = await api.post<number>('calculator', {
    firstNumber,
    secondNumber,
    operation,
  });
  if (response.ok) {
    return response.data;
  } else {
    notifyToast(messages.authSvc503);
  }
};
