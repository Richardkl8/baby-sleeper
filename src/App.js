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
    setShouldSleepOn('rechts');
    setSleptOn('links')
    setTimeStamp();
  }

  const onRightPress = () => {
    setIsRightDisabled(true);
    setIsLeftDisabled(false);
    setShouldSleepOn('links');
    setSleptOn('rechts')
    setTimeStamp();
  }

  const setTimeStamp = () => {
    const time = new Intl.DateTimeFormat("nl", {
      timeStyle: "short",
    });
    setTime(time.format(Date.now()))
  }

  return (
      <div>
        <div>
          <h1>test</h1>
          <p>Ze sliep {sleptOn}</p>
          <p>Ze moet {shouldSleepOn} liggen</p>
          <p>Aangepast op: {time}</p>
        </div>

        <div>
          <button onClick={onLeftPress}>
            <p>Links</p>
          </button>
          <button onClick={onRightPress}>
            <p>Rechts</p>
          </button>
        </div>
      </div>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#2D1E2F',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//
//   },
//   text: {
//     padding: 10,
//     color: '#F7B32B',
//     fontSize: '25px'
//   },
//   buttonContainer: {
//     display: "flex",
//     flexDirection: "row"
//   },
//   button: {
//     alignItems: 'center',
//     margin: 10,
//     width: 150,
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     backgroundColor: '#547AA5',
//   },
//   buttonText: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: 'bold',
//     letterSpacing: 0.25,
//     color: 'white',
//   },
// });

