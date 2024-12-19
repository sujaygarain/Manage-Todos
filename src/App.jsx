
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { TodoProvider } from "./contexts";
import { db } from "./firebaseConfig";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const todosCollectionRef = collection(db, "todos");

  const fetchTodos = async () => {
    const data = await getDocs(todosCollectionRef);
    setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const addTodo = async (todo) => {
    const docRef = await addDoc(todosCollectionRef, todo);
    setTodos((prev) => [{ ...todo, id: docRef.id }, ...prev]);
  };

  const updateTodo = async (id, todo) => {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, todo);
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo))
    );
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    await deleteDoc(todoDoc);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    const updatedTodo = { completed: !todo.completed };
    updateTodo(id, updatedTodo);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Manage Your Todos
          </h1>
          <TodoForm />
          <div className="mt-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {todos.length > 0 ? (
              <ul className="space-y-4">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-600">No todos found.</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

