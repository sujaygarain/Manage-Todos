import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center border border-gray-200 rounded-lg px-4 py-3 gap-x-4 shadow-md transition-all duration-300 ${
        todo.completed ? "bg-green-200 line-through" : "bg-gray-200"
      } hover:shadow-lg`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`flex-1 bg-transparent outline-none text-gray-800 font-medium ${isTodoEditable ? "border-gray-300 px-3 py-2" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-full text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✎"}
      </button>

      <button
        className="inline-flex w-8 h-8 rounded-full text-sm border border-gray-300 justify-center items-center bg-gray-50 hover:bg-red-100 transition-colors"
        onClick={() => deleteTodo(todo.id)}
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
