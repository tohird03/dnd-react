import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Task = {
  id: string;
  content: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialColumns: Column[] = [
  { id: "todo", title: "To Do", tasks: [{ id: "1", content: "Task 1" }, { id: "2", content: "Task 2" }] },
  { id: "progress", title: "In Progress", tasks: [{ id: "3", content: "Task 3" }] },
  { id: "done", title: "Done", tasks: [{ id: "4", content: "Task 4" }] },
];

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const handleTaskMove = (taskId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
    const fromColumn = columns.find((col) => col.id === fromColumnId)!;
    const toColumn = columns.find((col) => col.id === toColumnId)!;

    const task = fromColumn.tasks.find((t) => t.id === taskId)!;

    const updatedFromTasks = fromColumn.tasks.filter((t) => t.id !== taskId);
    const updatedToTasks = [...toColumn.tasks.slice(0, toIndex), task, ...toColumn.tasks.slice(toIndex)];

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === fromColumnId) return { ...col, tasks: updatedFromTasks };
        if (col.id === toColumnId) return { ...col, tasks: updatedToTasks };
        return col;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "16px" }}>
        {columns.map((column) => (
          <Column key={column.id} column={column} onTaskMove={handleTaskMove} />
        ))}
      </div>
    </DndProvider>
  );
};

type ColumnProps = {
  column: Column;
  onTaskMove: (taskId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
};

const Column: React.FC<ColumnProps> = ({ column, onTaskMove }) => {
  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; fromColumnId: string }) => {
      if (item.fromColumnId !== column.id) {
        onTaskMove(item.id, item.fromColumnId, column.id, column.tasks.length);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
  });

  return (
    <div
      ref={dropRef}
      style={{
        background: "#f4f4f4",
        padding: "8px",
        width: "250px",
        minHeight: "500px",
        borderRadius: "8px",
        border: "1px solid #ddd",
      }}
    >
      <h2>{column.title}</h2>
      {column.tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          fromColumnId={column.id}
          index={index}
          onTaskMove={onTaskMove}
        />
      ))}
    </div>
  );
};

type TaskProps = {
  task: Task;
  fromColumnId: string;
  index: number;
  onTaskMove: (
    taskId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex: number
  ) => void;
};

const Task: React.FC<TaskProps> = ({ task, fromColumnId }) => {
  const [, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, fromColumnId },
  });

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      ref={dragRef}
      style={{
        padding: "8px",
        margin: "0 0 8px 0",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "4px",
        cursor: "grab",
      }}
    >
      {task.content}

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Kanban;
