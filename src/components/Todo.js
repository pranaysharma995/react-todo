import React, { useEffect, useState } from 'react'

function Todo (props) {
  const [list, setList] = useState([])
  const [inputTask, setInputTask] = useState('')
  const [pendingTask, setPendingTask] = useState(list.length)
  const handleInputChange = event => {
    setInputTask(event.target.value)
  }
  const handleAddTodo = todo => {
    if (todo) {
      const newTask = {
        id: Math.random(),
        todo: todo,
        completed: false
      }

      setList([...list, newTask])
      setInputTask('')
    }
  }
  const handleCompleteTodo = id => {
    const newList = list.filter(todo => {
      if (todo.id === id) {
        todo.completed = true
      }

      return true
    })
    setList(newList)
  }
  const handleDeleteTodo = id => {
    const newList = list.filter(todo => todo.id !== id)

    setList(newList)
  }

  useEffect(
    function () {
      const newList = list.filter(todo => todo.completed !== true)
      setPendingTask(newList.length)
    },
    [list]
  )
  return (
    <>
      <h1>Todo List</h1>
      <div className='Top'>
        <input
          className='input'
          type='text'
          value={inputTask}
          onChange={handleInputChange}
          placeholder='Enter a task'
          onKeyDown={event => {
            event.which === 13 && handleAddTodo(inputTask)
          }}
        />
        <button className='btn' onClick={() => handleAddTodo(inputTask)}>
          Add
        </button>
      </div>
      <div className='Bottom'>
        <h1>Pending Task({pendingTask})</h1>

        <ul>
          {list.map(todo => (
            <li className='task' data-status={todo.completed} key={todo.id}>
              {todo.todo}
              <span>
                {!todo.completed && (
                  <button
                    onClick={() => {
                      handleCompleteTodo(todo.id)
                    }}
                  >
                    Complete
                  </button>
                )}
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Todo
