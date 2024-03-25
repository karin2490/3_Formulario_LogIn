import { useEffect, useState } from 'react';
import {TodoInput} from './components/TodoInput'
import {TodoList} from './components/TodoList';
import {LoginForm} from './components/LoginForm';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  const handleLogin = () => {
    setIsLoggedIn(true);    
  };

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Terminar la actividad 2 modulo 4',
      completed: false,
    },
    {
      id: 2,
      title: 'Acomodar la casa',
     completed: false,
    },
    {
      id: 3,
      title: 'Lavar la ropa',
      completed: false,
    },
    {
      id: 4,
      title: 'Estudiar para el examen',
      completed: false,
    }
  ])

  const [activeFilter, setActiveFilter] = useState('all');

  const [filteredTodos, setFilteredTodos] = useState(todos);


 const addTodo = (title) => {
  const lastId = todos.length > 0 ? todos[todos.length - 1].id : 1;
  
  const newTodo = {
    id: lastId + 1, 
    title,completed: false
  }

  const todoList = [...todos]
  todoList.push(newTodo);

  setTodos(todoList);
}

const handleSetComplete=(id)=>{
  const updatedList=todos.map(todo=>{
    if(todo.id===id){
      return {...todo, completed:!todo.completed}
    }
    return todo;
  })
  setTodos(updatedList);
}

const handleDelete=(id)=>{
  const updatedList=todos.filter(todo=>todo.id!==id);
  setTodos(updatedList);
}

const handleClearComplete = () => {
  const updatedList = todos.filter(todo => !todo.completed);
  setTodos(updatedList);
};

/////
const showAllTodos = () => {
  setActiveFilter('all')
}

const showActiveTodos = () => {
  setActiveFilter('active')
}

const showCompletedTodos = () => {
  setActiveFilter('completed')
}

useEffect(() => {
  if (activeFilter === 'all') {
    setFilteredTodos(todos);
  } else if (activeFilter === 'active') {
      const activeTodos = todos.filter(todo => todo.completed === false);
      setFilteredTodos(activeTodos);
  } else if (activeFilter === 'completed') {
      const completedTodos = todos.filter(todo => todo.completed === true);
      setFilteredTodos(completedTodos);
  }
  
},[activeFilter, todos]);

/////
  
  return (
    <div className='bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-20 px-5'>
      <div className="container flex-col max-w-xl text-3xl">
       {isLoggedIn ? (
        <div className='bg-gray-900 min-h-screen h-full font-inter text-gray-100 flex items-center justify-center py-20 px-5'>
          <div className="container flex-col max-w-xl">
            <h1 className="text-5xl font-anton font-bold tracking-widest">Lista de ToDos</h1>
              <TodoInput addTodo={addTodo} />
                <TodoList 
                todos={filteredTodos}
                handleSetComplete={handleSetComplete}
                handleDelete={handleDelete}  
                handleClearComplete={handleClearComplete}
                activeFilter={activeFilter}  
                showAllTodos={showAllTodos}  
                showActiveTodos={showActiveTodos}
                showCompletedTodos={showCompletedTodos}
                  />
            </div>
          </div>

       ):(
        <LoginForm handleLogin={handleLogin} />
       )} 

      </div>
    </div>
  );
}

export default App;


