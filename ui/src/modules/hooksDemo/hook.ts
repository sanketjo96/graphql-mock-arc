import * as React from 'react';

 const UseTime = (defaultTime: number): [number, (delta: number) => void] => {
    const [time, setTime] = React.useState(defaultTime);

    const setTimeHelper = (delta: number): any => {
        setTimeout(() => {
            setTime(time + delta)
        }, 2000)
    };

    return [
        time,
        setTimeHelper
    ]

}
 
export default UseTime;