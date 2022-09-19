import { useState } from 'react'
import {useContext} from 'react'
import {hideNotesFlagContext} from '../context/hideNotesFlagContext'
import "./header.css"

const Header = ({setCountNotes}) => {
  const [dateToday] = useState(new Date());
  const days = ["Junary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext);

  const newFileFunc = () => {
    dispatch({id:0,flag:true});
    setCountNotes( actual => {
      if(actual[0] === undefined)
        actual.unshift({id:"", name:"", text:"", date:`${days[dateToday.getMonth()]} ${dateToday.getDate()}, ${dateToday.getFullYear()}`, color:""})
      if(actual[0].name !== "")
        actual.unshift({id:"", name:"", text:"", date:`${days[dateToday.getMonth()]} ${dateToday.getDate()}, ${dateToday.getFullYear()}`, color:""})
      return actual
    } );
  }

  const rendHeader = () => {
    if(!hideNotes.flag && hideNotes.id===undefined){
      return(
        <div className="m-0 bg-dark w-100">
          <nav className="p-2 pt-4 navbar-nav">
            <div className="m-0">
              <div className="p-0"> <h1 className="text-white pt-2 pb-2 px-4 m-0">Fast Notes</h1> </div>
            </div>
            <button className="btnadd bg-dark" onClick={()=>newFileFunc()}><img className="w-100 p-3" src="https://cdn-icons-png.flaticon.com/512/1828/1828921.png" alt=""/></button>
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
