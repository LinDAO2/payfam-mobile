import uuid from 'react-native-uuid';
import { Currency, Dinero, toFormat } from "dinero.js";

export function intlFormat(
  dineroObject: Dinero<number>,
  locale: string,
  options = {}
) {
  function transformer({
    amount,
    currency,
  }: {
    amount: number;
    currency: Currency<number>;
  }) {
    return amount.toLocaleString(locale, {
      ...options,
      style: "currency",
      currency: currency.code,
    });
  }

  return toFormat(dineroObject, transformer);
}


export const generateUUIDV4 = ():string => {
  return uuid.v4() as string;
};

export const stringToArray = (str: string) => {
  const _noSpace = str.toLowerCase().replace(/\s/g, '');
  const _stringToArray = Array.from(_noSpace);
  const _unique = Array.from(new Set(_stringToArray.map(item => item)));
  // const _unique = uniq(_stringToArray)
  return _unique;
};

export const stringToArrayWithDuplicate = (str: string): string[] => {
  const _noSpace = str.toLowerCase().replace(/\s/g, '');
  const _stringToArray = Array.from(_noSpace);
  return _stringToArray;
};
