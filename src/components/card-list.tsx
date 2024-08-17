import { Trash2Icon } from "lucide-react";

export interface CardListProps {
  id: string;
  content: string;
  completed: boolean;
  deleteCard: (id: string) => void
  toggleCompletion: (id: string) => void
}

export function CardList({ id, content, completed, deleteCard, toggleCompletion }: CardListProps) {
  return (
    <div className="flex items-center justify-between rounded-lg text-left p-4 bg-[#262626]">
      <input 
        type="checkbox" 
        checked={completed} 
        onChange={() => toggleCompletion(id)}
        className="appearance-none w-6 h-6 border-2 border-[#4EA8DE] rounded-full bg-transparent checked:bg-[#5E60CE] checked:border-transparent focus:outline-none cursor-pointer checked:before:content-['✓'] checked:before:text-white checked:before:text-sm checked:before:block checked:before:leading-none checked:before:text-center checked:before:w-full checked:before:h-full"
      />

      <p className={`${completed ? 'text-[#808080] line-through' : 'text-[#F2F2F2]'} text-sm`}>{content}</p>

      <button onClick={() => deleteCard(id)}>
        <Trash2Icon className="size-5 text-[#808080]" />
      </button>
    </div>
  )
}