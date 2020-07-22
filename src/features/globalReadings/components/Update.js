import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateReading } from '../actions';


class Update extends Component {
    
    handleClick = () => {
        // console.log(this.props.url, this.props.id)
        this.props.updateReading(this.props.url, this.props.reading_id, this.props.user_id)
    }

    render() {
        return (
            <button onClick={this.handleClick} className='btn btn-outline-primary m-2'> Update </button>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { updateReading })(Update);