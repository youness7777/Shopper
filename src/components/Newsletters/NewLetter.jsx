import React from 'react'
import './NewsLetter.css'
export const NewLetter = () => {
  return (
    <div className='letter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newletter and staly updated</p>
        <div className='effect'>
            <input type='email' placeholder='your email id'></input>
            <button type='submit'>Subscribe</button>
        </div>
    </div>
  )
}
