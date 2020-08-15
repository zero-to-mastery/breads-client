import React from 'react';
import { connect } from 'react-redux';
import Card from '../../../common/Card';
import TagsList from './TagsList';
import { getMostRecentTags } from '../selectors';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TagsAside = ({ loading, tags }) => {
    return (
        <Card>
            <h4 className='card-title'>Tags</h4>
            {/* {loading.isLoading && loading.id.includes('tags')
                ? <FontAwesomeIcon icon='spinner' pulse/>
                : {tagsList}
            } */}
            <TagsList tags={tags}/>
        </Card>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        tags: getMostRecentTags(state),
        loading: state.loading
    }
}

export default connect(mapStateToProps)(TagsAside);