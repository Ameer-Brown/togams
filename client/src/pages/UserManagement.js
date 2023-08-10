import React, { useState, useEffect } from 'react';

function UserManagement() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/users')
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

export default UserManagement;
