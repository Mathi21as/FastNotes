import React, {useState, useContext} from 'react'
import {hideNotesFlagContext} from '../../context/hideNotesFlagContext'
import moment from 'moment'
import './editscreen.css'
import {useFlag} from "../../hooks/CustomHooks"
import { withTranslation } from 'react-i18next'
import changeColorImg from "../../resourses/icons/change-color.png"
import backArrowImg from "../../resourses/icons/back-arrow.png"
import saveImg from "../../resourses/icons/save.png"
import addItemImg from "../../resourses/icons/add-item-list.png"
import deleteItemImg from "../../resourses/icons/delete.png"

const EditScreen = ({
											index,
											executeLocalSetItem,
											delNote,
											uuidv4,
											count,
											setData,
											theme,
											openNote,
											t
											}) => {
  const [text, setText] = useState(count.text);
  const [name, setName] = useState(count.name);
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext);
  const { flag, falsy, truty } = useFlag(false);
  const [colorNote, setColorNote] = useState(count.color);
  const [list, setList] = useState(count.type === "list" && count.list);

  const handleSave = () => {
    setData(actual => {
      if(actual.arrayNotes[0].id === ""){
        actual.arrayNotes[0] = {
          id: uuidv4(),
          name: name==="" ? "Title Empty" : name,
          [actual.arrayNotes[0].type]: actual.arrayNotes[0].type === "list" ?
						list : text==="" ?
						"Text Empty"
						:
						text,
          date: count.date,
          color: colorNote !== "" ? colorNote : "orange",
          type: actual.arrayNotes[0].type
        }
      }
      else if(actual.arrayNotes[index].id === count.id){
        actual.arrayNotes[index] = {
          id: actual.arrayNotes[index].id,
          name: name==="" ? "Title Empty" : name,
          [actual.arrayNotes[index].type !== undefined ?
						actual.arrayNotes[index].type
						:
						"text"
						]: actual.arrayNotes[index].type === "list" ?
						list
						:
						text === "" ?
						"Text Empty"
						:
						text,
          date: `Last modification: ${moment().format("LLLL").slice(9,21)}`,
          color: colorNote!==" " ? colorNote : "orange",
          type: actual.arrayNotes[index].type !== undefined ?
						actual.arrayNotes[index].type
						:
						"text"
        };
        /*
					cambia la bandera creada en app.js para que se ejecute el useEffect y
					vuelva a guardar el localstorage el arreglo para guardar este cambio
				*/
				executeLocalSetItem.flag ?
					executeLocalSetItem.falsy()
					:
					executeLocalSetItem.truty();
      }
      return actual;
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

  const setColor = (color) => {
    setColorNote(color);
    falsy();
  }

  const handleChangeColor = () => {
    if(flag){
      return(
        <div className='animColors'>
          <button
						className="orangees m-2 circle-color"
						onClick={()=>{setColor("orange")}}
						>
					</button>
          <button
						className="bluees m-2 circle-color"
						onClick={()=>{setColor("blue")}}
						>
					</button>
          <button
						className="purplees m-2 circle-color"
						onClick={()=>{setColor("purple")}}
						>							
					</button>
          <button
						className="pinkes m-2 circle-color"
						onClick={()=>{setColor("pink")}}
						>								
					</button>
          <button
						className="redes m-2 circle-color"
						onClick={()=>{setColor("red")}}
						>							
					</button>
          <button
						className="greenes m-2 circle-color"
						onClick={()=>{setColor("green")}}
						>							
					</button>
        </div>
    )
    }
    else{
      return (
				<button 
					className={`
						m-1 my-2 btnprinc btn2 py-0 text-center px-1 pb-1 fs-3 border-0
						${colorNote!==" " && theme==="white" ? "themewhite" : "themedark"}
						${colorNote!==" " && colorNote + "es"}
						`}
					onClick={()=>truty()}
					>
						<img
							className={`${theme==="dark" && "invert"} px-0 w-50`}
							src={changeColorImg}
							alt=""
							/>
				</button>)
    }
  }

  const render = () => {
		if( hideNotes.flag && openNote && hideNotes.id===index ){
	    if(count.type === "text" || count.type === undefined){
	      return(
	        <>
	          <div className="row mx-0 mb-5 buttons-div justify-content-between">
	            <div className="col-2 text-start">
								<button
									className={`
										btnprinc btn1 py-0 pb-1 text-center px-2 fs-3 fw-bold m-0
										my-2 border-0 ${theme==="white" ? "themewhite" : "themedark"}
										text-${theme==="white" ? "dark" : "white"}
										`}
									onClick={handleCancel}
									>
										<img
											className={`${theme==="dark" && "invert"} w-50`}
											src={backArrowImg}
											alt=""
											/>
								</button>
							</div>
	            <div className="col-8 text-center">{ handleChangeColor() }</div>
	            <div className="col-2 text-end">
								<button
									className={`
										btnprinc btn1 py-0 pb-1 text-center px-1 fs-3 fw-bold m-0
										my-2 border-0 ${theme==="white" ? "themewhite" : "themedark"}
										text-${theme==="white" ? "dark" : "white"}
										`}
									onClick={handleSave}
									>
										<img
											className={`${theme==="dark" && "invert"} w-50`}
											src={saveImg}
											alt=""
											/>
								</button>
							</div>
	          </div>
	          <div
							className="container-inputs text-secondary border-1
								px-1 border-secondary"
								>
	            <input
								className={`
									bg-${theme} text-${theme==="white" ? "dark" : "white"} w-100
									border-0 h1 fw-bold p-1 m-1 my-2
									`}
								name="name"
								value={name}
								placeholder={count.name==="" ? t("Title") : ""}
								onChange={(e)=>setName(e.target.value)}
								type="text"
								/>
							<br/>
	            <textarea
								className={`
									bg-${theme} text-${theme==="white" ? "dark" : "white"} w-100
									border-0 fs-4 p-1 m-1 my-2
									`}
								onChange={(e)=>setText(e.target.value)}
								name="text"
								placeholder={count.text==="" ? t("Type something...") : ""}
								value={text}
								/>
	          </div>
	        </>
	      )
	    }
	    else{
	      return(
	        <>
	          <div className="row mx-0 mb-4 buttons-div justify-content-between">
	            <div className="col-2 text-start">
								<button
									className={`
										btnprinc btn1 py-0 pb-1 text-center px-2 fs-3 fw-bold m-0
										my-2 border-0 ${theme==="white" ? "themewhite" : "themedark"}
										text-${theme==="white" ? "dark" : "white"}
										`}
									onClick={handleCancel}
									>
										<img
											className={`${theme==="dark" && "invert"} w-50`}
											src={backArrowImg}
											alt=""
											/>
								</button>
							</div>
	            <div className="col-8 text-center">{ handleChangeColor() }</div>
	            <div className="col-2 text-end">
								<button
									className={`
										btnprinc btn1 py-0 pb-1 text-center px-1 fs-3 fw-bold m-0
										my-2 border-0 ${theme==="white" ? "themewhite" : "themedark"}
										text-${theme==="white" ? "dark" : "white"}
										`}
									onClick={handleSave}
									>
										<img
											className={`${theme==="dark" && "invert"} w-50`}
											src={saveImg}
											alt=""
											/>
								</button>
							</div>
	          </div>
	          <div
							className="
								container-inputs text-secondary border-1
								px-1 border-secondary
								"
								>
	            <div
								className='
									mw-100 d-flex flexDirection-row px-2 pb-3
									justify-content-between hElements
									'
									>
	              		<input
											className={`
												bg-${theme} text-${theme==="white" ? "dark" : "white"}
												w-100 border-0 h1 fw-bold p-1 m-1 my-2
												`}
											name="name"
											value={name}
											placeholder={count.name==="" ? t("Title") : ""}
											onChange={(e)=>setName(e.target.value)}
											type="text"
											/>
										<br/>
	              		<button
											className={`
												addListItem-btn mx-1 my-3
												${theme==="white" ? "themewhite" : "themedark"}
												`}
											onClick={() => setList([ ...list, {text:"", status: ""}])}
											>
												<img
													className={`${theme==="dark" && "invert"}`}
													src={addItemImg}
													alt=""
													/>
										</button>
	          	</div>
	            {
	              list.map((item, indexx) => {
	                return(
	                  <>
	                  <hr className='m-0 w-100 text-secondary'/>
	                  <div className='d-flex flexDirection-row px-2'>
	                    <input
												className={`
													bg-${theme} text-${theme==="white" ? "dark" : "white"}
													w-100 border-0 h5 fw-normal p-1 m-1 my-2
													`}
												placeholder={item.text === "" && t("New Item")}
												value={item.text}
												onChange={
													(e) => setList(list.map((el, inde) => inde === indexx ?
														({text: e.target.value, status: el.status})
														:
														el
														))}
														/>
	                    <button
												className={`
													${theme==="white" ? "themewhite" : "themedark"}
													red btnEraseItem border-0 pb-1 my-3
													`}
												onClick={()=>setList(list.filter(elem => elem !== item))}
												>
													<img
														className={`${theme==="dark" && "invert"} w-75`}
														src={deleteItemImg}
														alt=""
														/>
											</button>
	                  </div>
	                  </>
	                );
	              })
	            }
	          </div>
	        </>
	      )
	    }
  	}
	}

  return(
    <>
      {render()}
    </>
  )
}

export default withTranslation()(EditScreen)
