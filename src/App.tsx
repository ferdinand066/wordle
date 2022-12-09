import { useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";
import Line from "./components/Line";
import initializeCharacter, { Character } from "./model/Character";
import Keyboard from "./components/Keyboard";
import { ReactNotifications, Store } from "react-notifications-component";
import "animate.css";
import "react-notifications-component/dist/theme.css";
import "./rnc-info.css";
import Rules from "./components/Rules";
import WordDefinition from "./components/WordDefinition";
import words from "./data/data";

function App() {
  const [solution, setSolution] = useState("");
  const [wordList, setWordList] = useState([] as any[]);
  const [currentTryWord, setCurrentTryWord] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [attempWords, setAttempWords] = useState(Array(6).fill(null));
  const [characterLists, setCharacterLists] = useState(
    {} as { [key: string]: Character }
  );
  const [notificationList, setNotificationList] = useState([] as string[]);

  function getCurrentIndex(word: string) {
    return word === null;
  }

  function handleKeyInput(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (currentTryWord.length !== 5) return;
      if (
        !wordList.includes(currentTryWord) ||
        attempWords.includes(currentTryWord)
      ) {
        const notificationId = Store.addNotification({
          title: "",
          message: !wordList.includes(currentTryWord)
            ? "Not in word list!"
            : "You cannot try the same words!",
          type: "info",
          container: "top-center",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],

          dismiss: {
            duration: 1500,
            showIcon: true,
            onScreen: true,
          },

          onRemoval: (id: string, removalFlag: string) => {
            const newNotificationList = [...notificationList];
            const index = newNotificationList.indexOf(id);
            newNotificationList.splice(index, 1);
            setNotificationList(newNotificationList);
          },
        });

        const newNotificationList = [...notificationList];
        newNotificationList.push(notificationId);
        setNotificationList(newNotificationList);

        return;
      }

      const index = attempWords.findIndex(getCurrentIndex);

      const oldAttempWords = [...attempWords];
      oldAttempWords[index] = currentTryWord;

      const letterLists = Array.from(currentTryWord);
      const statusList = ["true", "wrong"];

      for (let i = 0; i < letterLists.length; i++) {
        if (
          statusList.some((status) => {
            return characterLists[letterLists[i]].className.includes(status);
          })
        )
          continue;

        if (solution.charAt(i) === letterLists[i]) {
          if (characterLists[letterLists[i]].className.includes(" miss")) {
            characterLists[letterLists[i]].className = "keys";
          }
          characterLists[letterLists[i]].className += " true";
        } else if (solution.includes(letterLists[i])) {
          characterLists[letterLists[i]].className += " miss";
        } else {
          characterLists[letterLists[i]].className += " wrong";
        }
      }

      setAttempWords(oldAttempWords);
      setCurrentTryWord("");

      if (currentTryWord === solution) {
        setGameOver(true);
        setIsWin(true);
        return;
      }

      if (index === 5) {
        setGameOver(true);
        return;
      }
      return;
    } else if (event.key === "Backspace") {
      setCurrentTryWord(currentTryWord.slice(0, -1));
    }

    if (event.key.match(/^[a-zA-Z]{1}$/) && currentTryWord.length < 5) {
      if (event.key.match(/^[A-Z]{1}$/)) {
        setCurrentTryWord(currentTryWord + event.key.toLowerCase());
      } else {
        setCurrentTryWord(currentTryWord + event.key);
      }
    }
  }

  useEffect(() => {
    if (gameOver) return;

    window.addEventListener("keydown", handleKeyInput);

    return () => window.removeEventListener("keydown", handleKeyInput);
  }, [currentTryWord]);

  useEffect(() => {
    async function getData() {
      const data = words;
      setWordList(data);
    }

    getData();
    setCharacterLists(initializeCharacter());
  }, []);

  useEffect(() => {
    if (wordList.length === 0) return;
    async function checkValidWord(){
      let isValid = false;
      while (!isValid){
        try {
          const tempWord = wordList[Math.floor(Math.random() * wordList.length)];
          await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${ tempWord }`
          );
          isValid = true;
          setSolution(tempWord);
        } catch(e) {
          console.log(e)
        }
      }


    }

    checkValidWord();
  }, [wordList]);

  return (
    <div className={styles.App}>
      <div className={styles["word-container"]}>
        {attempWords.map((attempWord, i) => {
          return (
            <Line
              key={i}
              solution={solution}
              attempWord={
                attempWords.findIndex(getCurrentIndex) === i
                  ? currentTryWord
                  : attempWord ?? ""
              }
              isCurrent={attempWords.findIndex(getCurrentIndex) === i}
              parentClass={
                attempWords.findIndex(getCurrentIndex) === i &&
                notificationList.length > 0
                  ? "animate__animated animate__headShake"
                  : attempWords.indexOf(solution) === i
                  ? " animate__animated animate__tada animate__delay-2s"
                  : ""
              }
            />
          );
        })}
      </div>
      { solution }
      <Keyboard
        characterLists={characterLists}
        handleKeyInput={handleKeyInput}
        gameOver={gameOver}
      />
      <Rules />
      {gameOver && <WordDefinition solution={solution} isWin={isWin} />}
      <ReactNotifications />
    </div>
  );
}

export default App;
