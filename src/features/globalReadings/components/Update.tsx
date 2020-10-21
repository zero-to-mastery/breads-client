import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../rootReducer';
import { updateReading } from '../actions';

type UpdateProps = PropsFromRedux & {
    url: any
    reading_id: any
    user_id: any
}

class Update extends Component<UpdateProps> {
    
    handleClick = (): void => {
        this.props.updateReading(this.props.url, this.props.reading_id, this.props.user_id);
    }

    render() {
        const { loader } = this.props;
        return (
            <>
            {/* loader goes for 11 seconds, then user can update next reading */}
            {/* need to have visual prompt to show user reading has been updated */}
                {loader.isLoading && loader.id.includes('updateReading')
                    ? <button className='btn btn-outline-secondary m-2' disabled>Update</button>
                    : <button onClick={this.handleClick} className='btn btn-outline-primary m-2'>Update</button>
                }
            </>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        loader: state.loading
    }
}

const connector = connect(mapStateToProps, { updateReading });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Update);