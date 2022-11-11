import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

class CollectionRepository {
  async addDoc(
    collectionName: string,
    values: any,
  ): Promise<FirebaseFirestoreTypes.DocumentReference<any>> {
    return firestore()
      .collection(collectionName)
      .add({...values});
  }
  async addDocWithId(
    collectionName: string,
    docId: string,
    values: any,
    merge?: boolean,
  ): Promise<void> {
    return firestore()
      .collection(collectionName)
      .doc(docId)
      .set({...values}, {merge});
  }

  async updateDoc(
    collectionName: string,
    docId: string,
    values: any,
  ): Promise<void> {
    return firestore()
      .collection(collectionName)
      .doc(docId)
      .update({...values});
  }
  async updateDocWithMerge(
    collectionName: string,
    docId: string,
    values: any,
  ): Promise<void> {
    return firestore()
      .collection(collectionName)
      .doc(docId)
      .set({...values}, {merge: true});
  }
  async getDoc(
    collectionName: string,
    docId: string,
  ): Promise<FirebaseFirestoreTypes.DocumentSnapshot<any>> {
    return firestore().collection(collectionName).doc(docId).get();
  }

  async getDocs(
    query: FirebaseFirestoreTypes.Query,
  ): Promise<FirebaseFirestoreTypes.QuerySnapshot<any>> {
    return query.get();
  }
}

export default CollectionRepository;
