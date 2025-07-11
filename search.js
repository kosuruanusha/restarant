// Search Functionality
document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    
    if (query === '') {
        alert('Please enter a search term');
        return;
    }
    
    // In a real app, you would send this to your server
    // For demo, we'll search the sample books array
    const results = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        alert('No books found matching your search');
    } else {
        // For demo, we'll just show an alert with the titles
        const titles = results.map(book => book.title).join('\n');
        alert(`Found ${results.length} books:\n\n${titles}`);
        
        // In a real app, you would display these results on a search results page
    }
    
    e.target.reset();
});

// Search Suggestions
const searchInput = document.getElementById('search-input');
const searchSuggestions = document.createElement('div');
searchSuggestions.className = 'search-suggestions';
searchInput.parentNode.appendChild(searchSuggestions);

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchSuggestions.innerHTML = '';
    
    if (query.length < 2) {
        searchSuggestions.style.display = 'none';
        return;
    }
    
    // Get matching books (title or author)
    const matches = books.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    ).slice(0, 5); // Limit to 5 suggestions
    
    if (matches.length > 0) {
        matches.forEach(book => {
            const suggestion = document.createElement('div');
            suggestion.className = 'search-suggestion';
            suggestion.innerHTML = `
                <img src="${book.image}" alt="${book.title}" loading="lazy">
                <div>
                    <h4>${book.title}</h4>
                    <p>${book.author}</p>
                </div>
            `;
            suggestion.addEventListener('click', () => {
                searchInput.value = book.title;
                searchSuggestions.style.display = 'none';
                // In a real app, you would navigate to the book page
                alert(`Would navigate to ${book.title} page in a real app`);
            });
            searchSuggestions.appendChild(suggestion);
        });
        searchSuggestions.style.display = 'block';
    } else {
        searchSuggestions.style.display = 'none';
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== searchInput) {
        searchSuggestions.style.display = 'none';
    }
});

// Add styles for search suggestions
const searchSuggestionStyles = document.createElement('style');
searchSuggestionStyles.textContent = `
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 0 0 4px 4px;
        box-shadow: var(--box-shadow);
        z-index: 1000;
        display: none;
    }
    
    .search-suggestion {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .search-suggestion:hover {
        background-color: var(--light-color);
    }
    
    .search-suggestion img {
        width: 40px;
        height: 60px;
        object-fit: cover;
        margin-right: 10px;
    }
    
    .search-suggestion h4 {
        font-size: 0.9rem;
        margin-bottom: 5px;
    }
    
    .search-suggestion p {
        font-size: 0.8rem;
        color: var(--gray-color);
    }
`;
document.head.appendChild(searchSuggestionStyles);