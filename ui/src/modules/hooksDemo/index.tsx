import * as React from 'react';
import ImageGalHookComp from "./TestCompo";

export interface HookDemoProps {
    
}
 
const HookDemo: React.SFC<HookDemoProps> = () => {
    return (  
        <React.Fragment>
            <ImageGalHookComp></ImageGalHookComp>
        </React.Fragment>    
    );
}
 
export default HookDemo;