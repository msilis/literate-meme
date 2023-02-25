import CreateUserModal from '../modal/createUserModal';
import style from './loginbar.module.css';

export default function LoginBar(){

    const headingText = 'Welcome';

    // TODO - Make modal show when button is clicked
    

    return (
        <div className={style.navBarContainer}>
        <h4 className={style.loginButton}>{headingText}</h4>
        <button className={style.loginButton}>Login</button>
        <CreateUserModal />
    </div>
    )
    
}