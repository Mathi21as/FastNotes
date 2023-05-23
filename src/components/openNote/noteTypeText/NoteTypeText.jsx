import React from 'react'
import { withTranslation } from 'react-i18next';
import editNoteImg from "../../../resourses/icons/edit.png"
import backArrowImg from "../../../resourses/icons/back-arrow.png"
import deleteImg from "../../../resourses/icons/delete.png"


const NoteTypeText = ( {theme, handleBack, setConfirmDel, handleEdit, note, t} ) => {
	return(
		<>
			<div className="row px-2 imgopen">
				<div className="col-4 text-start">
					<button
						className={`
							${theme==="white" ? "themewhite" : "themedark"}
							btnopennote mx-1 text-center px-3 pb-1 fs-3 fw-bold
							m-2 border-0 text-white
							`}
							onClick={handleBack}
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
								btnopennote mx-1 text-center px-3 fs-3 pb-1 fw-bold
								m-2 border-0 text-white
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
						h1 text-${theme==="white" ? "dark" : "white"}
						mx-2 my-3 py-2 textwrap overflow-hidden
						`}
						>
						{t(note.name)}
				</p>
				<p className="fs-5 text-secondary m-3 overflow-hidden">
				{
						note.date.length === 12 ?
							(t(note.date.substr([0], [3])) + note.date.substr([3]))
							: note.date.length === 33 ?
							(
								t(note.date.slice(0,21)) +
								t(note.date.slice(21, 24)) + " " +
								t(note.date.substr(25))
							)
							: note.date.length === 31 &&
							(
								t(note.date.slice(0,19)) +
								t(note.date.slice(19, 22)) + " " +
								t(note.date.substr(23))
							)
					}
				</p>
				<textarea
					className={`
						fs-5 text-${theme==="white" ? "dark" : "white"}
						bg-dark border-0 mx-0 px-3 bg-${theme}
						`}
					readOnly={true}
					disabled
					value={t(note.text)}
					/>
			</div>
		</>
	)
}

export default withTranslation()(NoteTypeText);