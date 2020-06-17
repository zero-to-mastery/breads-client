import React from 'react';
import DefaultImage from '../images/white-background.png';

const UserImage = props => {
    return (
        <img
            src={props.image || DefaultImage}
            alt={props.username}
            className={props.class}
            height={props.height ? props.height : undefined}
            width={props.width ? props.width : undefined}
        />
    )
}

export default UserImage;