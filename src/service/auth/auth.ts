import { addDoc, collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { IAuthForm, ISignUpForm } from '../../types/Auth';

class AuthApi {
  signup = async (params: ISignUpForm): Promise<any> => {
    const usersCollection = collection(db, 'users');

    const userQuery = query(
      usersCollection,
      where('username', '==', params.username),
      where('password', '==', params.password)
    );
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      const newUserRef = await addDoc(usersCollection, params);
      const newUserDoc = await getDoc(newUserRef);

      return { id: newUserDoc.id, ...newUserDoc.data() };
    } else {
      throw new Error('User already exists.');
    }
  };

  signin = async (params: IAuthForm): Promise<any> => {
    const usersRef = collection(db, "users");

    const q = query(
      usersRef,
      where("username", "==", params?.username),
      where("password", "==", params?.password)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      return { ...userData, id: querySnapshot.docs[0].id };
    } else {
      throw new Error("User not found!");
    }
  }
}

export const authApi = new AuthApi();
