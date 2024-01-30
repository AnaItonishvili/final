import React from 'react';

function Sort({ onSortChange }) {
    const handleSortChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <aside>
            <select onChange={handleSortChange} defaultValue="">
                <option value="" disabled>Sort by</option>
                <option value="title_asc">Title Ascending</option>
                <option value="title_desc">Title Descending</option>
                <option value="date_asc">Date Ascending</option>
                <option value="date_desc">Date Descending</option>
            </select>
        </aside>
    );
}

export default Sort;
