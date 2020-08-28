import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import modals from '../../modals';

class Tags extends Component {
    
    handleClick = () => {
        this.props.addModal('form', {'reading': this.props.reading})
    }

    render() {
        const { currentUser, reading, tag_names } = this.props;

        return (
            <>
                <p className='btn text-primary m-2 text-nowrap overflow-auto-horizontal'>
                    {currentUser.id === reading.reader && 
                        <FontAwesomeIcon onClick={this.handleClick} icon='plus' size='sm' data-toggle='modal' data-target='#exampleModal'/>
                    }  
                    <small> {tag_names}</small>
                </p>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { ...modals.actions })(Tags);