import React from 'react';

const UserAvatar = ({ className, user, avatar, width='2.2rem', height='2.2rem' }) => {
    // Function to get the user's initials
    const getInitials = (name) => {
        if (!name) return '';
        const parts = name.split(' ');
        const initials = parts.map(part => part.charAt(0).toUpperCase()).join('');
        return initials.slice(0, 2); // Return first two initials
    };

    return (
        <div className={className}>
            {
                avatar ? (
                    <img
                        src={`/storage/images/profile/${avatar}`}
                        alt="logo"
                        className="avatar p-0 rounded-circle outline-white outline"
                        style={{ height: `${height}`}}
                    />
                ) : (
                    <div
                        className="bg-gray-200 text-green-500 rounded-circle d-flex justify-content-center align-items-center p-0"
                        style={{ height: `${height}`, width: `${width}`}}
                    >
                        {getInitials(user.name)}
                    </div>
                )
            }
        </div>
    );
};

export default UserAvatar;
