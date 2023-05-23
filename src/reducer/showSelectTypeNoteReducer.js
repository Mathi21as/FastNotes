export const showSelectTypeNoteReducer = (state, action) => {
    switch(action.flag){
      case false: return {flag: false}
  
      case true: return {flag: true}
  
      default: return state
    }
  }
  