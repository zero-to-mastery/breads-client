import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateReading } from '../actions';


class Update extends Component {
    
    handleClick = () => {
        // console.log(this.props.url, this.props.id)
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

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user,
        loader: state.loading
    }
}

export default connect(mapStateToProps, { updateReading })(Update);