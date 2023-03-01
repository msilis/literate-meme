import style from "./toDoContainer.module.css";
import checkBlack from "../../Media/icons8-done-black.svg";
import checkGray from "../../Media/icons8-done-gray.svg";
import deleteX from "../../Media/icons8-close.svg";
import editPencil from "../../Media/icons8-edit-row-30.png";

//Close icon, check icons, edit icon by https://icons8.com

export default function ToDoContainer({
  userToDo,
  userLoggedIn,
  getToDo,
  edit,
  setEdit,
  editId,
  setEditId,
  editText,
  setEditText,
  toDoInput,
  userToken
}) {
  /* const checkValue = userToDo.completed ? checkBlack : checkGray; */
  //Delete an item
  function handleToDoDelete(event) {
    const itemToDelete = event.target.parentNode.parentNode.parentNode.id;
    try {
      fetch(`/todo/${itemToDelete}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${userToken}`
        },
      })
        .then((response) => console.log(response))
        .then(() => {
          getToDo();
        });
    } catch (err) {
      console.log(err);
    }
  }
  //Mark complete functionality
  function markComplete(event) {
    const itemToCheck = event.target.parentNode.parentNode.parentNode.id;
    console.log(itemToCheck);
    const toggleMark = {
      completed: true,
    };
    try {
      fetch(`/todo/${itemToCheck}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(toggleMark),
      }).then(() => {
        getToDo();
      });
    } catch (err) {
      console.log(err);
    }
  }

  //Edit button functionality
  function handleEditClick(event) {
    setEdit(true);
    const itemId = event.target.parentNode.parentNode.parentNode.id;
    const editText = event.target.parentNode.parentNode.innerText
    setEditId(itemId);
    setEditText(editText)
    console.log(itemId);
    console.log(editText)
    toDoInput.current.value = editText

  }

  const toDoDisplay = Object.values(userToDo).map((todo, index) => {
    return (
      <div key={index} className={style.toDoCard} id={todo._id}>
        <div className={style.toDoText}>
          <div className={style.toDoButtons}>
            <img
              src={todo.completed ? checkBlack : checkGray}
              alt="tick mark"
              className={style.checkButton}
              onClick={markComplete}
            />
            <img
              src={editPencil}
              alt="edit"
              className={style.editButton}
              onClick={handleEditClick}
            />
            <img
              src={deleteX}
              alt="delete x"
              className={style.deleteButton}
              onClick={handleToDoDelete}
            />
          </div>
          <h4 className={todo.completed ? style.completedItem : null}>{todo.toDoBody}</h4>
        </div>
      </div>
    );
  });

  return (
    <div className={style.toDoContainer}>
      {userLoggedIn ? toDoDisplay : <h3>Log in to see your to-do items</h3>}
    </div>
  );
}
