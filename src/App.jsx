import React, { useState } from "react";
import { Trash2, Check } from "lucide-react";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="w-[90%] md:w-[60%] h-[75vh] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.35)] bg-white/70 backdrop-blur-xl flex flex-col">

        {/* Header */}
        <div className="px-10 py-8">
          <h1 className="text-3xl font-bold text-green-700">Today’s Tasks</h1>
          <p className="text-sm text-gray-800 mt-2">
            Organize your day beautifully
          </p>
        </div>

        {/* Input */}
        <div className="px-10 pb-6">
          <div className="flex items-center gap-4 bg-white rounded-2xl shadow-inner px-5 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="What do you want to accomplish?"
              className="flex-1 bg-white text-sm outline-none placeholder-gray-600"
            />
            <button
              onClick={addTask}
              className="px-6 py-2 rounded-xl bg-green-700 text-white text-sm font-medium shadow-lg hover:scale-105 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 px-10 pb-8 overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-600">
              <p className="text-xl">Your task list is empty</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between px-6 py-3 rounded-2xl bg-white shadow-md hover:shadow-xl transition
                  ${task.completed ? "opacity-60" : ""}`}
                >
                  {/* Task Text */}
                  <span
                    className={`text-sm md:text-base font-medium
                    ${task.completed
                      ? "line-through text-green-700"
                      : "text-gray-800"}`}
                  >
                    {task.text}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-6">
                    <Check
                      size={22}
                      onClick={() => toggleTask(task.id)}
                      className={`cursor-pointer transition
                      ${task.completed
                        ? "text-green-700"
                        : "text-green-700 hover:text-green-900"}`}
                    />

                    <Trash2
                      size={18}
                      className="text-red-700 hover:text-red-900 cursor-pointer"
                      onClick={() => deleteTask(task.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="px-10 py-4 text-sm text-gray-700">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
        </div>
      </div>
    </div>
  );
}
