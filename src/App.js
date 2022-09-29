import React from 'react';
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import {useFlag} from "./hooks/CustomHooks"
import {hideNotesFlagContext} from './context/hideNotesFlagContext'
import {hideNotesFlagReducer} from './reducer/hideNotesFlagReducer'
import './App.css'

function App() {
  const executeLocalSetItem = useFlag(false) //se cambia desde el componente editscreen, se usa como dependencia en useEffect del setitem del localstorage.
  const [countNotes, setCountNotes] = React.useState({theme_app:"dark", arrayNotes:[  ]}) //almacena la cantidad de notas que tiene que renderizar
  const [hideNotes, dispatch] = React.useReducer(hideNotesFlagReducer, false)
  const restoreStorage = JSON.parse(localStorage.getItem("notes"))

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(countNotes))
    // eslint-disable-next-line
  }, [countNotes.theme_app, countNotes.arrayNotes[0], countNotes.arrayNotes.length, executeLocalSetItem.flag])

  React.useEffect(() => {
    if(localStorage.getItem("notes")!==null)
      setCountNotes(restoreStorage)
    // eslint-disable-next-line
  }, [])

  return (
    <hideNotesFlagContext.Provider value={{hideNotes, dispatch}}>
      <div className={`container mw-100 p-0 bg-${countNotes.theme_app} pb-3 app position-relative`}>
        <Header setCountNotes={setCountNotes} countNotes={countNotes}/>
        <Main executeLocalSetItem={executeLocalSetItem} countNotes={countNotes.arrayNotes} setCountNotes={setCountNotes} theme={countNotes.theme_app}/>
        { (!hideNotes.flag && hideNotes.id===undefined) ? <hr className="hrapp"/> : "" }
        <Footer theme={countNotes.theme_app} hideNotes={hideNotes}/>
      </div>
    </hideNotesFlagContext.Provider>
  );
}

export default App
