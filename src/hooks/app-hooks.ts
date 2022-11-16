import {useAppSelector} from './db-hooks';

export const useSession = () => {
  return useAppSelector(state => state.session);
};


export const useCollection = () => {
  return useAppSelector((state) => state.collection);
};

export const useGlobal = () => {
  return useAppSelector((state) => state.global);
};