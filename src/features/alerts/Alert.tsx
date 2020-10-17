import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../rootReducer';
import { removeAlert } from './actions';

type AlertProps = PropsFromRedux;

const Alert: React.FunctionComponent<AlertProps> = ({ alerts, removeAlert }) => {
    return (
        <div className={`alert alert-${alerts.type}`}>
            {alerts.message}
            <button onClick={removeAlert} className='close'>
                <span >&times;</span>
            </button>
        </div>  
    )
}

function mapStateToProps(state: RootState) {
    return {
        alerts: state.alerts
    }
}

const connector = connect(mapStateToProps, { removeAlert });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Alert);