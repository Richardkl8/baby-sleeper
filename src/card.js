import React, {useEffect, useMemo, useRef} from 'react';
import './card.css';
import baby from './sleeping.png'

export default function Card({earSide, shouldSleepOn, timeStamp, removeSleep, id}) {

    const EAR_SIDE = {
        'linker': 'left',
        'rechter': 'right'
    }

    return (
        <div className={`card ${EAR_SIDE[earSide]}`}>
            <div>
                <img className={`${EAR_SIDE[earSide] === 'right' ? 'invert' : ''}`} src={baby} alt="sleep"/>
            </div>
            <div>
                <p>ze sliep: {earSide}</p>
                <p>ze moet: {shouldSleepOn}</p>
                <p>{timeStamp}</p>
            </div>
            <button className="card-button" onClick={() => removeSleep(id)}></button>
        </div>
    )
}