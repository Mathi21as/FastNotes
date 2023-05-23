import React from 'react'
import "./webappinfo.css"
import { withTranslation } from 'react-i18next';


const AboutUs = ({theme, showAboutUs, setShowAboutUs, t}) => {
    if(showAboutUs){
        return(
            <div className='divAboutus'>
                <div className={`bg-${theme} px-4 py-4 d-flex flex-column`}>
                    <p
											className={`
												p-0 h3 text-${theme==="white" ? "dark" : "white"}
												`}
												>
                        {t(
														"On this version, the notes only save on local storage \
														of the navigator, so if you delete the data of your \
														navigator, will lose your notes.\
														On the next version your notes will save on your Google\
														Drive and if you don't sign in with your Google user,\
														your notes will save on the navigator."
													)
												}
                    </p>
                    <button
											onClick={()=>{setShowAboutUs(false)}}
											className='mt-5 bg-danger border-0 text-white fs-5 py-2'
											>
												{t("Close")}
										</button>
                </div>
            </div>
        );
    }
}

export default withTranslation()(AboutUs);