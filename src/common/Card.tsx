import React from 'react';
import UserImage from './UserImage';
import UserIntro from './UserIntro';

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
        <div className='card-demo'>
            <div className='card'>
                <div className='card__header'>
                    {image 
                     ? <UserImage image={updatedImage} username={username} imageSize='xl'>
                            <UserIntro username='test'/>
                        </UserImage>
                     : <h3>{username}</h3>
                    }
                </div>
                <div className='card__footer'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Card;