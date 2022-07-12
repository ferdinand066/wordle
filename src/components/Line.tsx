import './Line.css';

const TILE_SIZE = 5;

export default function Line({ solution, attempWord, isCurrent } : any): JSX.Element {
    const data = [];
    const tiles : JSX.Element[] = [];

    for (let i = 0; i < TILE_SIZE; i++){
        data.push({
            className: 'tile',
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
            data[i].className += ' true'
        } else if (solution.includes(attempWord[i])){
            data[i].className += ' miss'
        } else {
            data[i].className += ' wrong'
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
        <div className="line">
            {
                tiles.map(tile => {
                    return tile;
                })
            }
        </div>
    )
}