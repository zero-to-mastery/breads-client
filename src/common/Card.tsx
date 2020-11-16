import React from 'react';
import { NavLink } from 'react-router-dom';
import UserImage from './UserImage';

interface CardProps {
    id?: string,
    image?: string,
    username?: string,
    followings?: string,
    followers?: string,
    children: React.ReactNode
}

const Card: React.FunctionComponent<CardProps> = ({ id, image, username, followings, followers, children }) => {

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
                            <div className='avatar__intro'>
                                <h4 className='avatar__name'>{username}</h4>
                                <NavLink exact to={`/${id}/following`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm readings-sum'>
                                    Following: {followings ? followings.length : 0}
                                </NavLink>
                                <span> </span>
                                <NavLink exact to={`/${id}/followers`} activeClassName='bg-light btn-outline-secondary' className='btn text-primary btn-sm readings-sum'>
                                    Followers: {followers ? followers.length : 0}
                                </NavLink>
                            </div>
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