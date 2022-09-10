import React, { useState, useRef } from "react";

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string,
  done: boolean
}

function App(): JSX.Element {

  const [newTask, setnewTask] = useState<string>('')
  const [task, setTask] = useState<ITask[]>([])
  const cursorRef = useRef<HTMLInputElement>(null)


  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask)
    console.log(task)
    setnewTask('')
    cursorRef.current?.focus()
  }

  const addTask = (name: string): void => {
    const bornTasks: ITask[] = [...task, { name, done: false }]
    setTask(bornTasks)
  }

  const handleClick = (index: number): void => {
    const bornTasks: ITask[] = [...task,]; //copia del arrelgo
    bornTasks[index].done = !bornTasks[index].done
    setTask(bornTasks)
  }

  const handleDelete = (index: number): void => {
    const bornTasks: ITask[] = [...task,]; //copia del arrelgo
    bornTasks.splice(index,1)
    setTask(bornTasks)
    // console.log(index)
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setnewTask(e.target.value)}
                  value={newTask}
                  ref={cursorRef}
                  autoFocus
                  />
                <div className="d-grid gap-2">
                  <button className="btn btn-lg btn-success mt-2" type="button" >Save</button>
                </div>
              </form>
            </div>
          </div>

          {
            task.map((e: ITask, index: number) => {
              return (
                <div className="card card-body mt-2" key={index}>
                  <h2 style={{ textDecoration: e.done === true ? 'line-through' : '' }}>{e.name}</h2>
                  <div>
                    <button className="btn btn-secondary" onClick={() => handleClick(index)}>
                      {e.done === true ? '✅' : '❌'}
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                       🗑
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
