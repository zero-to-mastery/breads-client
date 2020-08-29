import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../../../common/Card';
import TagsList from './TagsList';
import { getMostRecentTags, getTopTags } from '../selectors';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TagsAside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRecent: ''
        }
    }

    handleClick = e => {
        this.setState({
            [e.target.name]: this.state[e.target.name] === 'active' ? '' : 'active'
        });
    }

    render() {
        const { mostRecentTags, topTags } = this.props;
        const { activeRecent } = this.state;
        
        let visibleTags = activeRecent === 'active' ? mostRecentTags : topTags;

        return (
            <Card>
                <div className='row pl-3 pr-3'>
                    <h4 className='card-title mr-auto'>Top Tags</h4>
                    <button onClick={this.handleClick} className={`btn btn-outline-primary btn-sm ${activeRecent}`} name='activeRecent'>Most Recent</button>
                </div>
                {/* {loading.isLoading && loading.id.includes('tags')
                    ? <FontAwesomeIcon icon='spinner' pulse/>
                    : {tagsList}
                } */}
                <TagsList tags={visibleTags}/>
            </Card>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        mostRecentTags: getMostRecentTags(state, ownProps.list, ownProps.user_id),
        topTags: getTopTags(state, ownProps.list, ownProps.user_id),
        loading: state.loading
    }
}

export default connect(mapStateToProps)(TagsAside);