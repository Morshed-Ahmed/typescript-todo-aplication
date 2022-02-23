import React, { useCallback, useReducer, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Lists from './components/Lists';


interface Todo {
  id: number,
  text: string
}

type ActionType =
  { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number }

function App() {

  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text
          }
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id)
    }
  }

  const [todos, dispatch] = useReducer(reducer, [])

  const newTodoRef = useRef<HTMLInputElement>(null)

  const onAddTodo = useCallback(() => {

    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value
      })
      newTodoRef.current.value = " ";
    }

  }, [])



  return (
    <div className="App">
      <div className='todo-comment'>
        <div className='div'>
          <h2 className='tit'>Please Comment</h2>
        </div>

        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add</button>
        {
          todos.map((todo) => (
            <div key={todo.id}> {todo.text} <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>Remove</button> </div>
          ))
        }
      </div>

    </div>
  );
}

export default App;
