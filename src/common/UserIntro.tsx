import React from 'react';

interface UserIntroProps {
    username: string
    intro?: string
}

const UserIntro: React.FunctionComponent<UserIntroProps> = ({ username, children }) => {
    return (
        <div className='avatar__intro'>
            <h4 className='avatar__name'>{username}</h4>
            <small className='avatar__subtitle overflow-auto-horizontal'>
                {children}
            </small>
        </div>
    )
}

export default UserIntro;