import { useState } from 'react'
import reactLogo from './assets/react.svg'
import lionLogo from './assets/lion.jpeg'
import SFLogo from './assets/State_Farm_logo.svg.png'
import hacker from './assets/hacker.jpeg'
import fishing from './assets/fishing.png'
import mask from './assets/mask.png'
import handcuff from './assets/handcuff.png'



import './App.css'

function App() {
  

  return (
    <div className="App">
      <div className="header">
        <img id='logo' src={SFLogo}></img>
      </div>
      
      <div className="are_you">
        <div className="ru_text">
          <h1>They're ready.</h1>
          <h1>Are you?</h1>
        </div>
        <h3 id="stat">61% of Small Buisness Owners were hit by a succesful cyber attack <br></br>last year, with 95% of breaches being attributed to human error. </h3>
        <h3 id="stat2">According to IBM, the average cost of each incident was $2.98 million <br></br>for small buisnesses.</h3>
        <img id='hacker' src={hacker}></img>
      </div>

      <div className="middle">
        <img id='fishing' src={fishing}></img>
        <img id='handcuff' src={handcuff}></img>
        <img id='mask' src={mask}></img>
      </div>

    </div>
  )
}

export default App
