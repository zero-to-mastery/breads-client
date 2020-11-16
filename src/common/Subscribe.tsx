import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import subscriptions from '../features/subscriptions';
import { RootState } from '../features/rootReducer';

const { postNewSubscription } = subscriptions.actions;

type IProps = PropsFromRedux & {
    user: any
}

class Subscribe extends Component<IProps> {
    
    handleClick = (): void => {
        this.props.postNewSubscription(this.props.user);
    }

    render() {
        const { currentUser, user } = this.props;
        return (
            <>
                {currentUser && user && currentUser !== user && 
                    <button onClick={this.handleClick} className='button button--block button--outline button--info margin-bottom--md'>
                        Subscribe
                    </button>
                }
            </>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser.user.id
    }
}

const connector = connect(mapStateToProps, { postNewSubscription });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Subscribe);