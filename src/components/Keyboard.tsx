import styles from './Keyboard.module.css';
import mainStyle from '../App.module.css';

export default function Keyboard({ characterLists, handleKeyInput, gameOver } : any){
    function triggerKeydown(key: string){
        if (!gameOver)
            handleKeyInput(new KeyboardEvent('keydown', { key: key }));
    }

    function getClassName(className: string){
        const classList = className.split(' ');
        let result = "";

        classList.forEach(className => {
            if (['true', 'wrong', 'miss'].includes(className)){
                return result += (" " + mainStyle[className]);
            }
            return result += (" " + styles[className]);
        })

        return result = result.substring(1);
    }

    return (
        <div className={ styles.keyboard }>
            {
                Object.keys(characterLists).map((key, index) => {
                    console.log(characterLists[key])
                    return (
                      <div className={ getClassName(characterLists[key].className) } key={ key } style={{ gridColumn: `span ${ characterLists[key].size} / span ${ characterLists[key].size}` }}  onClick={ () => triggerKeydown(key) }>{ characterLists[key].logo }</div>
                    )
                })
            }
        </div>
    )
}