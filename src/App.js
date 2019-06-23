import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import uuid from 'uuid'
import Header from './components/layout/Header'
import LandingPage from './components/pages/LandingPage'
import Main from './components/Main'

const App = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('http://localhost:4000/todos')
        setTodos(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const countIsCompleted = todos.filter(todo => {
      return todo.isCompleted === true
    }).length
    document.title =
      countIsCompleted + ' out of ' + todos.length + " todo's completed"
  })

  // CREATE operation
  const addTodo = text => {
    const newTodo = {
      id: uuid.v4(),
      text,
      isCompleted: false
    }
    axios
      .post('http://localhost:4000/todos', newTodo)
      .then(res => setTodos([...todos, res.data]))
  }

  // UPDATE operation
  const completeTodo = (index, id) => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    axios
      .put(`http://localhost:4000/todos/${id}`, newTodos[index])
      .then(res => setTodos(newTodos))
  }

  // DELETE operation
  const removeTodo = id => {
    axios.delete(`http://localhost:4000/todos/${id}`).then(res =>
      setTodos([
        ...todos.filter(todo => {
          return todo.id !== id
        })
      ])
    )
  }

  return (
    <div className="App">
      <Header />
      {/* <LandingPage
        addTodo={addTodo}
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      /> */}
      <Main />
    </div>
  )
}

export default App
