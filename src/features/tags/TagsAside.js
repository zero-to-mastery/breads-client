import React from 'react';
import { connect } from 'react-redux';
import Card from '../../common/Card';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TagsAside = ({ loading, tags }) => {
    let tagsList;
    if (tags) {
        tagsList = Object.entries(tags).map(([key, value]) => {
            return <div className='card-text' key={value.tag_name}>
                        {value.tag_name}
                    </div>
        });
    }
    return (
        <Card>
            <h4 className='card-title'>Tags</h4>
            {/* {loading.isLoading && loading.id.includes('tags')
                ? <FontAwesomeIcon icon='spinner' pulse/>
                : {tagsList}
            } */}
            {tagsList}
        </Card>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        tags: state.tags,
        loading: state.loading
    }
}

export default connect(mapStateToProps)(TagsAside);