import styles from './Rules.module.css';
import Line from './Line';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Rules(){
    const [gameStart, setGameStart] = useState(false);


    return (
        !gameStart ? <div className={ styles.rules }> 
            <div className={ styles.overlay } onClick={ () => setGameStart(true) }></div>
            <div className={ styles['rules-container'] }>
                <div className={ styles.title }>
                    <span>Guess the <b>WORDLE</b> in six tries</span>
                    <FontAwesomeIcon icon={ faX } onClick={ () => setGameStart(true) } className={ styles.pointer }/>
                </div>
                <span>Each guess must be a valid five-letter word. Hit the enter button to submit.</span>
                <span>After each guess, the color of the tiles will change to show how close your guess was to the word.</span>
                <div className={ styles['border-line'] }></div>
                <span><b>Examples</b></span>
                <div></div>
                <Line solution={ 'which' } attempWord={ 'weary' } isExample={ true }/>
                <span>The letter <b>W</b> is in the word and in the correct spot.</span>
                <div></div>
                <Line solution={ 'which' } attempWord={ 'pills' } isExample={ true }/>
                <span>The letter <b>I</b> is in the word and in the wrong spot.</span>
                <div></div>
                <Line solution={ 'which' } attempWord={ 'vague' } isExample={ false }/>
                <span>All letters are not in the word.</span>
            </div>
        </div> : <div></div>
    )
}