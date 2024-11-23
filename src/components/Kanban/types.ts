export type TaskStatus = "todo" | "progress" | "done"

export interface Task {
  id: string;
  content: string;
  status: TaskStatus;
  userId: string;
};

export interface TaskProps {
  task: Task;
  fromColumnId: string;
  onTaskMove: (taskId: string, fromColumnId: string, toColumnId: string) => void;
};

export interface Column {
  id: string;
  status?: TaskStatus;
  title: string;
  tasks: Task[];
};

export interface ColumnProps {
  column: Column;
  onTaskMove: (taskId: string, fromColumnId: string, toColumnId: string) => void;
};
