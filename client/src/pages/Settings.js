import React, { useState, useEffect } from 'react';

function Settings() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/settings')
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

export default Settings;
