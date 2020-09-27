import React from 'react';
import UserImage from './UserImage';

const Card = ({image, username, children}) => {

    function addImageTransformation(image) {
        let imageURL = new URL(image);
        let pathnameArray = imageURL.pathname.split('/');
        let originalPathnameArray = pathnameArray.slice();
        for (let i = 0; i < originalPathnameArray.length; i++) {
            if (pathnameArray[i] === 'upload') {
                pathnameArray.splice(i + 1, 0, 'w_567,h_567,c_fill,g_face');
                imageURL.pathname = pathnameArray.join('/');
                return imageURL.href;
            }
        }
    }

    let updatedImage;
    if (image) updatedImage = addImageTransformation(image);

    return (
        <div className='card border-secondary mb-2'>
            {image && <UserImage image={updatedImage} username={username} className='card-img-top border-bottom border-secondary'/>}
            <div className='card-body'>
                {children}
            </div>
        </div>
    )
}

export default Card;