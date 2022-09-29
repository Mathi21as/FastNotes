import {useState, useContext} from 'react'
import {hideNotesFlagContext} from '../context/hideNotesFlagContext'
import './editscreen.css'
import {useFlag} from "../hooks/CustomHooks"

const EditScreen = ({executeLocalSetItem, delNote, uuidv4, count, setData, theme}) => {
  const [text, setText] = useState(count.text);
  const [name, setName] = useState(count.name);
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext);
  const { flag, falsy, truty } = useFlag(false);
  const [colorNote, setColorNote] = useState(count.color);
  console.log(colorNote);

  const handleSave = () => {
    setData(actual => {
      if(actual.arrayNotes[0].id===""){
        actual.arrayNotes[0] = {
          id: uuidv4(),
          name: (name==="" ? "Title Empty" : name),
          text: (text==="" ? "Text Empty" : text),
          date: count.date,
          color: colorNote!=="" ? colorNote : "orange"
        }
      }
      else {
        for(let i=0; i<actual.arrayNotes.length; i++){
          if(actual.arrayNotes[i].id === count.id){
            actual.arrayNotes[i] = {
              id: uuidv4(),
              name: (name==="" ? "Title Empty" : name),
              text: (text==="" ? "Text Empty" : text),
              date: count.date,
              color: colorNote!==" " ? colorNote : "orange"
            };
            executeLocalSetItem.flag ? executeLocalSetItem.falsy() : executeLocalSetItem.truty(); //cambia la bandera creada en app.js para que se ejecute el useEffect y vuelva a guardar el localstorage el arreglo para guardar este cambio
            break;
          }
        }
      }
      return actual
    });
    dispatch({id:hideNotes.id, flag:false})
  }

  const handleCancel = () => {
    if(name===""){
      dispatch({id:undefined, flag:false});
      setData(actual=>{
        const newArray = actual.arrayNotes.filter((el)=>el.name!=="");
        return {theme_app: actual.theme_app, arrayNotes: newArray};
        }
      );
    }
    else{
      count.id==="" && delNote("")
      dispatch({id:hideNotes.id, flag:false})
    }
  }

  const handleChangeColor = () => {
    if(flag){
      return(
        <>
          <button className="orangees m-2 circle-color" onClick={()=>{setColorNote("orange"); falsy()}}></button>
          <button className="bluees m-2 circle-color" onClick={()=>{setColorNote("blue"); falsy()}}></button>
          <button className="purplees m-2 circle-color" onClick={()=>{setColorNote("purple"); falsy()}}></button>
          <button className="pinkes m-2 circle-color" onClick={()=>{setColorNote("pink"); falsy()}}></button>
          <button className="redes m-2 circle-color" onClick={()=>{setColorNote("red"); falsy()}}></button>
          <button className="greenes m-2 circle-color" onClick={()=>{setColorNote("green"); falsy()}}></button>
        </>
    )
    }
    else{
      return <button className={`m-1 my-2 btnprinc btn2 py-0 text-center px-1 pb-1 fs-3 border-0 ${colorNote!==" " && theme==="white" ? "btnwhite" : "btndark"} ${colorNote!==" " && colorNote + "es"}`} onClick={()=>truty()}><img className={`${theme==="dark" && "invert"} px-0 w-50`} src="https://cdn-icons-png.flaticon.com/512/1812/1812482.png" alt=""/></button>
    }
  }

  return(
    <>
      <div className="row mx-0 mb-5 buttons-div">
        <div className="col-4 text-start"><button className={`btnprinc btn1 py-0 pb-1 text-center px-2 fs-3 fw-bold m-0 my-2 border-0 ${theme==="white" ? "btnwhite" : "btndark"} text-${theme==="white" ? "dark" : "white"}`} onClick={handleCancel}><img className={`${theme==="dark" && "invert"} w-50`} src="https://cdn-icons-png.flaticon.com/512/271/271220.png" alt=""/></button></div>
        <div className="col-4 text-center">{ handleChangeColor() }</div>
        <div className="col-4 text-end"><button className={`btnprinc py-0 text-center px-3 fs-3 m-1 my-2 border-0 ${theme==="white" ? "btnwhite" : "btndark"} text-${theme==="white" ? "dark" : "white"}`} onClick={handleSave}>Save</button></div>
      </div>
      <div className="container-inputs text-secondary border-1 px-1 border-secondary">
        <input className={`bg-${theme} text-${theme==="white" ? "dark" : "white"} w-100 border-0 h1 fw-bold p-1 m-1 my-2`} name="name" value={name} placeholder={count.name==="" ? "Title" : ""} onChange={(e)=>setName(e.target.value)} type="text"/><br/>
        <textarea className={`bg-${theme} text-${theme==="white" ? "dark" : "white"} w-100 border-0 fs-4 p-1 m-1 my-2`} onChange={(e)=>setText(e.target.value)} name="text" placeholder={count.text==="" ? "Type something..." : ""} value={text} style={{resize:"none"}}/>
      </div>
    </>
  )
}

export default EditScreen
