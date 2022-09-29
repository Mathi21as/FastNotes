import { useState } from 'react'
import {useContext} from 'react'
import {hideNotesFlagContext} from '../context/hideNotesFlagContext'
import "./header.css"

const Header = ({setCountNotes, countNotes}) => {
  const [dateToday] = useState(new Date());
  const days = ["Junary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext);

  const newFileFunc = () => {
    dispatch({id:0,flag:true});
    setCountNotes( (actual) => {
      if(actual.arrayNotes[0] === undefined)
        actual.arrayNotes.unshift({id:"", name:"", text:"", date:`${days[dateToday.getMonth()]} ${dateToday.getDate()}, ${dateToday.getFullYear()}`, color:""})
      if(actual.arrayNotes[0].name !== "")
        actual.arrayNotes.unshift({id:"", name:"", text:"", date:`${days[dateToday.getMonth()]} ${dateToday.getDate()}, ${dateToday.getFullYear()}`, color:""})
      return actual
    } );
  }

  const handleChangeTheme = () => {
    setCountNotes((actual) => actual.theme_app==="white" ? {theme_app:"dark", arrayNotes: actual.arrayNotes} : {theme_app:"white", arrayNotes: actual.arrayNotes});
  }

  const rendHeader = () => {
    if(!hideNotes.flag && hideNotes.id===undefined){
      return(
        <div className={`m-0 bg-${countNotes.theme_app} w-100`}>
          <nav className="p-2 pt-4 navbar-nav">
            <div className="m-0 justify-content-between row">
              <div className="p-0 col-10"> <h1 className={`text-${countNotes.theme_app==="white" ? "dark" : "white"} pt-2 pb-2 px-4 m-0`}>Fast Notes</h1> </div>
              <div className="col-2 text-end" onClick={()=>handleChangeTheme()}><button className={`btnTheme ${countNotes.theme_app==="white" ? "btnwhite" : "btndark"}`}><img className={`w-50 ${countNotes.theme_app==="dark" && "invert"}`} src="https://cdn-icons-png.flaticon.com/512/6502/6502400.png" alt="Theme image" /></button></div>
            </div>
            <button className={`btnadd ${countNotes.theme_app==="white" ? "btnwhite" : "btndark"}`} onClick={()=>newFileFunc()}><img className={`w-100 p-3 ${countNotes.theme_app==="dark" && "invert"}`} src="https://cdn-icons-png.flaticon.com/512/1828/1828921.png" alt=""/></button>
          </nav>
        </div>
      )
    }
  }

  return(
    <>
      {rendHeader()}
    </>
  )
}

export default Header
