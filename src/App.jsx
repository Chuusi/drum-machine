import { useEffect } from 'react';
import './App.css'
import { useState } from 'react';

function App() {

  const [soundText, setSoundText] = useState("")
  const [volume, setVolume] = useState(.1);
  const [toggle, setToggle] = useState(true)

  const handleSound = (event) => {
    if(!toggle || !document.getElementById(event.target.id)) return
    const span = document.createElement("span")
    span.classList.add("wave");
    
    
    const button = document.getElementById(event.target.id);
    const audio = button?.children[0];

    button.classList.add("anim");
    button.appendChild(span)
    setSoundText(event.target.value)
    audio.volume = volume
    audio.play();
    setTimeout(() =>  {
      button.classList.remove("anim"); 
      button.removeChild(button.children[1])}
    ,400)
  }
  
  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => {
      window.removeEventListener("keydown", handleKey)
    }
  },[volume, toggle])
  
  const handleKey = (event) => {
    if(!document.getElementById(event.key.toUpperCase()) || !toggle){
      setSoundText("")
      return
    }

    const span = document.createElement("span")
    span.classList.add("wave");

    const button = document.getElementById(event.key.toUpperCase());
    const audio = button.children[0];
    button.classList.add("anim");
    button.appendChild(span)
    setSoundText(document.getElementById(event.key.toUpperCase()).value)    
    audio.volume = volume
    audio.play();
    setTimeout(() =>  {
      button.classList.remove("anim");
      button.removeChild(button.children[1])}
    ,400)

  }


  const handleVolume = (event) => {
    setVolume(event.target.value/100)
  }

  const handleToggle = () => {
    setToggle(!toggle);
  }

  return (
    <main className='bg-danger'>
      <div id="drum-machine" className='container row bg-white py-3'>
        <h1 className='text-center p-2 display-4'>DRUM MACHINE</h1>
        <div id="display" className='col-lg-7 col-sm-12 p-2 mb-2'>
          <div className="row button-row">
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="Q" value="Heater 1">
              <audio className="clip" id="Q" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3">
              </audio>
                Q
            </button>
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="W" value="Heater 2">
              <audio className="clip" id="W" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3">
              </audio>
              W
            </button>
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="E" value="Heater 3">
              <audio className="clip" id="E" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3">
              </audio>
              E
            </button>
          </div>
          <div className="row button-row">
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="A" value="Heater 4">
              <audio className="clip" id="A" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3">
              </audio>
              A
            </button>
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="S" value="Clap">
              <audio className="clip" id="S" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3">
              </audio>
              S
            </button>
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="D" value="Open-HH">
              <audio className="clip" id="D" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3">
              </audio>
              D
            </button>
          </div>
          <div className="row button-row">
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="Z" value="Kick-n'-Hat">
              <audio className="clip" id="Z" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3">
              </audio>
              Z
            </button>
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="X" value="Kick">
              <audio className="clip" id="X" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3">
              </audio>
              X
            </button>
            <button className="col-3 drum-pad btn btn-danger m-1" onClick={handleSound} id="C" value="Closed-HH">
              <audio className="clip" id="C" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3">
              </audio>
              C
            </button>
          </div>
        </div>
        <div className='col-lg-5 col-sm-12 center-content control-container'>
          <div className="container power center-content">
            <p className='m-0 txt-md'>Power</p>
            <div 
              onClick={handleToggle} 
              className='toggle-btn'
              style={!toggle 
                ? {backgroundColor:"red"}
                : {backgroundColor:"green"}
              }
            >
              <div 
                className="round-black"
                style={!toggle
                  ? {left: "32px"}
                  : {left: "3px"}
                }
              >

              </div>
            </div>
          </div>
          <div className="container-fluid center-content txt-md">
            {soundText ? soundText : "Power On & Play me!"}
          </div>
          <div className="container center-content control-container my-3">
            <p className='mb-1 txt-md'>Volume {Math.floor(volume*100)}</p>
            <input className="mb-2 range" type="range" name="volume" id="volume" onChange={handleVolume} value={volume*100} min="0" max="100"/>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
