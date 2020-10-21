import React from 'react';
import UserImage from './UserImage';

interface CardProps {
    image?: string,
    username?: string,
    children: React.ReactNode
}

const Card: React.FunctionComponent<CardProps> = ({image, username, children}) => {

    function addImageTransformation(image: string): string | undefined {
        let imageURL: URL = new URL(image);
        let pathnameArray: string[] = imageURL.pathname.split('/');
        let originalPathnameArray: string[] = pathnameArray.slice();
        
        for (let i = 0; i < originalPathnameArray.length; i++) {
            if (pathnameArray[i] === 'upload') {
                pathnameArray.splice(i + 1, 0, 'w_567,h_567,c_fill,g_face');
                imageURL.pathname = pathnameArray.join('/');
                return imageURL.href;
            }
        }
    }

    let updatedImage: string | undefined;
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