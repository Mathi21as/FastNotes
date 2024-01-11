import React from 'react'
import { withTranslation } from 'react-i18next'
import "./notetypelist.css"
import addItemImg from "../../../resourses/icons/add-item-list.png"
import editNoteImg from "../../../resourses/icons/edit.png"
import backArrowImg from "../../../resourses/icons/back-arrow.png"
import deleteImg from "../../../resourses/icons/delete.png"
import checkImg from "../../../resourses/icons/check-item-list.png"


const NoteTypeList = ( {theme,
												handleBack,
												setConfirmDel,
												handleEdit,
												note,
												setCountNotes,
												index,
												setFlagReRender,
												t
	} ) => {

  const changeStatusItemList = (item, indexItem) => {
		if(item.status === "check"){
			setCountNotes((actual) => {
				actual.arrayNotes[index].list[indexItem] = {
					text: item.text,
					status: ""
				};
				setFlagReRender((actual) => !actual);
	    	localStorage.setItem("notes", JSON.stringify(actual));
				return actual;
				})
		}
		else{
			setCountNotes((actual) => {
				actual.arrayNotes[index].list[indexItem] = {
					text: item.text,
					status: "check"
				};
				setFlagReRender((actual) => !actual);
	    	localStorage.setItem("notes", JSON.stringify(actual));
				return actual;
			})
		}
	}
	return(
		<>
			<div className="row px-2 imgopen">
				<div className="col-4 text-start">
					<button 
						className={`
							${theme==="white" ? "themewhite" : "themedark"}
							btnopennote mx-1 text-center px-3 pb-1 fs-3
							fw-bold m-2 border-0 text-white
							`}
						onClick={()=>handleBack()}
						>
							<img
								className={`${theme==="dark" && "invert"} w-75`}
								src={backArrowImg}
								alt=""
								/>
					</button>
				</div>

				<div className="col-4 text-center">
					<button
						className=" red btnopennoteerase mx-1 text-center px-3 pb-2
												fs-3 fw-bold m-2 border-0 text-white "
						onClick={() => setConfirmDel(true)}
						>
							<img
								className={`${theme==="dark" && "invert"} w-100`}
								src={deleteImg}
								alt=""
								/>
					</button>
				</div>

				<div className="col-4 text-end">
					<button
						className={`
							${theme==="white" ? "themewhite" : "themedark"}
							btnopennote mx-1 text-center px-3 fs-3 pb-1 fw-bold m-2
							border-0 text-white
							`}
						onClick={handleEdit}
						>
							<img
								className={`${theme==="dark" && "invert"} w-75`}
								src={editNoteImg}
								alt=""
								/>
					</button>
				</div>
			</div>

			<div className="text-start py-3 w-100 px-0 opennoteedit">
				<p
					className={`
						h1 text-${theme==="white" ? "dark" : "white"} mx-2 my-3
						py-2 textwrap overflow-hidden
						`}
						>
							{t(note.name)}
				</p>
				<p className="fs-5 text-secondary m-3 overflow-hidden">
					{note.modified === "true" && t("Last modification: ")}
					{note.date}
				</p>
				{
					note.list.length > 0 ? 
					note.list.map((item, indexItem) => {
						return(
							<>
								<hr className='m-0 w-100 text-secondary'/>
								<div className='text-white d-flex flexDirection-row
																justify-content-between p-1 my-2
																align-items-center'
																>
									<p className={`
										m-1 py-1 h5 fw-normal itemText
										text-${theme==="white" ? "dark" : "white"}`}
										>
											{item.text !== "" ? item.text : t("New Item")}
									</p>
									<button 
										className='btnImgCheck mx-2'
										onClick={() => changeStatusItemList(item, indexItem)}>
										{
											item.status === "check" && (
												<img
													src={checkImg}
													alt=""
												/>)
										}
									</button>
								</div>
							</>
						)
					})
					:
					<p
						className={`
							text-${theme==="white" ? "dark" : "white"} fs-4 p-4 w-100
							text-center line_height margin_top
							`}
							>
								{t("No items. Add one pressing")}
								<img
									className={`${theme==="dark" && "invert"} mx-2 iconsNoItems`}
									src={editNoteImg}
									alt=""
									/>
								{t("and then")}
								<img
									className={`${theme==="dark" && "invert"} mx-2 iconsNoItems`}
									src={addItemImg}
									alt=""
									/>
					</p>
				}
			</div>
		</>
	)
}

export default withTranslation()(NoteTypeList);