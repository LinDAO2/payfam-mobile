import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

class SessionRepository {
  async signInWithPhoneNumber(
    phoneNumber: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult> {
    return auth().signInWithPhoneNumber(phoneNumber);
  }
  async confirmCode(
    confirmationResult: FirebaseAuthTypes.ConfirmationResult,
    code: string,
  ): Promise<FirebaseAuthTypes.UserCredential | null> {
    return confirmationResult.confirm(code);
  }
}

export default SessionRepository;
