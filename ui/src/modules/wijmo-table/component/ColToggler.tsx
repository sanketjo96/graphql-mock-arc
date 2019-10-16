import * as React from 'react';
import * as wjcInput from '@grapecity/wijmo.react.input';
export interface ColTogglerProps {
    initListBox: any, 
    toggle: any
}

const ColToggler: React.SFC<ColTogglerProps> = ({initListBox, toggle}) => {
    return (
        <React.Fragment>
            <button className='column-picker-icon' onClick={toggle}>Column Selector</button>
            <div className="column-picker-div">
                <wjcInput.ListBox className="column-picker" initialized={initListBox}>
                </wjcInput.ListBox>
            </div>
        </React.Fragment>
    );
}

export default ColToggler;