import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ColumnProps, Task, TaskStatus } from "./types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { TaskCard } from "./TaskCard";
import { AddTask } from "@/types/Task";
import { authStore } from "../../store/auth";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import { tasksStore } from "../../store/tasks";
import './kanban.scss'
import { Button } from "../Button";

export const ColumnCard: React.FC<ColumnProps> = observer(({ column, onTaskMove }) => {
  const [isShowTextArea, setIsShowTextArea] = useState(false);
  const [taskContent, setTaskContent] = useState("");

  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; fromColumnId: string }) => {
      if (item.fromColumnId !== column.id) {
        onTaskMove(item.id, item.fromColumnId, column.id);
      }
    },
  });

  const handleAddNewTask = () => {
    setIsShowTextArea(true);
  };

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskContent(event.target.value);
  };

  const handleKeyPress = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && taskContent.trim() !== "" && authStore?.token) {
      event.preventDefault();

      addTask({
        content: taskContent,
        userId: authStore?.token,
        status: column?.id as TaskStatus,
      });
    }
  };

  const addTask = async (taskParams: AddTask) => {
    try {
      await addDoc(collection(db, "tasks"), taskParams);
      await tasksStore?.getTasks(taskParams?.userId)
      toast.success("Add new task!")
    } catch (error) {
      toast.error("Smth wrong")
    }

    setTaskContent("");
    setIsShowTextArea(false);
  };

  return (
    <div
      ref={dropRef}
      className="column"
    >
      <h2 className="column__heading">{column.title}</h2>
      <div className="column__tasks">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} fromColumnId={column.id} onTaskMove={onTaskMove} />
        ))}

        {isShowTextArea && (
          <textarea
            id="message"
            rows={3}
            value={taskContent}
            onChange={handleChangeTextArea}
            onKeyDown={handleKeyPress}
            className="block p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write new task"
          />
        )}

        <Button style={{width: '100%'}} onClick={handleAddNewTask} text="Add task" />
      </div>
    </div>
  );
});
