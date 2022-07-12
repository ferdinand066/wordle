
type Character = {
    logo: string,
    className: string,
    size: number    
};

export type { Character };
export default function initializeCharacter(): {[key: string]: Character} {
    const characters: string[] = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    let characterLists : {[key: string]: Character} = {};

    Array.from(characters[0]).forEach(character => {
        characterLists[character] = {
            logo: character,
            className: 'keys',
            size: 2
        };
    })

    characterLists[''] = {
        logo: '',
        className: 'keys no-border',
        size: 1
    };

    Array.from(characters[1]).forEach(character => {
        characterLists[character] = {
            logo: character,
            className: 'keys',
            size: 2
        };
    })

    characterLists['Enter'] = {
        logo: 'Enter',
        className: 'keys',
        size: 3
    }

    Array.from(characters[2]).forEach(character => {
        characterLists[character] = {
            logo: character,
            className: 'keys',
            size: 2
        };
    })

    characterLists['Backspace'] = {
        logo: '⌫',
        className: 'keys',
        size: 3
    }

    return characterLists;
}