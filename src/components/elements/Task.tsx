import { TrashIcon, ExclamationTriangleIcon} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { PriorityAlerts } from "./PriorityAlerts";

interface TaskProp {
  id: number;
  content: string;
  completed: boolean;
  setCompleted: (completed: boolean) => void;
  onDeleteTask: (taskId: number) => void;
}

const isSelectColor = [
  {
    id: 1,
    status: "Urgente",
  },
  {
    id: 2,
    status: "Alta",
  },
  {
    id: 3,
    status: "Normal",
  },
  {
    id: 4,
    status: "Baixa",
  },
];

export function Task({
  content,
  setCompleted,
  completed,
  onDeleteTask,
  id,
}: TaskProp) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }


  //FIXME: ver se consigo refatorar esses estados para algo melhor no código
  const [open, setOpen] = useState(false);
  const [isSelect, setIsSelect] = useState("");
  const [colorAlert, setColorAlert] = useState("");

  //FIXME: função que muda a cor do alerta 
  useEffect(() => {
    if (isSelect === "Urgente") {
      setColorAlert("text-red-500");
    } else if (isSelect === "Alta") {
      setColorAlert("text-yellow-500");
    } else if (isSelect === "Normal") {
      setColorAlert("text-green-500");
    } else if (isSelect === "Baixa") {
      setColorAlert("text-blue-500");
    }
    colorAlert !== "" ? setOpen(false) : setOpen(false);
  }, [isSelect, colorAlert]);

  return (
    <div
      className={clsx(
        !completed
          ? "flex flex-row text-white gap-2 w-full items-center  justify-between p-4 rounded-md bg-[#262626] border border-slate-950 m-1 px-3"
          : "flex flex- row gap-2 w-full items-center justify-between p-4 rounded-md bg-[#1a1919] border border-dotted border-slate-700 m-1 px-3 line-through decoration-white decoration-2 text-[#464545]"
      )}
    >
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
          className="rounded-full w-3 h-3 border border-cyan-500 focus:outline-none  cursor-pointer focus-visible:outline-none focus:ring-0 focus:ring-offset-0  text-green-500
            "
        />
      </label>
      <div className="text-start w-9/12">
        <p>{content}</p>
      </div>
      <div className="flex flex-row justify-start items-start">
        <ExclamationTriangleIcon
          width={20}
          height={20}
          onClick={() => setOpen(!open)}
          className={clsx(!completed ? `cursor-pointer ${colorAlert} hover:text-slate-400` : "text-gray-500")}
        />
        <span
          className={clsx(
            open
              ? "p-4 mx-6 mt-2  bg-[#262626] border border-[#575757] absolute z-50 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl"
              : "hidden"
          )}
        >
          <ul className="gap-2 flex flex-col">
            {isSelectColor.map((status) => {
              return (
                <li>
                  <PriorityAlerts
                    key={status.id}
                    value={status.status}
                    color={status.status}
                    onclick={() => setIsSelect(status.status)}
                  />
                </li>
              );
            })}
          </ul>
        </span>
      </div>

      <button onClick={handleDeleteTask}>
        <TrashIcon
          width={20}
          height={20}
          className="text-gray-500 hover:text-red-800"
        />
      </button>
    </div>
  );
}
