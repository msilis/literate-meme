import style from './addToDo.module.css';

export default function AddToDo(){
    return(
        <div className={style.addToDoContainer}>
            <input placeholder="What do you need to do?" className={style.toDoInput}/>
            <button className={style.addButton}>Add</button>
        </div>
    )
}