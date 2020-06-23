import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeUserReading } from '../actions';


class Delete extends Component {
    
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

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { removeUserReading })(Delete);