import React, { useState } from 'react'
import './DescriptionBox.css'
export const DescriptionBox = () => {
    const [chang,setchange]=useState("descriptionop")

  return (
    <div className='description-box'>
        <div className="descr-top">
            <div className={`description-nav ${chang==="descriptionop"?'active':''}`} onClick={()=>setchange("descriptionop")}>Description</div>
            <div className={`review-nav ${chang==="reviewop"?'active':''}`} onClick={()=>setchange("reviewop")}>Reviews(122)</div>
        </div>
    <div className="contexte-nav">
    {chang==="descriptionop"?(<p> this is about the description of this product over the internet  and in the future i wille do it by using state to practice what i
     learn about hooks in this platform so i hope i will do it by myself again ofcourse</p>):(<p> this is about the review
         of this product over the internet  and in the future i wille do it by using state to practice what
          i learn about hooks in this platform so i hope i will do it by myself again ofcourse</p>)}
        
            
        </div> 

    </div>
  )
}
