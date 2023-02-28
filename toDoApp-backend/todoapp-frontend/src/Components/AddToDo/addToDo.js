import style from "./addToDo.module.css";

export default function AddToDo({
  userId,
  getToDo,
  edit,
  setEdit,
  editId,
  editText,
  toDoInput,
}) {
  //Get user input

  function handleAddToDo() {
    //Organise data to send to database
    const toDoData = {
      userId: userId,
      toDoText: toDoInput.current?.value,
    };
    try {
      fetch("/todo/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(toDoData),
      }).then(() => {
        getToDo();
      });
      toDoInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  }
  //Edit todo functionality

  function handleEdit() {
   //Data to send to database
    const editData = {
      id: editId,
      toDoBody: toDoInput.current?.value,
    };
    //call endpoint with edit ID
    try {
      fetch(`/todo/edit/${editId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(editData),
      }).then(() => {
        getToDo();
      });
    } catch (err) {
      console.log(err);
    }
    setEdit(false);
    toDoInput.current.value = "";
  }

  //Cancel button click
  function handleCancel() {
    setEdit(false);
    toDoInput.current.value = "";
  }
  //conditionally render button text and set onClick function
  const buttonText = edit ? "Save" : "Add";
  const clickFunction = edit ? handleEdit : handleAddToDo;

  return (
    <div className={style.addToDoContainer}>
      <input
        placeholder="What do you need to do?"
        className={style.toDoInput}
        ref={toDoInput}
      />
      {edit ? (
        <div>
          <button className={style.addButton} onClick={clickFunction}>
            {buttonText}
          </button>
          <button className={style.addButton} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <button className={style.addButton} onClick={clickFunction}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
