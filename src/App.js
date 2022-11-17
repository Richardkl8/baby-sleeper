import React, {useEffect} from 'react';
import './App.css';
import Card from './card'

import {useState} from "react";
import {
    getDatabase,
    remove,
    ref,
    set,
    push,
    onChildAdded,
    onChildRemoved,
} from "firebase/database";

export default function App() {
    const db = getDatabase();

    const [sleeps, setSleeps] = useState([])

    const EAR_SIDE = {
        'LEFT': 'linker',
        'RIGHT': 'rechter'
    }

    const removeSleep = (id) => {
        remove(ref(db, `sleeps/${id}`))
    }


    const listenForSleepUpdates = () => {
        const earSideRef = ref(db, 'sleeps');

        onChildAdded(earSideRef, (data) => {
            const sleep = {
                earSide: data.val().earSide,
                shouldSleepOn: data.val().earSide === EAR_SIDE.LEFT ? EAR_SIDE.RIGHT : EAR_SIDE.LEFT,
                timeStamp: data.val().timeStamp,
                id: data.key
            }

            setSleeps(prevState => [sleep, ...prevState]);
        });

        onChildRemoved(earSideRef, (data) => {
            const idToRemove = data.key
            setSleeps(prevState => prevState.filter((el) => el.id !== idToRemove))
        });
    }

    const setSleep = async (earSide) => {
        const time = new Intl.DateTimeFormat("nl", {
            timeStyle: "medium",
        });
        const timeStamp = time.format(Date.now())
        const postListRef = ref(db, 'sleeps');
        const newPostRef = push(postListRef);
        await set(newPostRef, {
            earSide,
            shouldSleepOn: earSide === EAR_SIDE.LEFT ? EAR_SIDE.RIGHT : EAR_SIDE.LEFT,
            timeStamp,
        });
    }

    useEffect(() => {
        listenForSleepUpdates();
    }, [])

    return (
        <div className="container">
            <div className="card-container">
                {sleeps.map((el) => {
                    if (el.id) {
                        return <Card
                            key={el.id}
                            id={el.id}
                            removeSleep={removeSleep}
                            earSide={el.earSide}
                            timeStamp={el.timeStamp}
                            shouldSleepOn={el.shouldSleepOn}>
                        </Card>
                    }
                })}
            </div>

            <div>
                <h3>Ik leg Jackie nu op welk oor:</h3>
                <div className="button-container">
                    <button onClick={() => setSleep(EAR_SIDE.LEFT)}>
                        <span>Links</span>
                    </button>
                    <button onClick={() => setSleep(EAR_SIDE.RIGHT)}>
                        <span>Rechts</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


