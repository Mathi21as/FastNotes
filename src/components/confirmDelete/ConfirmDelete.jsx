import React from 'react'
import "./confirmDelete.css"
import { withTranslation } from 'react-i18next';
import i18next from 'i18next';
import confirmDelImg from "../../resourses/icons/check-delete.png"
import denyDelImg from "../../resourses/icons/denied-delete.png"


const ConfirmDelete = ( { 
													confirmDel,
													setConfirmDel,
													handleErase,
													theme,
													note,
													t 
													} ) => {
	if(confirmDel){
		return( 
			<div className='confirmDel'>
				 <div className={`bg-${theme} px-3 py-4`}>
					<p className={`p-0 h3 text-${theme==="white" ? "dark" : "white"}`}>
						{i18next.language==="es-ES"&&"¿"}
						{t("Delete")} "{note.name.length > 35 ? 
														note.name.slice(0, 35)+"..."
															:
														note.name.slice(0, 35)
														}"?
					</p>
					<button className='bg-success border-0' onClick={handleErase}>
							<img 
								className={`w-50 ${theme==="dark" && "invert"}`}
								src={confirmDelImg}
								alt="yes"
								/>
					</button>
					<button
						className="bg-danger border-0"
						onClick={() => setConfirmDel(false)}
						>
							<img 
								className={`w-50 ${theme==="dark" && "invert"}`}
								src={denyDelImg}
								alt='no'
							/>
					</button>
				</div>
			</div>
		);
	}
	else{
		return;
	}
}

export default withTranslation()(ConfirmDelete);