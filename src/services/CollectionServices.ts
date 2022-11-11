import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import CollectionRepository from '@repositories/CollectionRepository';
import {
  DocQueryResponse,
  ListQueryResponse,
  MutationResponse,
} from '@types/promise-types';

class CollectionServices {
  protected repository: CollectionRepository;
  constructor() {
    this.repository = new CollectionRepository();
  }

  async addDoc(collectionName: string, values: any): Promise<MutationResponse> {
    try {
      const doc = await this.repository.addDoc(collectionName, values);
      return {
        status: 'success',
        errorMessage: '',
        successMessage: 'document created successfully!',
        data: doc,
      };
    } catch (error: any) {
      return {
        status: 'error',
        errorMessage: error.message,
        successMessage: '',
      };
    }
  }

  async addDocWithId(
    collectionName: string,
    docId: string,
    values: any,
    merge = false,
  ): Promise<MutationResponse> {
    try {
      await this.repository.addDocWithId(collectionName, docId, values, merge);
      return {
        status: 'success',
        successMessage: 'Document added',
        errorMessage: '',
      };
    } catch (error: any) {
      return {
        status: 'error',
        successMessage: '',
        errorMessage: error.message,
      };
    }
  }
  async updateDoc(
    collectionName: string,
    docId: string,
    values: any,
  ): Promise<MutationResponse> {
    try {
      await this.repository.updateDoc(collectionName, docId, values);
      return {
        status: 'success',
        errorMessage: '',
        successMessage: 'document updated successfully!',
      };
    } catch (error: any) {
      return {
        status: 'error',
        errorMessage: error.message,
        successMessage: '',
      };
    }
  }
  async updateDocWithMerge(
    collectionName: string,
    docId: string,
    values: any,
  ): Promise<MutationResponse> {
    try {
      await this.repository.updateDocWithMerge(collectionName, docId, values);
      return {
        status: 'success',
        errorMessage: '',
        successMessage: 'document updated successfully!',
      };
    } catch (error: any) {
      return {
        status: 'error',
        errorMessage: error.message,
        successMessage: '',
      };
    }
  }

  async getDoc(
    collectionName: string,
    docId: string,
  ): Promise<DocQueryResponse<any>> {
    try {
      const doc = await this.repository.getDoc(collectionName, docId);

      if (doc.exists) {
        const data = doc.data();
        return {
          status: 'success',
          errorMessage: '',
          item: {uid: doc.id, ...data},
        };
      }

      return {
        status: 'error',
        errorMessage: 'no item found!',
      };
    } catch (error: any) {
      return {
        status: 'error',
        errorMessage: error.message,
      };
    }
  }

  async getDocs(
    query: FirebaseFirestoreTypes.Query,
  ): Promise<ListQueryResponse<any>> {
    try {
      const querySnapshot = await this.repository.getDocs(query);
      const isCollectionEmpty = querySnapshot.size === 0;

      const list: any[] = [];
      if (!isCollectionEmpty) {
        querySnapshot.forEach(doc => {
          list.push({uid: doc.id, ...doc.data()});
        });
      }

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

      return {
        status: 'success',
        errorMessage: '',
        list: list,
        lastDoc: lastDoc,
        isEmpty: isCollectionEmpty,
      };
    } catch (error: any) {
      return {
        status: 'error',
        errorMessage: error.message,
        list: [],
        lastDoc: null,
        isEmpty: true,
      };
    }
  }
}

export default CollectionServices;
