import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SessionRepository from '@repositories/SessionRepository';
import {MutationResponse} from '@types/promise-types';

class SessionServices {
  protected repository: SessionRepository;

  constructor() {
    this.repository = new SessionRepository();
  }
  async signInWithPhoneNumber(phoneNumber: string): Promise<MutationResponse> {
    try {
      const confirmation = await this.repository.signInWithPhoneNumber(
        phoneNumber,
      );
      return {
        status: 'success',
        successMessage: 'sign in with phone successful',
        errorMessage: '',
        data: confirmation,
      };
    } catch (error: any) {
      return {
        status: 'error',
        successMessage: '',
        errorMessage: error.message,
      };
    }
  }
  async confirmCode(
    confirmationResult: FirebaseAuthTypes.ConfirmationResult,
    code: string,
  ): Promise<MutationResponse> {
    try {
      const user = await this.repository.confirmCode(confirmationResult, code);
      return {
        status: 'success',
        successMessage: 'code verified successfully',
        errorMessage: '',
        data: user,
      };
    } catch (error: any) {
      return {
        status: 'error',
        successMessage: '',
        errorMessage: error.message,
      };
    }
  }
}

export default SessionServices;
