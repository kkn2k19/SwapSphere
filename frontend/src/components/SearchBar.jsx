import React from 'react'

const SearchBar = ({ search, setSearch, handleSearch }) => {
    return (
        <div className='w-96 flex'>
            <input
                type="text"
                value={search}
                placeholder='🔍 Search products...'
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
                className='flex-1 border border-r-0 px-4 py-2 rounded-l-lg focus:outline-orange-500'
            />
            <button
                onClick={handleSearch}
                className='bg-orange-500 hover:bg-orange-600 text-white px-5 rounded-r-lg'
            >
                🔍
            </button>
        </div>
    );
}

export default SearchBar