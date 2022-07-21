import styles from '../App.module.css';
import lineStyles from './Line.module.css';

const TILE_SIZE = 5;

export default function Line({ solution, attempWord, isCurrent = false, parentClass = '', isExample = false } : any): JSX.Element {
    const data = [];
    const tiles : JSX.Element[] = [];

    for (let i = 0; i < TILE_SIZE; i++){
        data.push({
            className: lineStyles.tile,
            character: '',
        });
    }

    for (let i = 0; 
        i < (solution.length > TILE_SIZE ? 
            TILE_SIZE : solution.length); i++){

        if (attempWord.length - 1 < i) break;

        data[i].character = attempWord[i];
        if (isCurrent) continue;

        if (attempWord[i] === solution[i]){
            data[i].className += (' ' + styles.true);
        } else if (solution.includes(attempWord[i])){
            data[i].className += (' ' + styles.miss);
        } else if (isExample){
            continue;
        } else {
            data[i].className += (' ' + styles.wrong);
        }
    }

    for (let i = 0; i < TILE_SIZE; i++){
        tiles.push(
            <div key={ i } className={ data[i].className } 
                style={{ transitionDuration: '' + (0.5 * i) + 's' }}>
                { data[i].character }
            </div>
        )
    }

    return (
        <div className={ lineStyles.line + ' ' + parentClass }>
            {
                tiles.map(tile => {
                    return tile;
                })
            }
        </div>
    )
}