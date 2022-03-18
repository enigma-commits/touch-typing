import React from "react";
import { generate } from "../utils/words";
import UserKeyPress from "../handle-keypress/UserKeyPress";
import { useState } from "react";
import { currentTime } from "../utils/currentTime";
const initialWords = generate();
export function Test() {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0.0);
  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState("");
  UserKeyPress((key) => {
    if (!startTime) setStartTime(currentTime());
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;
    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      if (incomingChars.charAt(0) === " ") setWordCount(wordCount + 1);
      const durationInMinutes = (currentTime() - startTime) / 60000.0;
      setWpm(((wordCount + 1) / durationInMinutes).toFixed(2));
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);
      setCurrentChar(incomingChars.charAt(0));
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(" ").length < 10) {
        updatedIncomingChars += " " + generate();
      }
      setIncomingChars(updatedIncomingChars);
    }
    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);
    //3
    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        2
      )
    );
  });
  return (
    <header className="App-header">
      <p className="Character">
        <span className="Character-out">
          {(leftPadding + outgoingChars).slice(-20)}
        </span>
        <span className="Character-current">{currentChar}</span>
        <span>{incomingChars.substr(0, 20)}</span>
      </p>
      <h2>WPM:{wpm}</h2>
      <h2>Accuracy:{accuracy}</h2>
    </header>
  );
}
