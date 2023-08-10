import React, { useState, useEffect } from 'react';

function Inbox() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/inbox')
            .then(response => response.json())
            .then(receivedData => {
                console.log(receivedData);  // Log to check the structure
                setData(receivedData);
            });
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

export default Inbox;


