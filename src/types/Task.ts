import { TaskStatus } from "../components/Kanban/types";

export interface AddTask {
  content: string,
  userId: string,
  status: TaskStatus
}
