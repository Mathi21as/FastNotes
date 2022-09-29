import { useState, useContext } from 'react'
import {v4 as uuidv4} from 'uuid'
import {hideNotesFlagContext} from '../context/hideNotesFlagContext'
import OpenNote from './OpenNote'
import './layoutnote.css'

const LayoutNote = ({index, executeLocalSetItem, delNote, count, setCountNotes, hideNotesFlag, theme}) => {
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext)
  const [openNote, setOpenNote] = useState(hideNotes.flag && hideNotes.id===0 ? true : hideNotes.id===index ? true : false)

  const open_Note = () => {
    if( openNote )
      return <OpenNote index={index} executeLocalSetItem={executeLocalSetItem} delNote={delNote} count={count} setCountNotes={setCountNotes} uuidv4={uuidv4} openNote={openNote} setOpenNote={setOpenNote} theme={theme}/>
  }

  const handleOpenNote = () => {
    dispatch({id:index, flag:false})
    setOpenNote(true)
  }

  const showData = () => {
    if(count.name !== "" && !hideNotes.flag && !openNote && hideNotes.id===undefined){
      return(
        <div className={`text-start m-3 pt-1 pb-3 rounded-3 ${count.color}`} onClick={handleOpenNote}>
          <p className="text-dark h2 m-3 overflow-hidden ">{count.name}</p>
          <p className="text-secondary m-3 overflow-hidden ">{count.date}</p>
        </div>
      )
    }
  }

  return(
    <div className={hideNotes.id===undefined ? "col-6 col-lg-4 col-xl-3" : hideNotes.id===index ? "col-12 pt-3" : ""}>
      {open_Note()}
      {showData()}
    </div>
  )
}

export default LayoutNote
