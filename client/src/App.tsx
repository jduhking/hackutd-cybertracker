
/*global chrome*/
import './App.css'
import {useState, useEffect} from 'react'
import stateFarm from './assets/statefarm.png'
import jake from './assets/jake.png'
import MalSites from './components/MalSites'
import Phishing from './components/Phishing'
import axios from 'axios'
import Slider from './components/Circleslide'
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

  const getUserDetails = async () => {
    const userId = '65475ec60d269bf5d990d849';
    const url = `https://cybertracker-50ev.onrender.com/user/${userId}`
  
  
    try {
      const response = await axios.get(url);
      console.log(response);
      const data = response.data
      const userObj: UserDetails = {
        id: data._id, // need this from the extension
        name: 'Pelumi',
        bonus: 50, // need this from the end point 
        listOfBadSites: [{id: '3243', url: 'https://ffuppdateee.org', date: '08/31/2023'}, // need this from end point
        {id: '3241', url: 'https://vegdsweb.com', date: '08/27/2023'}, {id: '3224', url: 'https://ffuppdateee.org', date: '08/22/2023'},
        {id: '33224', url: 'https://ffuppdateee.org', date: '08/25/2023'}, {id: '32424', url: 'https://ffuppdateee.org', date: '08/22/2023'}],
        listOfPhishingEmails: [{id: '3243', email: 'https://ffuppdateee.org', date: '08/31/2023'}, // need this from end point
        {id: '3241', email: 'https://vegdsweb.gmail.com', date: '08/27/2023'}, {id: '3224', email: 'https://ffuppdateee.google.org', date: '08/22/2023'},
        {id: '33224', email: 'https://ffuppdateee.gmail.org', date: '08/25/2023'}, {id: '32424', email: 'https://ffuppdateee.gmail.org', date: '08/22/2023'}],
        safetyScore: 83, // need this from the extension
        phishingCount: 7 // need this from  the extension
      }
      setUserData(userObj)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
   

  // Make a simple request:
  chrome.runtime.sendMessage("ebeabnndjggpemakipldiklgjdhcchmj", null,
    function(response) {
      console.log(response)//A string of the user's id
    });
  }, [])

  const setMessage = (score: number) => {

    if(score >= 80){
      return 'Excellent!'
    } else if(score < 80 && score >= 40){
      return 'Great!'
    } else {
      return 'Poor'
    }
  }
  const setSafetyPercent = (score: number) => {
    return (score) + "%"
  } 

  const [userData, setUserData] = useState<UserDetails>()

  useEffect(() => {
    getUserDetails();
  }, [])



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
        <div className="welcome">Welcome back, {userData.name}!</div>
        <div className="jakeSection" >
          <img src={jake}  />
        </div>
        <div className="circleBackground"></div>
        <div className="bonusSection">
          <h1 className="savedYourself">You've saved yourself...</h1>
          <p className="bonus">{userData.bonus} <p className="dollarSign">$</p></p>
          <p className="bonusDescription">this month through <span className="bonusRed">safe </span>and <span className="bonusRed"> responsible </span> web browsing</p>

        </div>
      </div>
      <div className="scoreSection">
        <div className='scoreSection-header'>Here is your cyber activity this month</div>
        <div className='cyberScoreSection'>
          <div className='cyberScoreTitle'>Cyber Score</div>
          <div className='whiteWidget'>
              <div className='sliderSection'>
                <Slider val={userData.safetyScore} text={'random'} />
                <div className='score'>{setSafetyPercent(userData.safetyScore)}</div>
                <div className='scoreSentiment'>{setMessage(userData.safetyScore)}</div>
              </div>
          </div>
        </div>
        <div className='phishingEmailSection'>
          <div className='phishingEmailSectionTitle'>Phishing</div>
          <div className='whiteWidget'></div>
        </div>
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
