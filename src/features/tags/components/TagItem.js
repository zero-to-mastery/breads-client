import React from 'react';
import { connect } from 'react-redux';
import { getTagById } from '../selectors';

const TagItem = ({ tag, key }) => {    
    return (
        <li className='list-group-item d-flex justify-content-between align-items-center' key={key}>
            #{tag.tag_name}
            {tag.count > 1 && 
                <span className='badge badge-primary badge-pill'>{tag.count}</span>
            }
        </li>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        tag: getTagById(state, ownProps.id)
    }
}

export default connect(mapStateToProps)(TagItem);