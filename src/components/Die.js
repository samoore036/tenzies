import React from 'react';
import { nanoid } from 'nanoid';
import DotDiv from './DotDiv';

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? '#59e391' : 'transparent'
    }

    function getClass(value) {
        let className = '';
        switch(value) {
            case 1: className='one';
                break;
            case 2: className='two';
                break;
            case 3: className='three';
                break;
            case 4: className='four';
                break;
            case 5: className='five';
                break;
            case 6: className='six';
                break;
            default: 
        }
        return className;
    }

    const dots = new Array(props.value).fill('');

    let counter = 0;
    const dotDivs = dots.map(dot => {
        counter++
        return(
            <DotDiv
                className={getClass(counter)}
                key={nanoid()}
            />
        )
    })

    return(
        <div 
            className={`die ${getClass(props.value)}`}
            style={styles}
            onClick={() => props.holdDie(props.id)} >
            {dotDivs}
        </div>
    )
}