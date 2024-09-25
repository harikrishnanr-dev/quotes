export const fetchQuote = async () => {
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      const data = await res.json();
      return data; // Returns the fetched data
    } catch (error) {
      console.error('Error fetching the quote:', error);
      return { quote: 'Could not fetch a quote. Please try again.', author: '' };
    }
  };
  