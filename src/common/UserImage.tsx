import React from 'react';
import DefaultImage from '../images/white-background.png';

interface UserImageProps {
    image: string | undefined,
    username: string,
    className: string,
    height?: string,
    width?: string
}

const UserImage: React.FunctionComponent<UserImageProps> = ({image, username, className, height, width}) => {
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