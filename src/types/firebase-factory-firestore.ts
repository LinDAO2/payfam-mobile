export interface IFirebaseFactoryFirestoreDocumentQueryArgs {
  field: string;
  value?: any;
  operator?:
    | 'array-contains'
    | 'in'
    | 'not-in'
    | 'array-contains-any'
    | '>='
    | '=='
    | '<='
    | '>'
    | '<';
  type?: 'where' | 'orderby';
  orderByDirection?: 'asc' | 'desc';
}
