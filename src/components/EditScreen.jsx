import {useState, useContext} from 'react'
import {hideNotesFlagContext} from '../context/hideNotesFlagContext'
import './editscreen.css'
import {useFlag} from "../hooks/CustomHooks"

const EditScreen = ({executeLocalSetItem, delNote, uuidv4, count, setData}) => {
  const [text, setText] = useState(count.text);
  const [name, setName] = useState(count.name);
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext);
  const { flag, falsy, truty } = useFlag(false);
  const [colorNote, setColorNote] = useState(" ");

  const handleSave = () => {
    setData(actual => {
      if(actual[0].id===""){
        actual[0] = {
          id: uuidv4(),
          name: (name==="" ? "Title Empty" : name),
          text: (text==="" ? "Text Empty" : text),
          date: count.date,
          color: colorNote!==" " ? colorNote : "orange"
        }
      }
      else {
        for(let i=0; i<actual.length; i++){
          if(actual[i].id === count.id){
            actual[i] = {
              id: uuidv4(),
              name: (name==="" ? "Title Empty" : name),
              text: (text==="" ? "Text Empty" : text),
              date: count.date,
              color: colorNote!==" " ? colorNote : "orange"
            }
            executeLocalSetItem.flag ? executeLocalSetItem.falsy() : executeLocalSetItem.truty() //cambia la bandera creada en app.js para que se ejecute el useEffect y vuelva a guardar el localstorage el arreglo para guardar este cambio
            break;
          }
        }
      }
      return actual
    })
    dispatch({id:hideNotes.id, flag:false})
  }

  const handleCancel = () => {
    count.id==="" && delNote("")
    dispatch({id:hideNotes.id, flag:false})
  }

  const handleChangeColor = () => {
    if(flag){
      return(
        <div className="">
        <div className="">
          <button className="orangees m-2" onClick={()=>{setColorNote("orange"); falsy()}}></button>
          <button className="bluees m-2" onClick={()=>{setColorNote("blue"); falsy()}}></button>
          <button className="purplees m-2" onClick={()=>{setColorNote("purple"); falsy()}}></button>
          <button className="pinkes m-2" onClick={()=>{setColorNote("pink"); falsy()}}></button>
          <button className="redes m-2" onClick={()=>{setColorNote("red"); falsy()}}></button>
          <button className="greenes m-2" onClick={()=>{setColorNote("green"); falsy()}}></button>
        </div>
      </div>
    )
    }
    else{
      return <button className="m-2 btn2 py-0 text-center px-1 pb-1 fs-3 border-0 text-white" onClick={()=>truty()}><img className="inverted px-0 w-50" src="https://cdn-icons-png.flaticon.com/512/1812/1812482.png" alt=""/></button>
    }
  }

  return(
    <>
      <div className="row  mx-2 mb-4 buttons-div">
        <div className="col-4 text-start"><button className="btnprinc btn1 py-0 pb-1 text-center px-2 fs-3 fw-bold m-2 border-0 text-white" onClick={handleCancel}><img className="inverted w-50" src="https://cdn-icons-png.flaticon.com/512/271/271220.png" alt=""/></button></div>
        <div className="col-4 text-center">{ handleChangeColor() }</div>
        <div className="col-4 text-end"><button className="btnprinc py-0 text-center px-3 fs-3 m-2 border-0 text-white" onClick={handleSave}>Save</button></div>
      </div>
      <div className="container-inputs text-secondary border-1 px-3 border-secondary">
        <input className="bg-dark text-white w-100 border-0 h1 fw-bold p-2 m-2" name="name" value={name} placeholder={count.name==="" ? "Title" : ""} onChange={(e)=>setName(e.target.value)} type="text"/><br/>
        <textarea className="bg-dark text-white w-100 border-0 fs-4 p-2 m-2" onChange={(e)=>setText(e.target.value)} name="text" placeholder={count.text==="" ? "Type something..." : ""} value={text} style={{resize:"none"}}/>
      </div>
    </>
  )
}

export default EditScreen
