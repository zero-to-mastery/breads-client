import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { markFavorite, unfavorite } from '../actions';
import { RootState } from '../../rootReducer';

type FavoritesProps = PropsFromRedux & {
    favorite: any
    reader: any
    id: any
}

class Favorites extends Component<FavoritesProps> {
    
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

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser.user
    }
}

const connector = connect(mapStateToProps, { markFavorite, unfavorite });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Favorites);