import React from 'react';
import Digits from '../digits/digits.component';

const Hour = props => {

    const { hours } = props;
    return (
        <Digits type={ hours } />
    );
};


export default Hour;