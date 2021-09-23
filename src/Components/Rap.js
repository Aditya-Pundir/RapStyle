import React, { useState, useEffect } from "react";
import "../Style/Rap.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function getLastWord(words) {
  var n = words.split(" ");
  return n[n.length - 1];
}

const Rap = () => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [rhymes, setRhymes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening, handleListen]);

  useEffect(() => {
    let lastWord = getLastWord(text);
    fetch(`https://api.datamuse.com/words?rel_rhy=${lastWord}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRhymes(data);
      });
  }, [text]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setText(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  return (
    <>
      <div className="branding">
        <img id="logo" src="/logo.png" alt="logo" />
        <h1 id="RapStyle">RapStyle</h1>
      </div>

      <div className="container">
        <button
          id="startStop"
          onClick={() => setIsListening((prevState) => !prevState)}
        >
          {isListening ? "Stop" : "Start"}
        </button>
        <p id="rhymes">
          {rhymes.map((rhyme) => {
            return rhyme.word + ", ";
          })}
        </p>
        <p id="text">{text}</p>
      </div>
    </>
  );
};

export default Rap;
