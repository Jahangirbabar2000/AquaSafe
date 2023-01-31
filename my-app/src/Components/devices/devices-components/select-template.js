import React, { useState, useEffect } from 'react';

const Templates = () => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetch('device-templates.json')
            .then(res => res.json())
            .then(data => setOptions(data.options))
            .catch(err => console.error(err));
    }, []);

    return (
        <form>
            {options.map(option => (
                <div key={option.id}>
                    <input type="radio" id={option.id} name="options" value={option.value} />
                    <label htmlFor={option.id}>{option.label}</label>
                </div>
            ))}
        </form>
    );
};

export default Templates;
