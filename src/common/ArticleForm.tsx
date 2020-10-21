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
            <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0 order-xl-1 mb-2'>
                <form onSubmit={this.handleNewUrl} autoComplete='off'>
                    {/* <label htmlFor='url'></label> */}
                    {/* <div className='input-group'> */}
                        <input
                            type='text'
                            className='form-control form-control-sm mb-2'
                            id='url'
                            name='url'
                            onChange={this.handleChange}
                            placeholder='Paste article url here'
                            value={url}
                        />
                        <input
                            type='text'
                            className='form-control form-control-sm'
                            id='tags'
                            name='tags'
                            onChange={this.handleChange}
                            placeholder='add tags (optional)'
                            value={tags}
                        />
                        <small className='form-text text-muted'>
                            Separate tags with '#'. (e.g. #fun #learning)
                        </small>
                        {/* <div className='input-group-append'> */}
                            <button type='submit' className='btn btn-outline-secondary text-primary btn-sm btn-block bg-white mt-1'>
                                {loading.isLoading 
                                // && loading.id.includes('newReading')
                                    ? <FontAwesomeIcon icon='spinner' pulse/>
                                    : <FontAwesomeIcon icon='plus'/>
                                }
                            </button>
                        {/* </div> */}
                    {/* </div> */}
                </form>
            </aside>
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