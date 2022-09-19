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
  const [countNotes, setCountNotes] = React.useState([  ]) //almacena la cantidad de notas que tiene que renderizar
  const countJson = JSON.parse(localStorage.getItem("notes"))
  const [hideNotes, dispatch] = React.useReducer(hideNotesFlagReducer, false)

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(countNotes))
    // eslint-disable-next-line
  }, [countNotes[0], countNotes.length, countNotes, executeLocalSetItem.flag])

  React.useEffect(() => {
    if(localStorage.getItem("notes")!==null)
      setCountNotes(countJson)
    // eslint-disable-next-line
  }, [])

  return (
    <hideNotesFlagContext.Provider value={{hideNotes, dispatch}}>
      <div className="container mw-100 p-0 bg-dark pb-3 app position-relative">
        <Header setCountNotes={setCountNotes}/>
        <Main executeLocalSetItem={executeLocalSetItem} countNotes={countNotes} setCountNotes={setCountNotes}/>
        <hr className="hrapp"/>
        <Footer />
      </div>
    </hideNotesFlagContext.Provider>
  );
}

export default App
