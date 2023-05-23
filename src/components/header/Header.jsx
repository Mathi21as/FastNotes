import React, { useState, useContext} from 'react'
import {hideNotesFlagContext} from '../../context/hideNotesFlagContext'
import {showSelectTypeNoteContext} from '../../context/showSelectTypeNoteContext'
import "./header.css"
import {menuLogic} from "./menuLogic"
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import addImg from "../../resourses/icons/add-note.png"
import menuImg from "../../resourses/icons/menu.png"

const Header = ({setCountNote, countNotes, setShowAboutUs, t}) => {
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext);
  const { selectTypeNote, dispatchTypeNote } = useContext(showSelectTypeNoteContext);

  const handleChangeTheme = () => {
    setCountNote(
			(actual) => actual.theme_app==="white" ? 
				{theme_app:"dark", lang_app: actual.lang_app, arrayNotes: actual.arrayNotes}
				:
				{theme_app:"white", lang_app: actual.lang_app, arrayNotes: actual.arrayNotes});
  }

	const handleChangeLanguage = () => {
		setCountNote(
			(actual) => {
				console.log(i18next.language);
				if(i18next.language === "es-ES"){
					actual = {theme_app: actual.theme_app, lang_app: "en-IN", arrayNotes: actual.arrayNotes};
					return actual;
				}
				else{
					actual = {theme_app: actual.theme_app, lang_app: "es-ES", arrayNotes: actual.arrayNotes};
					return actual;
				}
			}
		);
	}

  const handleAddButton = () => {
    dispatch({id:0,flag:true})
    dispatchTypeNote({flag:true})
  }

  const HamburgerMenu = () => {
    return(
      <>
        <button 
					className={`
						${countNotes.theme_app==="white" ? "themewhite" : "themedark"}
						menu_btn border border-0 mb-2 mt-1
						`}
					onClick={()=>menuLogic()}
					>
          <img
						className={`${countNotes.theme_app==="dark" && "invert"}`}
						src={menuImg}
						alt="menu icon"
						/>
        </button>
        <div className="ul-container">
          <ul className="">
            <li className="">
	            <button
								className={`border-0 btn`}
								onClick={()=>handleChangeTheme()}
								>
									{t("Change theme")}
							</button>
            </li>
            <hr/>
						<li>
							<button
								className='border-0 btn'
								onClick={() => handleChangeLanguage()}
								>
									{t("Change language")}
							</button>
						</li>
						<hr/>
            <li className="">
            	<button
								className={`border-0 btn`}
								onClick={()=>{setShowAboutUs(true)}}
								>
									{t("Web App info")}
							</button>
            </li>
          </ul>
        </div>
      </>
    )
  }

  const rendHeader = () => {
    if(!hideNotes.flag && hideNotes.id===undefined){
      return(
        <div 
					className={`
						m-0 bg-${countNotes.theme_app} w-100 container-fluid zIndex-alto
						`}
					>
          <nav className="p-2 pt-4 navbar-nav">
            <div className="m-0 d-flex">
              <div className="p-0 flex-fill">
								<h1
									className={`
										text-${countNotes.theme_app==="white" ? "dark" : "white"}
										pt-2 pb-2 px-0 m-0
										`}
										>
											Fast Notes
								</h1>
							</div>
              {HamburgerMenu()}
            </div>
            <button
							className={`
								btnadd ${countNotes.theme_app==="white" ?
									"themewhite"
									:
									"themedark"
								}`}
							onClick={handleAddButton}
							>
								<img
									className={`
										w-100 p-3 ${countNotes.theme_app==="dark" && "invert"}
										`}
									src={addImg}
									alt=""
									/>
							</button>
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

export default withTranslation()(Header);