
import './App.css'
import {useState} from 'react'
import stateFarm from './assets/statefarm.png'
import happyJake from './assets/jakehappy.png'

interface BadSite {
  id: string;
  risk: string
}

interface PhishingEmails {
  id: string;
  email: string;
}
interface UserDetails {
  id: string;
  name: string;
  listOfBadSites?: Array<BadSite>
  listOfPhishingEmails?: Array<PhishingEmails> 
  bonus: number;
  safetyScore: number;
}

function App() {

  const [userData, setUserData] = useState<UserDetails>({
    id: '121',
    name: 'Paul',
    bonus: 50,
    safetyScore: 83
  })

  return (
    userData ? 
    <>
    <div className="outerContainer">
      <div className="navbar">
        <div>
          <img src={stateFarm} alt="statefarmlogo" width={236} height={43} />
        </div>
        <div>
          Cyber View
        </div>
      </div>
      <div className="topSection">
        <div className="jakeSection" >
          <img src={happyJake}/>
        </div>
        <div className="circleBackground"></div>
        <div className="bonusSection">
          <h1 className="savedYourself">You've saved yourself...</h1>
          <p className="bonus">{userData.bonus} <p className="dollarSign">$</p></p>
          <p className="bonusDescription">this month through <span className="bonusRed">safe </span>and <span className="bonusRed"> responsible </span> web browsing</p>

        </div>
      </div>
      <div className="scoreSection">

      </div>
    </div>
    </>
    : <><div>There seems to be an error</div></>
  )
}

export default App
