import CreateUserModal from "../modal/createUserModal";
import LoginModal from "../modal/loginModal";
import style from "./loginbar.module.css";

export default function LoginBar(props) {
  const userAlias = props.userAlias;
  const headingText = props.userLoggedIn ? `Welcome ${userAlias}` : "Please log in";

  //Conditionally render button text
  const loginButtonText = props.userLoggedIn ? "Log Out" : "Login";

  //Conditional button functionality
  const clickEvent = props.userLoggedIn ? handleLogoutClick : handleLoginClick;

  //Toggle state for register modal
  function handleRegisterClick() {
    props.setShowCreateModal(true);
  }

  //Toggle state of login modal
  function handleLoginClick() {
    props.setShowLoginModal(true);
  }

  function handleLogoutClick() {
    props.setUserLoggedIn(false);
    props.setUserId("");
  }

  return (
    <div className={style.navBarContainer}>
      <h4 className={style.loginHeading}>{headingText}</h4>
      <button className={style.loginButton} onClick={clickEvent}>
        {loginButtonText}
      </button>
      <button className={style.loginButton} onClick={handleRegisterClick}>
        Register
      </button>
      <CreateUserModal
        showCreateModal={props.showCreateModal}
        setShowCreateModal={props.setShowCreateModal}
      />
      <LoginModal
        showLoginModal={props.showLoginModal}
        setShowLoginModal={props.setShowLoginModal}
        userLoggedIn={props.userLoggedIn}
        setUserLoggedIn={props.setUserLoggedIn}
        setUserId={props.setUserId}
        getToDo={props.getToDo}
        setUserAlias={props.setUserAlias}
        setUserToken={props.setUserToken}
      />
    </div>
  );
}
