import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Line from './components/Line';
import initializeCharacter, { Character } from './model/Character';
import Keyboard from './components/Keyboard';




function App() {
  const [solution, setSolution] = useState('');
  const [wordList, setWordList] = useState([] as any[]);
  const [currentTryWord, setCurrentTryWord] = useState('');
  const [gameOver, setGameOver] = useState(false)
  const [attempWords, setAttempWords] = useState(Array(6).fill(null));
  const [characterLists, setCharacterLists] = useState({} as {[key: string]: Character});

  function getCurrentIndex(word: string){
    return word === null;
  }

  useEffect(() => {
    if (gameOver) return;

    window.addEventListener('keydown', handleKeyInput);

    return () => window.removeEventListener('keydown', handleKeyInput);
  }, [currentTryWord])

  function handleKeyInput(event: KeyboardEvent){
    if (event.key === 'Enter'){
      if (currentTryWord.length !== 5) return;
      if (!wordList.includes(currentTryWord)) return;

      const index = attempWords.findIndex(getCurrentIndex);

      const oldAttempWords = [...attempWords];
      oldAttempWords[index] = currentTryWord;

      const letterLists = Array.from(currentTryWord);
      const statusList = ['true', 'wrong']

      for(let i = 0; i < letterLists.length; i++){
        if (statusList.some(status => {
          return characterLists[letterLists[i]].className.includes(status);
        })) continue;

        if (solution.charAt(i) === letterLists[i]){
          if (characterLists[letterLists[i]].className.includes(' miss')){
            characterLists[letterLists[i]].className = 'keys';
          }
          characterLists[letterLists[i]].className += ' true';
        } else if (solution.includes(letterLists[i])){
          characterLists[letterLists[i]].className += ' miss';
        } else {
          characterLists[letterLists[i]].className += ' wrong';
        }
      }
      
      setAttempWords(oldAttempWords);
      setCurrentTryWord('');

      if (currentTryWord === solution){
        setGameOver(true);
        return;
      }
      return;
    } else if (event.key === 'Backspace'){
      setCurrentTryWord(currentTryWord.slice(0, -1))
    }

    if (event.key.match(/^[a-z]{1}$/) && currentTryWord.length < 5)
      setCurrentTryWord(currentTryWord + event.key)
  }

  useEffect(() => {
    async function getData(){
      const res = await axios.get('http://localhost:5000/word-list');
      const data = res.data;
      setSolution(data[Math.floor(Math.random() * data.length)]);
      setWordList(data);
    }

    getData();
    setCharacterLists(initializeCharacter());
  }, []);
  
  return (
    <div className='App'>
      <div className='words-container'>
        {
          attempWords.map((attempWord, i) => {
            return (
              <Line key={ i } solution={ solution } attempWord={ 
                (attempWords.findIndex(getCurrentIndex) === i) 
                  ? currentTryWord : (attempWord ?? '') } isCurrent={ attempWords.findIndex(getCurrentIndex) === i } />
            );
          })
        }
      </div>  
      {/* { solution } */}
      {/* { currentTryWord } */}
      <Keyboard characterLists={ characterLists } handleKeyInput={ handleKeyInput } ></Keyboard>
    </div>
  );
}

export default App;
