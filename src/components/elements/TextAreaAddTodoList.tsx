import { HTMLAttributes } from "react";




interface InputAddTodoListProps extends HTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextAreaAddTodoList({ value, onChange, ...props }: InputAddTodoListProps) {
  return (
    <div className="gap-1 flex items-center justify-center">
      <textarea
        className="border border-blue-200 rounded w-64 h-8 px-2 pt-1 list-none resize-none items-center flex justify-center"
        placeholder="Adicionar uma nova tarefa..."
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
