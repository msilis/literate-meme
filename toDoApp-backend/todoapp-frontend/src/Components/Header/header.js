import style from './header.module.css';
import toDoPic from '../../Media/To-Do.png'

export default function Header(){
    return(
        <div className={style.headerContainer}>
            <img src={toDoPic} alt='To-Do header' className={style.headerPic}/>
        </div>
    )
}