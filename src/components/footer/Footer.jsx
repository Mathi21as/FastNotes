import React from 'react'
import "./footer.css"
import { withTranslation } from 'react-i18next'
import githubImg from "../../resourses/icons/github.png"
import linkedinImg from "../../resourses/icons/linkedin.png"

const Footer = ({theme, hideNotes, t}) => {
  const rendFooter= () => {
    if(!hideNotes.flag && hideNotes.id===undefined){
      return(
        <nav className="navbar-footer navbar-nav navbar-center
									position-absolute bottom-0 w-100 text-center"
									>
          <nav
						className={`
							bg-${theme} text-${theme==="white" ? "dark" : "white"} p-2
							`}
						>
            <p className="mx-1 w-100">
							<strong>
								{t("Developed by")}&nbsp;
							</strong> 
							Mathias Ledesma
						</p>
            <a 
							href="https://github.com/Mathi21as/FastNotes"
							className="mx-3"
							target="_blank"
							rel="noopener noreferrer">
								<img 
									className={`imgfoot ${theme==="white" ? "" : "footInvert"}`}
									src={githubImg}
									alt='GitHub'
									/>
						</a>
            <a
							href="https://www.linkedin.com/in/mathias-ledesma-9a6b62212"
							className="mx-1"
							target="_blank"
							rel="noopener noreferrer">
								<img
									className={`imgfoot ${theme==="white" ? "" : "footInvert"}`}
									src={linkedinImg}
									alt='LinkedIn'
									/>
						</a>
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

export default withTranslation()(Footer);
