import { useState } from "react";
// import "./App.css";
import "./index.css";


function App() {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");

    function handleAddTodo() {
        {/* [...todos, newTodo] here 
        ...todos = spread operator -> takes everything inside todos
        newTodo = the new item to add at the end
         */}
        if (newTodo.trim() === "") return; // stop if empty
        setTodos([...todos, { text: newTodo, completed: false }]);
        setNewTodo("");
    }

    function handleToggleTodo(index) {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    function handleDeleteTodo(index) {
        // todos.filter((_,i) => i !== index 
        // here _ means "i don't care about the item value,just index"
        // it keeps everything except the clicked index
        setTodos(todos.filter((_, i) => i !== index));
    }


    function handleStartEdit(index) {
        setEditIndex(index);
        setEditText(todos[index].text);   // preliad with current text
    }

    function handleSaveEdit(index) {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, text: editText } : todo
            )
        );

        setEditIndex(null);
        setEditText("");
    }

    function handleCancelEdit() {
        setEditIndex(null);
        setEditText("");
    }

    return (

        <div className="bg-slate-100 rounded-lg m-10 flex items-center justify-center px-6 py-8 ">
            <div className="bg-white w-full rounded-lg shadow-lg p-6">
                <h2 className="text-2xl text-center font-medium mb-4">My Todo App</h2>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        className="addin"
                    />
                    <button onClick={handleAddTodo}
                        className="px-4 py-2 text-white bg-blue-400 rounded-lg hover:bg-blue-500"
                    >Add</button>
                </div>
                {/* <p className="">Current Todo: {newTodo}</p> */}


                <ul className="space-y-3">
                    {todos.map((todo, index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between bg-gray-50 rounderd-lg px-3 py-2 shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(index)}
                                    className="h-4 w-4"
                                />

                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="px-2 py-1 border rounded-lg"
                                    />
                                ) : (
                                    <span
                                        className={`${todo.completed ? "line-through text-gray-400" : ""
                                            }`}
                                    >
                                        {todo.text}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                {editIndex === index ? (
                                    <>
                                        <button
                                            onClick={() => handleSaveEdit(index)}
                                            className="text-green-500 hover:text-green-700"
                                        >💾
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="text-red-500 hover:text-red-700"
                                        >✘
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleStartEdit(index)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >✎
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteTodo(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    🗑
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;