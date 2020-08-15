import React from 'react';
import { connect } from 'react-redux';
import { getTagById } from '../selectors';

const TagItem = ({ tag, key }) => {    
    return (
        <li className='card-text list-group-item' key={key}>
            #{tag.tag_name}
        </li>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        tag: getTagById(state, ownProps.id)
    }
}

export default connect(mapStateToProps)(TagItem);