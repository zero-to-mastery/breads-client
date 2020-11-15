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
            active: 'secondary'
        }
    }

    handleClick = e => {
        this.setState({
            [e.target.name]: this.state[e.target.name] === 'secondary' ? 'primary' : 'secondary'
        });
    }

    render() {
        const { mostRecentTags, topTags } = this.props;
        const { active } = this.state;
        
        let visibleTags = active === 'primary' ? mostRecentTags : topTags;

        return (
            <Card username={'Top Tags'}>
                <button onClick={this.handleClick} className={`button button--${active}`} name='active'>Most Recent</button>
                <TagsList tags={visibleTags} />
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