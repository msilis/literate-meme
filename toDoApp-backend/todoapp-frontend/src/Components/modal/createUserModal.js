import { useRef } from 'react';
import style from './createUserModal.module.css';


export default function CreateUserModal(){
    const newUsername = useRef();
    const newPassword = useRef();

    //function to create user and send info to database

    function handleCreateUser(){
        const createUserData = {
            username: newUsername.current?.value,
            password: newPassword.current?.value
        }
        console.log(newUsername.current?.value);
        try{
            fetch("/todo/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(createUserData)
            }).then((result) => result.json).then(info => console.log(info))
        }catch (err){
            console.log(err)
        }
    }

    return(
        <div className={style.loginModalContainer}>
            <input className={style.loginInput} placeholder='Username' ref={newUsername} />
            <input className={style.loginInput} placeholder='Password' ref={newPassword}/>
            <button onClick={handleCreateUser}>Create User</button>
        </div>
    )
}