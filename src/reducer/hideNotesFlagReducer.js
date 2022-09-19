export const hideNotesFlagReducer = (state, action) => {
  switch(action.flag){
    case false: return {id: action.id, flag: false}

    case true: return {id: action.id, flag: true}

    default: return state
  }
}
