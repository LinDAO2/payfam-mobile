import {IProfileWallet} from '@types/session-types';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

interface Props {
  wallet: IProfileWallet;
}
const WalletBankAccountInfo = ({wallet}: Props) => {
  if (!wallet?.bankAccount) return <></>;
  return (
    <View
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        margin: 5,
      }}>
      <Text variant="labelLarge" style={{marginTop: 20, textAlign: 'center'}}>
        Bank account information
      </Text>

      {wallet?.bankAccount !== undefined && wallet !== undefined && (
        <View style={{alignItems: 'center'}}>
          <Text variant="titleMedium">Account name</Text>
          <Text>{wallet?.bankAccount.paystack.accountName}</Text>
          <Text variant="titleMedium">Account number</Text>
          <Text>{wallet?.bankAccount.paystack.accountNumber}</Text>
          <Text variant="titleMedium">Bank name</Text>
          <Text>{wallet?.bankAccount.paystack.bankName}</Text>
        </View>
      )}
    </View>
  );
};

export default WalletBankAccountInfo;
