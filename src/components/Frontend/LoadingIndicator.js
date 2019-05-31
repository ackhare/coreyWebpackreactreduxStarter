import React from 'react';
import './Loading.css'

export default function LoadingIndicator(props) {

    return (
        <div className="centreBlock">
        <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    );
}
