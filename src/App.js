import React from 'react';
import './App.css';

import {useState} from "react";

export default function App() {
    const [sleptOn, setSleptOn] = useState('Selecteer...');
    const [shouldSleepOn, setShouldSleepOn] = useState('');
    const [time, setTime] = useState('');

    const [isLeftDisabled, setIsLeftDisabled] = useState(false);
    const [isRightDisabled, setIsRightDisabled] = useState(false);

    const onLeftPress = () => {
        setIsRightDisabled(false);
        setIsLeftDisabled(true);
        setShouldSleepOn('rechter');
        setSleptOn('linker')
        setTimeStamp();
    }

    const onRightPress = () => {
        setIsRightDisabled(true);
        setIsLeftDisabled(false);
        setShouldSleepOn('linker');
        setSleptOn('rechter')
        setTimeStamp();
    }

    const setTimeStamp = () => {
        const time = new Intl.DateTimeFormat("nl", {
            timeStyle: "short",
        });
        setTime(time.format(Date.now()))
    }

    return (
        <div className="container">
            <div>
                <h3>Jackie lag op haar <span className="accent">{sleptOn}</span> oor</h3>
                <h3>Jackie moet op haar <span className="accent">{shouldSleepOn}</span> oor liggen</h3>
                <h3>Aangepast op: <span className="accent">{time}</span> </h3>
            </div>

            <div>
                <h3>Ik leg Jackie nu op welk oor:</h3>
                <div className="button-container">

                    <button className={`${isLeftDisabled ? 'disabled' : ''}`} onClick={onLeftPress}>
                        <span>Links</span>
                    </button>
                    <button className={`${isRightDisabled ? 'disabled' : ''}`} onClick={onRightPress}>
                        <span>Rechts</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


