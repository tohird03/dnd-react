import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { ColumnCard } from "./ColumnCard";
import { observer } from "mobx-react";
import { authStore } from "../../store/auth";
import { tasksStore } from "../../store/tasks";

const Kanban: React.FC = observer(() => {
  const handleTaskMove = async (taskId: string, fromColumnId: string, toColumnId: string) => {
    const task = tasksStore.kanbanColumns
      .find((col) => col?.id === fromColumnId)!
      .tasks.find((t) => t?.id === taskId)!;

    const previousColumns = [...tasksStore.kanbanColumns];

    // UI FAST UPDATE
    const updatedColumns = tasksStore.kanbanColumns.map((col) => {
      if (col.id === fromColumnId) {
        return { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
      } else if (col.id === toColumnId) {
        return { ...col, tasks: [...col?.tasks, task] }
      } else {
        return col
      }
    })
    tasksStore.setKanbanColumns(updatedColumns);

    // FIREBASE UPDATE
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { status: toColumnId });
    } catch (err) {
      // IF SMTH ERROR TASK BACK OLD STATUS
      toast.error('Update error')
      tasksStore.setKanbanColumns(previousColumns);
    }
  };

  // GET ALL TASKS
  useEffect(() => {
    if(authStore?.token) {
      tasksStore.getTasks(authStore?.token);
    }
  }, [authStore?.token]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "16px" }}>
        {tasksStore.kanbanColumns?.map((column) => (
          <ColumnCard key={column.id} column={column} onTaskMove={handleTaskMove} />
        ))}
      </div>
    </DndProvider>
  );
})

export default Kanban;
