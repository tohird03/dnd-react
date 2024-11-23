import { makeAutoObservable, observable } from 'mobx';
import { IUser } from '../../types/Auth';
import { tasksApi } from '../../service/tasks/tasks';
import { Column } from '../../components/Kanban/types';
import { toast } from 'react-toastify';

class TasksStore {
  isAuth: boolean | null = false;
  token: string | null = null;
  thisuser: IUser | null = null;
  kanbanColumns: Column[] = [
    { id: "todo", title: "To Do", tasks: [] },
    { id: "progress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ];

  constructor() {
    makeAutoObservable(this, {
      isAuth: observable,
    });
  }

  getTasks = (userId: string) =>
    tasksApi?.getTasks(userId)
      .then((res) => {
        const tasks = res

        if(tasks) {
          const sortedTasks = [
            { id: "todo", title: "To Do", tasks: tasks.filter((task) => task.status === "todo") },
            { id: "progress", title: "In Progress", tasks: tasks.filter((task) => task.status === "progress") },
            { id: "done", title: "Done", tasks: tasks.filter((task) => task.status === "done") },
          ];

          this.setKanbanColumns(sortedTasks);
        }

        return res
      })
      .catch(toast.error)

  setToken = (token: string) => {
    this.token = token;
  };

  setIsAuth = (isAuth: boolean) => {
    this.isAuth = isAuth;
  };

  setUser = (user: IUser) => {
    this.thisuser = user;
  }

  setKanbanColumns = (col: Column[]) => {
    this.kanbanColumns = col
  }

  reset = () => {
  };
}

export const tasksStore = new TasksStore();
