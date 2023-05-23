import React, { useContext, useState } from 'react'
import { hideNotesFlagContext } from '../../context/hideNotesFlagContext'
import EditScreen from '../editScreen/EditScreen'
import ConfirmDelete from '../confirmDelete/ConfirmDelete'
import './opennote.css'
import NoteTypeList from './noteTypeList/NoteTypeList'
import NoteTypeText from './noteTypeText/NoteTypeText'


const OpenNote = ({
                    index,
										executeLocalSetItem,
										delNote,
										note,
										setCountNotes, 
                    uuidv4,
										openNote,
										theme
                  }) => {
  const { hideNotes, dispatch } = useContext( hideNotesFlagContext )
  const [ confirmDel, setConfirmDel ] = useState( false );
	const [ flagReRender, setFlagReRender ] = useState( true );

  const handleEdit = () => {
    dispatch( {id:index,flag:true} )
  }

  const handleErase = () => {
    delNote(note.id)
    dispatch({id:undefined, flag:false})
  }

  const handleBack = () => {
    dispatch({id:undefined, flag:false})
  }

	//cambia el estado de cada item de una lista, si es "check" o "cross"
	

  const renderOpenNote = () => {
    if(openNote && hideNotes.id === index && !hideNotes.flag){
      
      /*
        la condicion note.type === undefined es para compatibilidad con la
        anterior version donde no habia tipo de nota
      */
        
      if(note.type === "text" || note.type === undefined){
        return(
					<NoteTypeText
						theme={theme}
						handleBack={handleBack}
						setConfirmDel={setConfirmDel}
						handleEdit={handleEdit}
						note={note}
						/>
				)
      }
      else if( note.type === "list"){
        return(
					<NoteTypeList 
						theme={theme}
						handleBack={handleBack}
						setConfirmDel={setConfirmDel}
						handleEdit={handleEdit}
						note={note}
						setCountNotes={setCountNotes}
						index={index}
						setFlagReRender={setFlagReRender}
					/>
				)
      }
    }
  }

  return(
    <div className='anim'>
      <EditScreen
        index={index}
        executeLocalSetItem={executeLocalSetItem}
        delNote={delNote}
        uuidv4={uuidv4}
        count={note}
        setData={setCountNotes}
        theme={theme}
				openNote={openNote}
        />
			<ConfirmDelete
				confirmDel={confirmDel}
				setConfirmDel={setConfirmDel}
				handleErase={handleErase}
				theme={theme}
				note={note}
				/>
      {renderOpenNote()}
    </div>
  )
}

export default OpenNote