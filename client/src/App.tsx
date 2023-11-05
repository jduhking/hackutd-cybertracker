
import './App.css'
import stateFarm from './assets/statefarm.png'
import happyJake from './assets/jakehappy.png'

function App() {

  return (
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
        </div>
      </div>
      <div className="scoreSection">

      </div>
    </div>
    </>
  )
}

export default App
