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
        <div className='menu__list'>
            {tagsList}
        </div>
    )
}

export default TagsList;