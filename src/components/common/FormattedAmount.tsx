import {dinero, convert} from 'dinero.js';
import {NGN, USD, GHS} from '@dinero.js/currencies';
import {intlFormat} from '@utils/funcs';
import {useGlobal} from '@hooks/app-hooks';
import {ITransactionCurrency} from '@types/transactions-types';

export const getCurrency = (_currency: ITransactionCurrency) => {
  switch (_currency) {
    case 'USDT':
      return USD;
    case 'GHS':
      return GHS;
    case 'GHC':
      return GHS;
    case 'NGN':
      return NGN;
    default:
      return USD;
  }
};
export const rates = {
  USD: {amount: 24, scale: 4},
  GHS: {amount: 40, scale: 3},
  NGN: {amount: 1, scale: 0},
};

interface Props {
  amount: number;
  currency?: ITransactionCurrency;
  actual?: boolean;
}
const FormattedAmount = ({amount, currency, actual}: Props) => {
  const globalCurrency = useGlobal().currency;

  const d = dinero({
    amount: amount !== undefined ? Math.floor(amount) : 100,
    currency: actual ? getCurrency(currency ? currency : 'NGN') : NGN,
    scale: 0,
  });
  const _dAmount = convert(d, getCurrency(globalCurrency), rates);
  const _cdAmount = convert(d, getCurrency(currency ? currency : 'NGN'), rates);

  return (
    <>
      {actual
        ? intlFormat(d, 'en-NG')
        : currency
        ? intlFormat(_cdAmount, 'en-NG')
        : globalCurrency === 'NGN'
        ? intlFormat(d, 'en-NG')
        : intlFormat(_dAmount, 'en-NG')}
    </>
  );
};

export default FormattedAmount;
