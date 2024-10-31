import React from 'react';
import './ControlPanel.css';

function ControlPanel({ onMotorOn, onMotorOff }) {
    return (
        <div className="control-panel">
            <h2>Control Panel (In case of manual Control)</h2>
            <button className="control-button on" onClick={onMotorOn}>
                Turn Motor On
            </button>
            <button className="control-button off" onClick={onMotorOff}>
                Turn Motor Off
            </button>
        </div>
    );
}

export default ControlPanel;
