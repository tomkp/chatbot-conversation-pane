import React from 'react';

import './avatar.scss';

export default ({url}) => {
    return (
        <div className="Avatar">
            <img className="avatar-image" src={url} />
        </div>
    );
}
