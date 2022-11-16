import {ISetProfile, sessionActions} from '@db/session-slice';
import {store} from '@db/store';

export const setProfile = (payload: ISetProfile) => {
  store.dispatch(sessionActions.set(payload));
};
export const setProfileReload = (payload: boolean) => {
  store.dispatch(sessionActions.setReload(payload));
};

export const resetProfile = () => {
  store.dispatch(sessionActions.reset());
};
