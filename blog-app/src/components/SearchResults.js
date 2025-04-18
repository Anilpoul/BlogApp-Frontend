import React, { useEffect, useState } from 'react';
import { searchPosts } from '../services/api';
import BlogList from '../components/BlogList';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();

    const query = new URLSearchParams(location.search).get('keyword');
    const postsPerPage = 5;

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const data = await searchPosts(query, currentPage - 1, postsPerPage); // Pass current page and posts per page
                setResults(data.content || []);
                setTotalPages(data.totalPages || 1); // Set the total number of pages
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query, currentPage]); // Fetch results when query or currentPage changes

    return (
        <div className="container mt-4">
            <h3>Search Results for "{query}"</h3>

            {/* Pass the results, pagination data, and loading state to BlogList */}
            <BlogList
                posts={results}
                loading={loading}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage} // Pass setter function to handle page change
                selectedCategory={null}
            />
        </div>
    );
};

export default SearchResults;
