import { useState } from "react"
import { Header } from "./components/header"
import { CardList } from "./components/card-list"

import { v4 } from "uuid"
import { CirclePlusIcon } from "lucide-react"

interface ListProps {
  id: string
  completed: boolean
  content: string
}

export function App() {
  const [list, setList] = useState<ListProps[]>([])
  const [inputValue, setInputValue] = useState('')

  const completedTasks = list.filter(task => task.completed)

  function handleCreateNewTask(content: string) {
    const id = v4()
    const completed = false
    const newTask = {
      id,
      content,
      completed,
    }
    setList([...list, newTask])
  }

  function handleDeleteTask(id: string) {
    const deleteTask = list.filter(task => task.id !== id)

    setList(deleteTask)
  }

  function handleToggleTaskCompletion(id: string) {
    const updatedList = list.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setList(updatedList);
  }

  return (
    <section className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow w-full flex flex-col items-center justify-start bg-[#191919]">
        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleCreateNewTask(inputValue)
            setInputValue('')
          }} 
          className="w-full max-w-3xl flex items-center justify-center relative -top-7 gap-2"
        >
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => {setInputValue(e.target.value)}}
            placeholder="Adicione uma nova tarefa..." 
            className="bg-[#262626] placeholder:text-[#454545] text-white flex-1 h-14 pl-2 rounded-lg" 
          />

          <button type="submit" className="bg-[#1E6F9F] p-4 flex items-center gap-2 text-white font-bold text-sm rounded-lg">
            Criar
            <CirclePlusIcon />
          </button>
        </form>

        <div className="w-full max-w-3xl mt-[calc(65px-28px)]">
          <header className="w-full flex items-center justify-between">
            <p className="text-sm font-bold text-[#4EA8DE] flex items-center gap-2">
              Tarefas criadas 
              <span className=" text-sm font-bold text-[#D9D9D9] py-[2px] px-2 bg-[#333333] rounded-full">
                {list.length}
              </span>
            </p>

            <p className="text-sm font-bold text-[#8284FA] flex items-center gap-2">
              Concluídas
              <span className=" text-sm font-bold text-[#D9D9D9] py-[2px] px-2 bg-[#333333] rounded-full">
                {`${completedTasks.length} de ${list.length}`}
              </span>
            </p>
          </header>

          <div className="mt-6 space-y-3">
            {list.map(task => (
              <CardList 
                key={task.id}
                id={task.id}
                content={task.content} 
                completed={task.completed}
                deleteCard={handleDeleteTask} 
                toggleCompletion={handleToggleTaskCompletion}
              />
            ))}
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default App
