import React from 'react';

const UserAvatar = ({ className, user }) => {
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
                user.avatar_url ? (
                    <img
                        src="/img/avatar/user.png"
                        alt="logo"
                        className="avatar p-0"
                        style={{ height: '2.2rem', borderRadius: '50%' }}
                    />
                ) : (
                    <div
                        className="bg-gray-200 text-green-500 rounded-circle d-flex justify-content-center align-items-center p-0"
                        style={{ height: '2.2rem', width: '2.2rem', padding: '0' }}
                    >
                        {getInitials(user.name)}
                    </div>
                )
            }
        </div>
    );
};

export default UserAvatar;
