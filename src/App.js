import React, {useEffect} from 'react';
import './App.css';

import {useState} from "react";
import {getDatabase, onValue, ref, set} from "firebase/database";

export default function App() {
    const db = getDatabase();

    const [sleptOn, setSleptOn] = useState('');
    const [shouldSleepOn, setShouldSleepOn] = useState('');
    const [time, setTime] = useState('');

    const [isLeftDisabled, setIsLeftDisabled] = useState(false);
    const [isRightDisabled, setIsRightDisabled] = useState(false);

    const EAR_SIDE = {
        'LEFT': 'linker',
        'RIGHT': 'rechter'
    }


    const getEarSide = () => {
        const earSideRef = ref(db, 'sleeps');
        onValue(earSideRef, (snapshot) => {
            const {earSide, timeStamp} = snapshot.val();
            setSleptOn(earSide)
            setShouldSleepOn(earSide === EAR_SIDE.LEFT ? EAR_SIDE.RIGHT : EAR_SIDE.LEFT);
            setTime(timeStamp)
        });
    }

    const setEarSide = async (earSide) => {
        const time = new Intl.DateTimeFormat("nl", {
            timeStyle: "short",
        });
        await set(ref(db, 'sleeps/timeStamp'), time.format(Date.now()));
        await set(ref(db, 'sleeps/earSide'), earSide);

    }

    useEffect(() => {
        getEarSide();
    })

    return (
        <div className="container">
            <div>
                <h3>Jackie lag op haar <span className="accent">{sleptOn}</span> oor</h3>
                <h3>Jackie moet op haar <span className="accent">{shouldSleepOn}</span> oor liggen</h3>
                <h3>Aangepast op: <span className="accent">{time}</span></h3>
            </div>

            <div>
                <h3>Ik leg Jackie nu op welk oor:</h3>
                <div className="button-container">

                    <button className={`${isLeftDisabled ? 'disabled' : ''}`}
                            onClick={() => setEarSide(EAR_SIDE.LEFT)}>
                        <span>Links</span>
                    </button>
                    <button className={`${isRightDisabled ? 'disabled' : ''}`}
                            onClick={() => setEarSide(EAR_SIDE.RIGHT)}>
                        <span>Rechts</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


