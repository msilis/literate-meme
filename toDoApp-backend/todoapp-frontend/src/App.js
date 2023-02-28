import { useEffect, useState, useRef } from "react";
import style from "./app.module.css";
import AddToDo from "./Components/AddToDo/addToDo";
import Header from "./Components/Header/header";
import LoginBar from "./Components/LoginBar/loginbar";
import ToDoContainer from "./Components/ToDoContainer/toDoContainer";

function App() {
  //State variables
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userToDo, setUserToDo] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editText, setEditText] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const [userToken, setUserToken] = useState("");

  //Ref for addToDo
  const toDoInput = useRef();

  //Function to get to do list from database
  async function getToDo() {
    const getToDoData = {
      userId: userId,
    };
    const response = await fetch("/todo/getToDo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${userToken}`
      },
      body: JSON.stringify(getToDoData),
    });
    const result = await response.json();
    console.log(result);

    setUserToDo(result);

    try {
    } catch (err) {
      console.log(err);
    }
  }
  console.log(userToDo);

  useEffect(() => {
    //Initial call to database to get array of to dos
    getToDo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className={style.app}>
      <LoginBar
        setShowCreateModal={setShowCreateModal}
        showCreateModal={showCreateModal}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        userLoggedIn={userLoggedIn}
        setUserLoggedIn={setUserLoggedIn}
        setUserId={setUserId}
        getToDo={getToDo}
        userAlias={userAlias}
        setUserAlias={setUserAlias}
        userToken={userToken}
        setUserToken={setUserToken}
      />
      <Header />
      <AddToDo
        userId={userId}
        getToDo={getToDo}
        edit={edit}
        setEdit={setEdit}
        editId={editId}
        setEditId={setEditId}
        userToDo={userToDo}
        editText={editText}
        setEditText={setEditText}
        toDoInput={toDoInput}
        userToken={userToken}
      />
      <ToDoContainer
        userToDo={userToDo}
        userLoggedIn={userLoggedIn}
        getToDo={getToDo}
        edit={edit}
        setEdit={setEdit}
        editId={editId}
        setEditId={setEditId}
        editText={editText}
        setEditText={setEditText}
        toDoInput={toDoInput}
      />
    </div>
  );
}

export default App;
