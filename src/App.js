import React, { useState, useReducer } from 'react';
import Header from './components/header/Header'
import Main from './components/main/Main'
import WebAppInfo from './components/webAppInfo/WebAppInfo'
import Footer from './components/footer/Footer'
//import exportNotes from './helpers/exportNotes.js'
import {useFlag} from "./hooks/CustomHooks"
import {hideNotesFlagContext} from './context/hideNotesFlagContext'
import {hideNotesFlagReducer} from './reducer/hideNotesFlagReducer'
import {showSelectTypeNoteContext} from './context/showSelectTypeNoteContext'
import {showSelectTypeNoteReducer} from './reducer/showSelectTypeNoteReducer'
import i18next from 'i18next';
import './App.css'


function App() {
	/*
		it is changed from the editscreen component, it is used as a dependency on
		the useEffect of the localstorage setitem. Only the state change is used
		for the useEffect to execute, the value itself doesn't matter.
	*/
  const executeLocalSetItem = useFlag( false )
	const notesInLocalStorage = JSON.parse(localStorage.getItem("notes"))
	const [countNotes, setCountNotes] = useState(notesInLocalStorage != null ? 
		notesInLocalStorage
		:
		{
			theme_app:"dark",
			lang_app: "en-IN",
			arrayNotes:[  ]
		}
		)
  const [hideNotes, dispatch] = useReducer(hideNotesFlagReducer, false);
  const [selectTypeNote, dispatchTypeNote] = useReducer(showSelectTypeNoteReducer, false);
  const [showAboutUs, setShowAboutUs] = useState(false)

	i18next.changeLanguage(countNotes.lang_app);

	const guardarCambioItem = () => {
		//guardarCambioIte = !guardarCambioIte
	}

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(countNotes));
		i18next.changeLanguage(countNotes.lang_app)
    // eslint-disable-next-line
  	}, [countNotes.theme_app,
			countNotes.arrayNotes[0],
			countNotes.arrayNotes.length,
			executeLocalSetItem.flag,
			countNotes.lang_app,
			]
		)

  return (
    <hideNotesFlagContext.Provider value={{hideNotes, dispatch}}>
      <div className={`
		container mw-100 bg-${countNotes.theme_app} app
		${!selectTypeNote.flag || !hideNotes.flag ? 
														"padding-main"
														:
														""
														}
		position-relative`}
		>
        <showSelectTypeNoteContext.Provider
					value={{selectTypeNote, dispatchTypeNote}}
					>
					<Header
						setCountNote={setCountNotes}
						countNotes={countNotes}
						setShowAboutUs={setShowAboutUs}
						/>
          <Main
						executeLocalSetItem={executeLocalSetItem}
						countNotes={countNotes}
						setCountNote={setCountNotes}
						theme={countNotes.theme_app}
						/>
					<WebAppInfo
						theme={countNotes.theme_app}
						showAboutUs={showAboutUs}
						setShowAboutUs={setShowAboutUs}
						/>
				</showSelectTypeNoteContext.Provider>
        <Footer
					theme={countNotes.theme_app}
					hideNotes={hideNotes}
					/>
      </div>
    </hideNotesFlagContext.Provider>
  );
}

export default App
