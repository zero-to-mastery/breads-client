import React from 'react';
import DefaultImage from '../images/white-background.png';

interface UserImageProps {
    image?: string
    username?: string
    imageSize: string
}

const UserImage: React.FunctionComponent<UserImageProps> = ({ image, username, imageSize, children }) => {
    return (
        <div className='avatar'>
            <img
                src={image || DefaultImage}
                alt={username}
                className={`avatar__photo-link avatar__photo avatar__photo--${imageSize}`}
            />
            {children}
        </div>
    )
}

export default UserImage;