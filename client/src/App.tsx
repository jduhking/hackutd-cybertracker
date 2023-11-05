
import './App.css'
import {useState} from 'react'
import stateFarm from './assets/statefarm.png'
import happyJake from './assets/jakehappy.png'
import MalSites from './components/MalSites'
import Phishing from './components/Phishing'

interface BadSite {
  id: string;
  url: string;
  date: string;
}

interface PhishingEmails {
  id: string;
  email: string;
  date: string;
}
interface UserDetails {
  id: string;
  name: string;
  listOfBadSites?: Array<BadSite>;
  listOfPhishingEmails?: Array<PhishingEmails>;
  phishingCount: number;
  bonus: number;
  safetyScore: number;
}

function App() {

  const [userData, setUserData] = useState<UserDetails>({
    id: '121',
    name: 'Paul',
    bonus: 50,
    listOfBadSites: [{id: '3243', url: 'https://ffuppdateee.org', date: '08/31/2023'},
     {id: '3241', url: 'https://vegdsweb.com', date: '08/27/2023'}, {id: '3224', url: 'https://ffuppdateee.org', date: '08/22/2023'},
     {id: '33224', url: 'https://ffuppdateee.org', date: '08/25/2023'}, {id: '32424', url: 'https://ffuppdateee.org', date: '08/22/2023'}],
     listOfPhishingEmails: [{id: '3243', email: 'https://ffuppdateee.org', date: '08/31/2023'},
     {id: '3241', email: 'https://vegdsweb.gmail.com', date: '08/27/2023'}, {id: '3224', email: 'https://ffuppdateee.google.org', date: '08/22/2023'},
     {id: '33224', email: 'https://ffuppdateee.gmail.org', date: '08/25/2023'}, {id: '32424', email: 'https://ffuppdateee.gmail.org', date: '08/22/2023'}],
    safetyScore: 83,
    phishingCount: 7
  })
  const [viewSites, setViewSites] = useState<boolean>(true)

  return (
    userData ? 
    <>
    <div className="outerContainer">
      <div className="navbar">
        <div>
          <img src={stateFarm} alt="statefarmlogo" width={236} height={43} />
        </div>
        <div className="titleContainer">
          <div className="cyberView">
            Cyber View
          </div>
        </div>
      </div>
      <div className="topSection">
        <div className="jakeSection" >
          <img src={happyJake} width={550} height={550}/>
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
      <div className="bottomSection">
        <div className="analyticsContainer">
          <div className="analyticsTop">
            <h1 className="analyticsTitle">{viewSites ? "Malicious sites visited" : "Phishing Emails"}</h1>
            <p className="analyticsDescription">{viewSites ? "These are the list of sites you have visited recently which are deemed malicious" : 
            "These are the emails which led you to the phishing links"}</p>
            <button className="learnMoreTwo">Learn More</button>
          </div>
          <div className="listContainer">
            {
              viewSites ? 
              <MalSites listOfBadSites={userData.listOfBadSites}/>
              : <Phishing listOfPhishingEmails={userData.listOfPhishingEmails} />
            } 
          </div>
        </div>
      </div>
    </div>
    </>
    : <><div>There seems to be an error</div></>
  )
}

export default App
