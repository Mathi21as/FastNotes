import {v4 as uuidv4} from 'uuid'
import LayoutNote from './LayoutNote'
import './main.css'

const Main = ({executeLocalSetItem, countNotes, setCountNotes, theme}) => {

  const delNote = (idDel) => {
    setCountNotes((actual) => {
      const newArray = actual.arrayNotes.filter((el)=>el.id!==idDel);
      return {theme_app: actual.theme_app, arrayNotes: newArray};
    })
  }

  const renderMain = () => {
    if(countNotes[0]===undefined){
      return (
        <div className="w-100 text-center px-5">
          <h1 className={`text-${theme==="white" ? "dark" : "white"} fs-3 h1main`}>No notes to show. Add one by pressing "+"</h1>
        </div>
      );
    }
    else{
      return(
        <div className="w-100 text-center p-2 mx-0 row">
          {
            countNotes.map((count, index) => {
              return <LayoutNote key={uuidv4()} index={index} executeLocalSetItem={executeLocalSetItem} delNote={delNote} count={count} setCountNotes={setCountNotes} theme={theme}/>
            })
          }
        </div>
      )
    }
  }

  return(
    <>
    {
      renderMain()
    }
    </>
  )
}

export default Main
