export default function Keyboard({ characterLists, handleKeyInput } : any){
    function triggerKeydown(key: string){
        handleKeyInput(new KeyboardEvent('keydown', { key: key }));
    }

    return (
        <div className="keyboard">
            {
                Object.keys(characterLists).map((key, index) => {
                    return (
                      <div className={ characterLists[key].className } key={ key } style={{ gridColumn: `span ${ characterLists[key].size} / span ${ characterLists[key].size}` }}  onClick={ () => triggerKeydown(key) }>{ characterLists[key].logo }</div>
                    )
                })
            }
        </div>
    )
}