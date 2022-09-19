import { useContext } from 'react'
import { hideNotesFlagContext } from '../context/hideNotesFlagContext'
import EditScreen from './EditScreen'
import './opennote.css'

const OpenNote = ({index, executeLocalSetItem, delNote, count, setCountNotes, uuidv4, openNote, setOpenNote}) => {
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext)

  const handleEdit = () => {
    dispatch({id:index,flag:true})
  }

  const handleErase = () => {
    delNote(count.id)
    dispatch({id:undefined, flag:false})
    setOpenNote(false)
  }

  const handleBack = () => {
    dispatch({id:undefined, flag:false})
    setOpenNote(false)
  }

  const showNote = () => {
    if(openNote && hideNotes.id === index && !hideNotes.flag){
      return(
        <>
          <div className="row px-2 imgopen">
            <div className="col-4 text-start">
              <button className="btnopennote mx-1 text-center px-3 pb-1 fs-3 fw-bold m-2 border-0 text-white" onClick={handleBack}><img className="w-75" src="https://cdn-icons-png.flaticon.com/512/271/271220.png" alt=""/></button>
            </div>
            <div className="col-4 text-center">
              <button className="red btnopennoteerase mx-1 text-center px-3 pb-2 fs-3 fw-bold m-2 border-0 text-white" onClick={handleErase}><img className="w-100" src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png" alt=""/></button>
            </div>
            <div className="col-4 text-end">
              <button className="btnopennote mx-1 text-center px-3 fs-3 pb-1 fw-bold m-2 border-0 text-white" onClick={handleEdit}><img className="w-75" src="https://cdn-icons-png.flaticon.com/512/2623/2623081.png" alt=""/></button>
            </div>
          </div>
          <div className="text-start py-3 w-100 px-0 opennoteedit">
            <p className="h1 text-white m-3 overflow-hidden ">{count.name}</p>
            <p className="fs-5 text-secondary m-3 overflow-hidden ">{count.date}</p>
            <textarea className="fs-5 text-white bg-dark border-0 mx-0 px-3" readOnly={true} value={count.text} />
          </div>
        </>
      )
    }
  }

  const showEditText = () => {
    if( hideNotes.flag && openNote && hideNotes.id===index ){
      return <EditScreen executeLocalSetItem={executeLocalSetItem} delNote={delNote} uuidv4={uuidv4} count={count}  setData={setCountNotes}/>
    }
  }

  return(
    <>
      {showEditText()}
      {showNote()}
    </>
  )
}

export default OpenNote
