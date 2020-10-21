import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeUserReading } from '../actions';
import { RootState } from '../../rootReducer';

type DeleteProps = PropsFromRedux & {
    reader: any
    id: any
}

class Delete extends Component<DeleteProps> {
    
    handleClick = () => {
        this.props.removeUserReading(this.props.reader, this.props.id);
    }

    render() {
        const { currentUser, reader } = this.props;

        return (
            <>
                {currentUser.id === reader && 
                    <p onClick={this.handleClick} className='btn text-danger m-2 delete'>
                        <FontAwesomeIcon icon={['far', 'trash-alt']}/>
                    </p>
                }
            </>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser.user
    }
}

const connector = connect(mapStateToProps, { removeUserReading });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Delete);