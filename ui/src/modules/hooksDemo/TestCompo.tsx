import * as React from 'react';

const ImageGalHookComp = () => {
    const [index, setIndex] = React.useState(1);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => {
                return (index + 1) % 10;
            });
        }, 1000);

        return () => {
            clearInterval(interval)
        };
    }, [])

    return (
        <div>
            <img
                src={`https://picsum.photos/id/${index}/200/300`}
            >
            </img>
        </div>
    );
}
             
export default ImageGalHookComp;