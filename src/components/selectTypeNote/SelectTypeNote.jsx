import React, { useState, useContext} from 'react'
import {hideNotesFlagContext} from '../../context/hideNotesFlagContext'
import {showSelectTypeNoteContext} from '../../context/showSelectTypeNoteContext'
import moment from 'moment'
import "./selecttypenote.css"
import { withTranslation } from 'react-i18next'

const SelectTypeNote = ({setCountNote, theme, t}) => {
  const { hideNotes, dispatch } = useContext(hideNotesFlagContext);
  const { selectTypeNote, dispatchTypeNote } = useContext(showSelectTypeNoteContext);

  const newFile = (type) => {
    dispatch({id:0,flag:true});
    if(type === "note"){
      dispatchTypeNote({flag:false})
      setCountNote( (actual) => {
        if(actual.arrayNotes[0] === undefined)
          actual.arrayNotes.unshift(
						{
							id:"",
							name:"",
							text:"",
							date: moment().format("LLLL").slice(9,21),
							color:"",
							type:"text"
						})
        if(actual.arrayNotes[0].name !== "")
          actual.arrayNotes.unshift(
						{
							id:"",
							name:"",
							text:"",
							date: moment().format("LLLL").slice(9,21),
							color:"",
							type:"text"
						})
        return actual
      } );
    }
    else if(type === "list"){
      dispatchTypeNote({flag:false})
      setCountNote( (actual) => {
        if(actual.arrayNotes[0] === undefined)
          actual.arrayNotes.unshift(
						{
							id:"",
							name:"",
							list:[],
							date: moment().format("LLLL").slice(9,21),
							color:"",
							type:"list"
						})
        if(actual.arrayNotes[0].name !== "")
          actual.arrayNotes.unshift(
						{
							id:"",
							name:"",
							list:[],
							date: moment().format("LLLL").slice(9,21),
							color:"",
							type:"list"
						})
        return actual
      } );
    }
  }

  return( 
      <div className='selectTypeNote-container'>
        <div className={`bg-${theme === "dark" ? "dark" : "white"} text-white`}>
          <p className={`text-${theme === "dark" ? "white" : "dark"}`}>
						{t("Select type note")}
					</p>
          <div>
          <button
						className='bg-success text-white border-0'
						onClick={()=>{newFile("note")}}
						>
							{t("Note")}
					</button>
          <button
						className='bg-danger text-white border-0'
						onClick={()=>{newFile("list")}}
						>
							{t("List")}
					</button>
          </div>
        </div>
      </div>
  );
}

export default withTranslation()(SelectTypeNote);