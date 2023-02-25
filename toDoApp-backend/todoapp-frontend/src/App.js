import style from './app.module.css'
import AddToDo from './Components/AddToDo/addToDo';
import Header from './Components/Header/header';
import LoginBar from './Components/LoginBar/loginbar';
import ToDoContainer from './Components/ToDoContainer/toDoContainer';

function App() {
  return (
    <div className={style.app}>
      <LoginBar />
      <Header />
      <AddToDo />
      <ToDoContainer />
    </div>
  );
}

export default App;
