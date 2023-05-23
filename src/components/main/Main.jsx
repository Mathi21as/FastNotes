import React, {useContext} from 'react'
import {v4 as uuidv4} from 'uuid'
import LayoutNote from '../layoutNote/LayoutNote'
import './main.css'
import SelectTypeNote from '../selectTypeNote/SelectTypeNote';
import {showSelectTypeNoteContext} from '../../context/showSelectTypeNoteContext'
import { withTranslation } from 'react-i18next';

const Main = ({executeLocalSetItem, countNotes, setCountNote, theme, t}) => {
  const { selectTypeNote, dispatchTypeNote } = useContext(showSelectTypeNoteContext);

  const delNote = (idDel) => {
    setCountNote((actual) => {
      const newArray = actual.arrayNotes.filter((el)=>el.id!==idDel);
      return {theme_app: actual.theme_app, arrayNotes: newArray};
    })
  }
	
  const renderMain = () => {
    if(countNotes.arrayNotes[0]===undefined && !selectTypeNote.flag){
      return (
        <div className="w-100 text-center px-5">
          <h1 className={`text-${theme==="white" ? "dark" : "white"} fs-3 h1main`}>
						{t("No notes to show. Add one by pressing \"+\"")}
          </h1>
        </div>
      );
    }
    else if(selectTypeNote.flag){
      return <SelectTypeNote setCountNote={setCountNote} theme={theme}/>;
    }
    else{
      return(
        <div className="w-100 text-center p-2 mx-0 row">
          {
            countNotes.arrayNotes.map((count, index) => {
              return <LayoutNote 
                        key={uuidv4()} 
                        index={index} 
                        executeLocalSetItem={executeLocalSetItem} 
                        delNote={delNote} 
                        count={count} 
                        setCountNotes={setCountNote} 
                        theme={theme}
												/>
            })
          }
        </div>
      )
    }
  }

  return(
    <>
    {renderMain()}
    </>
  )
}

export default withTranslation()(Main);