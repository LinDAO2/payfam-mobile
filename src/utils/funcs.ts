import uuid from 'react-native-uuid';

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
