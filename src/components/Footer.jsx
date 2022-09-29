import "./footer.css"

const Footer = ({theme, hideNotes}) => {
  const rendFooter= () => {
    if(!hideNotes.flag && hideNotes.id===undefined){
      return(
        <nav className="navbar-footer navbar-nav navbar-center position-absolute bottom-0 w-100 text-center">
          <nav className={`bg-${theme} text-${theme==="white" ? "dark" : "white"} p-2`}>
            <p className="mx-1 w-100"><strong>Developed by</strong> Mathias Ledesma</p>
            <a href="https://github.com/Mathi21as/FastNotes" className="mx-3" target="_blank" rel="noreferrer"><img className={`imgfoot ${theme==="white" ? "" : "footInvert"}`} src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png" alt='GitHub'/></a>
            <a href="https://www.linkedin.com/in/mathias-ledesma-9a6b62212" className="mx-1" target="_blank" rel="noreferrer"><img className={`imgfoot ${theme==="white" ? "" : "footInvert"}`} src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt='LinkedIn'/></a>
          </nav>
        </nav>
      )
    }
  }

  return(
    <>
      {rendFooter()}
    </>
  )
}

export default Footer
