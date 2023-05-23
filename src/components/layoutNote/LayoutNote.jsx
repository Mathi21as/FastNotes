import React, { useState, useContext } from 'react'
import {v4 as uuidv4} from 'uuid'
import {hideNotesFlagContext} from '../../context/hideNotesFlagContext'
import OpenNote from '../openNote/OpenNote'
import './layoutnote.css'
import { withTranslation } from 'react-i18next'
import listImg from "../../resourses/icons/type-list.png"
import noteImg from "../../resourses/icons/type-note.png"


const LayoutNote = ( {
											index,
											executeLocalSetItem,
											delNote,
											count,
											setCountNotes,
											theme,
											t
										} ) => {
  const { hideNotes, dispatch } = useContext( hideNotesFlagContext )
  const [ openNote, setOpenNote ] = useState( hideNotes.flag && hideNotes.id === 0 ?
                                                                        true
                                                                        :
                                                                        hideNotes.id===index ?
																																				true
																																				:
																																				false
                                                                        )

  const open_Note = () => {
    if( openNote )
      return <OpenNote 
                index={index}
                executeLocalSetItem={executeLocalSetItem}
                delNote={delNote}
                note={count}
                setCountNotes={setCountNotes}
                uuidv4={uuidv4}
                openNote={openNote}
                setOpenNote={setOpenNote}
                theme={theme}
              />
  }

  const handleOpenNote = () => {
    dispatch( {id:index, flag:false} )
    setOpenNote(true)
  }

  const showData = () => {
    if(count.name !== "" && !hideNotes.flag && !openNote && hideNotes.id === undefined){
      return(
        <div
					className={`text-start pt-1 pb-3 px-3 rounded-3 ${count.color}`}
					onClick={handleOpenNote}
					>
          <p className="text-white h2 mt-3 textwrap">{t(count.name)}</p>
          <div className='d-flex flexDirection-row dateDiv'>
            <p className="text-secondaryy my-1 me-2 overflow-hidden">
							{
								count.date.length === 12 ?
									(t(count.date.substr([0], [3])) + count.date.substr([3]))
									: count.date.length === 33 ?
									(
										t(count.date.slice(0,21)) +
										t(count.date.slice(21, 24)) + " " +
										t(count.date.substr(25))
									)
									: count.date.length === 31 &&
									(
										t(count.date.slice(0,19)) +
										t(count.date.slice(19, 22)) + " " +
										t(count.date.substr(23))
									)
							}
						</p>
            {count.type === "list" ? 
                        <img
													src={listImg}
													alt=""
													/>
                         :
                        <img
													src={noteImg}
													alt=""
													/>
            }
          </div>
        </div>
      )
    }
  }

  return(
    <div
			className={
				hideNotes.id === undefined ? "col-6 col-lg-4 col-xl-3 p-2"
          :
          hideNotes.id===index ? "col-12 pt-3" : ""
				}
    >
      {open_Note()}
      {showData()}
    </div>
  )
}

export default withTranslation()(LayoutNote)
