import React from 'react';
import UserImage from './UserImage';

const Card = ({image, username, children}) => {
    return (
        <div className='card border-secondary mb-2'>
            {image && <UserImage image={image} username={username} className='card-img-top border-bottom border-secondary'/>}
            <div className='card-body'>
                {children}
            </div>
        </div>
    )
}

export default Card;