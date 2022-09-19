import {v4 as uuidv4} from 'uuid'
import LayoutNote from './LayoutNote'

const Main = ({executeLocalSetItem, countNotes, setCountNotes}) => {

  const delNote = (idDel) => {
    setCountNotes((actual) => actual.filter((count)=>count.id!==idDel))
  }


  return(
    <div className="w-100 text-center p-2 mx-0 row" id="idMain">
      {
        countNotes.map((count, index) => {
          return <LayoutNote key={uuidv4()} index={index} executeLocalSetItem={executeLocalSetItem} delNote={delNote} count={count} setCountNotes={setCountNotes}/>
        })
      }
    </div>

  )
}

export default Main
