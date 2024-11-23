import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Kanban from "./components/Kanban/Board";

const columnData = [
  {
    id: 'todo',
    text: 'Todo'
  },
  {
    id: 'progress',
    text: 'Progress'
  },
  {
    id: 'done',
    text: 'Done'
  },
];

const data = [
  {
    id: '1',
    col_id: 'todo',
    text: 'Salom 1'
  },
  {
    id: '2',
    col_id: 'todo',
    text: 'Salom 2'
  },
  {
    id: '3',
    col_id: 'todo',
    text: 'Salom 3'
  },
  {
    id: '4',
    col_id: 'progress',
    text: 'Salom 4'
  },
]

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%", gap: '40px' }}>
      <Kanban />
    </div>
  );
}

export default App;
