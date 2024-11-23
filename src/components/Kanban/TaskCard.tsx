import React, { useState, useRef } from "react";
import { useDrag } from "react-dnd";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineCheckCircle, AiFillDelete } from "react-icons/ai";
import { TaskProps } from "./types";
import { db } from "../../firebase/firebase";
import { tasksStore } from "../../store/tasks";
import { authStore } from "../../store/auth";
import { Button } from "../Button";
import './kanban.scss'

export const TaskCard: React.FC<TaskProps> = ({ task, fromColumnId, onTaskMove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(task.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, fromColumnId },
  });

  const handleDeleteTask = async () => {
    if (task?.id) {
      try {
        const docRef = doc(db, "tasks", task?.id);
        await deleteDoc(docRef);
        await tasksStore?.getTasks(authStore?.token!);
        toast.success("Task deleted");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    } else {
      toast.error("This task not found");
    }
  };

  const handleEditTask = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }, 0);
  };

  const handleUpdateTask = async () => {
    if (task?.id && updatedContent.trim()) {
      try {
        const docRef = doc(db, "tasks", task.id);
        await updateDoc(docRef, { content: updatedContent });
        await tasksStore?.getTasks(authStore?.token!);
        toast.success("Task updated");
        setIsEditing(false);
      } catch (error) {
        toast.error("Failed to update task");
      }
    } else {
      toast.error("Content cannot be empty");
    }
  };

  return (
    <div
      ref={dragRef}
      className="task-card"
    >
      <textarea
        ref={textareaRef}
        id="message"
        rows={3}
        value={isEditing ? updatedContent : task.content}
        onChange={(e) => setUpdatedContent(e.target.value)}
        disabled={!isEditing}
        className="task-textarea"
        placeholder="Write new task"
      />
      <div className="task-actions">
        <Button
          onClick={isEditing ? handleUpdateTask : handleEditTask}
          icon={isEditing ? <AiOutlineCheckCircle /> : <AiOutlineEdit />}
          color={isEditing ? 'green' : 'blue'}
        />
        <Button
          onClick={handleDeleteTask}
          icon={<AiFillDelete />}
          color="red"
        />
      </div>
    </div>
  );
};
