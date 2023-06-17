import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircleIcon, ListBulletIcon } from "@heroicons/react/24/solid";
import { Task } from "../elements/Task";
import clsx from "clsx";

export interface ITask {
  id: number;
  content: string;
  completed: boolean;
}

export function TasksBoard() {
  const [tasks, setTasks] = useState<ITask[]>([]); // Array de tarefas
  const [newTask, setNewTask] = useState("");

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewTask(event.target.value);
  }

  function deleteTask(taskId: number) {
    const newTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(newTasks);
  }

  const completedTasks: ITask[] = [];
  const openTasks: ITask[] = [];
  for (let index = 0; index < tasks.length; index++) {
    if (tasks[index].completed) completedTasks.push(tasks[index]);
    else openTasks.push(tasks[index]);
  }

  function handleNewInvalidTask(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Escreva um comentário");
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    setTasks([
      ...tasks,
      { id: tasks.length, content: newTask, completed: false },
    ]);
    setNewTask("");
  }
  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div className="h-40 w-full bg-[#0D0D0D] flex flex-col">
        <div className="w-full h-full justify-center items-center flex">
          <img className="h-10 w-25" src="./Logo.svg" alt="Logo" />
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-center w-full absolute top-36 gap-1">
            <textarea
              name="comment"
              value={newTask}
              onChange={handleNewTaskChange}
              placeholder="Adicionar uma nova tarefa..."
              onInvalid={handleNewInvalidTask}
              required
              rows={1}
              className="border border-blue-200 bg-gray-300 rounded w-1/2  px-2 resize-none items-center flex justify-center"
            />
            <button
              type="submit"
              className="flex gap-1 items-center justify-center bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 rounded"
            >
              Criar <PlusCircleIcon width={20} height={20} />
            </button>
          </div>
        </form>
      </div>
      <div className="h-32 flex justify-between items-center w-1/2 ">
        <p className="text-cyan-400 flex items-center">
          A Fazer
          <input
            disabled
            className="text-white w-6 text-center h-5 m-1 rounded-xl bg-slate-500 p-1"
            value={openTasks.length}
          />
        </p>
        <p className="text-orange-400 flex items-center">
          Aberto
          <input
            disabled
            className="text-white  w-6 text-center h-5 m-1 rounded-xl bg-slate-500 p-1"
            value={String(tasks.length)}
          />
        </p>
        <p className="text-green-400 flex items-center">
          Concluido
          <input
            disabled
            className="text-white  w-12 text-center h-5 m-1 rounded-xl bg-slate-500 p-0.5"
            value={`${String(completedTasks.length)} / ${tasks.length}`}
          />
        </p>
      </div>
      <div className="flex flex-col h-full items-center justify-center w-1/2 shadow-inner px-4 shadow-slate-800 pt-1 ">
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              content={task.content}
              completed={task.completed}
              onDeleteTask={deleteTask}
              setCompleted={(completed) =>
                setTasks(
                  tasks.map((item) =>
                    item.id === task.id ? { ...item, completed } : item
                  )
                )
              }
            />
          );
        })}

        <span
          className={clsx(tasks.length <= 0 ? "text-slate-500 items-center p-4 justify-center flex flex-col" : "hidden")}
        >
          <ListBulletIcon width={35} height={35} />
          Você não Possui nenhuma tarefa
        </span>
      </div>
      
    </div>
  );
}
