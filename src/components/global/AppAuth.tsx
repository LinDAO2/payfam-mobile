import React, {FC, ReactNode, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {COLLECTIONS} from 'contants/collections';
import {IProfileDocument} from '@types/session-types';
import {resetProfile, setProfile} from '@helpers/session-helpers';
import {collectionServices} from '@services/root';
import {useSession} from '@hooks/app-hooks';

interface Props {
  children: ReactNode | ReactNode[];
}
const AppAuth: FC<Props> = ({children}) => {
  const profileReload = useSession().reload;

  async function onAuthStateChanged(user: any) {
    if (user) {
      // User is signed in
      const credential = user as FirebaseAuthTypes.User;
      if (credential.uid !== undefined) {
        const {status, item} = await collectionServices.getDoc(
          COLLECTIONS.profiles,
          credential.uid,
        );
        if (status === 'success' && item) {
          const data = item as Omit<IProfileDocument, 'uid'>;

          const profile: IProfileDocument & {
            isLoaded: boolean;
            isEmpty: boolean;
            reload: boolean;
          } = {
            uid: credential.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            country: data.country,

            persona: data.persona,
            wallet: data.wallet
              ? data.wallet
              : {
                  balance: 0,
                  pendingPayout: 0,
                  totalCommission: 0,
                  credit: 0,
                },

            addedOn: data.addedOn,
            status: data.status,
            query: data.query,
            queryType: data.queryType,

            isLoaded: true,
            isEmpty: false,
            reload: false,
          };
          setProfile(profile);
        }
      }
    } else {
      // User is signed out
      resetProfile();
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [profileReload]);

  return <>{children}</>;
};

export default AppAuth;
