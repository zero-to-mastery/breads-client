import React from 'react';
import DefaultImage from '../images/white-background.png';

const UserImage = ({image, username, className, height, width}) => {
    return (
        <img
            src={image || DefaultImage}
            alt={username}
            className={className}
            height={height ? height : undefined}
            width={width ? width : undefined}
        />
    )
}

export default UserImage;