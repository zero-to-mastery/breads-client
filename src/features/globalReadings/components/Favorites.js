import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { markFavorite, unfavorite } from '../actions';


class Favorites extends Component {
    
    handleClick = () => {
        this.props.favorite === null ? this.props.markFavorite(this.props.id) : this.props.unfavorite(this.props.id);
    }

    render() {
        const { currentUser, reader, favorite } = this.props;

        return (
            <>
                {currentUser.id === reader && (
                    favorite
                        ? <p onClick={this.handleClick} className='btn text-muted m-2'>
                            <FontAwesomeIcon icon='bookmark'/>
                        </p>
                        : <p onClick={this.handleClick} className='btn text-muted m-2'>
                            <FontAwesomeIcon icon={['far', 'bookmark']}/>
                        </p>
                )}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser.user
    }
}

export default connect(mapStateToProps, { markFavorite, unfavorite })(Favorites);