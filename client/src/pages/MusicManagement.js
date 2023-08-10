import React, { useState, useEffect } from 'react';

function MusicManagement() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/music-admin')
            .then(response => response.json())
            .then(receivedData => setData(receivedData));
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div key={data._id}>
                {data.message}
            </div>
        </div>
    );
}

export default MusicManagement;
