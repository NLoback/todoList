import {  MouseEvent } from "react";


interface PriorityAlertsProps {
    value: string;
    onclick?: (event: MouseEvent<HTMLButtonElement>) => void;
    color: string;
}



export function PriorityAlerts({ value, onclick, color }: PriorityAlertsProps) {
  return (
    <div>
      <button
        type="button"
        value={value}
        onClick={onclick}
        className="hover:{color} cursor-pointer bg-[#262626]"
      >
        {color}
      </button>
    </div>
  );
}
