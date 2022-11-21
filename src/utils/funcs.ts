import uuid from 'react-native-uuid';
import {convert, Currency, dinero, Dinero, toFormat} from 'dinero.js';
import {ITransactionCurrency} from '@types/transactions-types';
import {NGN} from '@dinero.js/currencies';
import {getCurrency, rates} from '@components/common/FormattedAmount';

export const getIntFromDinero = ({
  amount,
  currency,
}: {
  amount: number;
  currency: ITransactionCurrency;
}) => {
  const d = dinero({
    amount: amount !== undefined ? Math.floor(amount) : 100,
    currency: NGN,
    scale: 0,
  });

  const _dAmount = convert(d, getCurrency(currency ? currency : 'NGN'), rates);

  return _dAmount.toJSON().amount / 10 ** _dAmount.toJSON().scale;
};

export function intlFormat(
  dineroObject: Dinero<number>,
  locale: string,
  options = {},
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
      style: 'currency',
      currency: currency.code,
    });
  }

  return toFormat(dineroObject, transformer);
}

export const generateUUIDV4 = (): string => {
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
