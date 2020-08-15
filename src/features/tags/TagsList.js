import React from 'react';
import TagItem from './TagItem';

const TagsList = ({tags}) => {
    let tagsList;
    if (tags) {
        tagsList = tags.map((id) => {
            return <TagItem id={id} key={id}/>
        });
    }
    
    return (
        <ul className='list-group list-group-flush'>
            {tagsList}
        </ul>
    )
}

export default TagsList;