import { addDoc, collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { IAuthForm, ISignUpForm } from '../../types/Auth';
import { Task } from '../../components/Kanban/types';
import { toast } from 'react-toastify';

class TasksApi {
  getTasks = async (userId: string): Promise<Task[] | undefined> => {
    try {
      const tasksRef = collection(db, "tasks");
      const q = query(tasksRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasks.push({
          ...doc.data() as Task,
          id: doc.id,
        });
      });

      return tasks
    } catch (error) {
      toast.error("Smth error")
    }
  };
}

export const tasksApi = new TasksApi();
