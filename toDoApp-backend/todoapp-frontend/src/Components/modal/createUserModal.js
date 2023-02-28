import { useRef } from "react";
import "./createUserModal.css";

export default function CreateUserModal(props) {
  const newUsername = useRef();
  const newPassword = useRef();

  //Grab state to decide whether to show modal or not
  const showCreateModal = props.showCreateModal;
  const setShowCreateModal = props.setShowCreateModal;

  //Conditionally render modal
  const registerModal = showCreateModal
    ? "modal createModalVisible"
    : "modal createModalHidden";

  //function to create user and send info to database

  function handleCreateUser() {
    const createUserData = {
      username: newUsername.current?.value,
      password: newPassword.current?.value,
    };
    try {
      fetch("/todo/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(createUserData),
      })
        .then((result) => result.json)
        .then((info) => console.log(info));
      newUsername.current.value = "";
      newPassword.current.value = "";
      setShowCreateModal(false);
    } catch (err) {
      console.log(err);
    }
  }

  //function to cancel creation of user

  function handleCreateCancel() {
    setShowCreateModal(false);
  }

  return (
    <div className={registerModal}>
      <div className="registerModalContainer">
        <h4>Register</h4>
        <input
          className="loginInput"
          placeholder="Username"
          ref={newUsername}
        />
        <input
          className="loginInput"
          placeholder="Password"
          ref={newPassword}
          type="password"
        />
        <button onClick={handleCreateUser} className="createButton">
          Create User
        </button>
        <button onClick={handleCreateCancel} className="cancelButton">
          Cancel
        </button>
      </div>
    </div>
  );
}
