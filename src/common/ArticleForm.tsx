import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import globalReadings from '../features/globalReadings';
import tags from '../features/tags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RootState } from '../features/rootReducer';

type IProps = PropsFromRedux & {
    history: any
}

type IState = {
    url: string,
    tags: string
}

class ArticleForm extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            url: '',
            tags: ''

        }
    }
    /**
     * @todo Need to update since I can't figure out computed property names in TypeScript
     * @see {@link https://stackoverflow.com/questions/44110641/typescript-a-computed-property-name-in-a-type-literal-must-directly-refer-to-a-b}
     */
     
    
    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const name = e.currentTarget.name;
        
        if (name === 'url') {
            this.setState({
                url: e.currentTarget.value
            });
        } else {
            this.setState({
                tags: e.currentTarget.value
            });
        }
    };
    
    
    handleNewUrl = (e: React.FormEvent<HTMLFormElement>): void => {
      
   
        e.preventDefault();
     
        this.props.postNewReading(this.state.url, this.state.tags);
        this.setState({ url: '', tags: '' });
        let path = this.props.history.location.pathname;
        
        if (path === '/') {
            setTimeout(() => {
                this.props.fetchTags('global');
                this.props.fetchReadings('global');
            }, 7500);
        } else if (path !== '/subscriptions') {
            setTimeout(() => {
                this.props.fetchTags(this.props.currentUser, this.props.currentUser);
                this.props.fetchReadings(null, this.props.currentUser);
            }, 7500);
        }
    };

    render() {
        const { url, tags } = this.state;
        const { loading } = this.props;

        return (
            <div className='card-demo pb-1'>
                <div className='card'>
                    <form onSubmit={this.handleNewUrl} autoComplete='off'>
                        <div className='card__body'>
                            <input
                                type='text'
                                className='form-input'
                                id='url'
                                name='url'
                                onChange={this.handleChange}
                                placeholder='Paste article url here'
                                value={url}
                                required
                            />

                            <input
                                type='text'
                                className='form-input'
                                id='tags'
                                name='tags'
                                onChange={this.handleChange}
                                placeholder='add tags (optional)'
                                value={tags}
                            />
                        </div>
                        <div className='card__footer'>
                            <small>
                                Separate tags with '#'. (e.g. #fun #learning)
                            </small>
                            <button type='submit' className='button button--block button--secondary'>
                                {loading.isLoading 
                                    ? <FontAwesomeIcon icon='spinner' pulse/>
                                    : <FontAwesomeIcon icon='plus'/>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: RootState) {
    return {
        currentUser: state.currentUser.user.id,
        loading: state.loading
    }
}

const connector = connect(mapStateToProps, { ...globalReadings.actions, ...tags.actions });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ArticleForm);