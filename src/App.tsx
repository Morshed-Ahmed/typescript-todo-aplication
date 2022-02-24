import React, { useCallback, useReducer, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { Card, CardActions, CardContent, CardMedia, Input, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';



interface Todo {
  id: number,
  text: string
}

type ActionType =
  { type: "ADD"; comment: string }
  | { type: "REMOVE"; id: number }

function App() {

  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.comment
          }
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id)
    }
  }

  const [comments, dispatch] = useReducer(reducer, [])

  const newTodoRef = useRef<HTMLInputElement>(null)

  const onAddTodo = useCallback(() => {

    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        comment: newTodoRef.current.value
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
        <Card sx={{ maxWidth: 345, margin: 'auto  ' }}>
          <CardMedia
            component="img"
            alt="green iguana"
            /*  height="140" */
            image="https://img.freepik.com/free-photo/young-attractive-handsome-guy-feels-delighted-gladden-amazed_295783-535.jpg?w=740"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              MORSHED
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species,
            </Typography>
          </CardContent>
          <CardActions >
            <div style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}>
              <input style={{ padding: 5, fontSize: 17 }} type="text" placeholder='please comment' ref={newTodoRef} />
              <SendIcon sx={{ fontSize: 35, color: 'aqua' }} onClick={onAddTodo} />
            </div>

          </CardActions>
          {
            comments.map((todo) => (
              <div key={todo.id}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="h5">{todo.text}</Typography>
                  <DeleteIcon onClick={() => dispatch({ type: "REMOVE", id: todo.id })} />
                </div>
              </div>
            ))
          }
        </Card>
      </div>

    </div>
  );
}

export default App;