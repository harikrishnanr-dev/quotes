import React, { useEffect, useState } from 'react';
import { fetchQuote } from './Api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const handleFetchQuote = async () => {
    const data = await fetchQuote(); // Fetch the quote from API
    setQuote(data.quote);
    setAuthor(data.author);
  };

  // Copy quote and author to clipboard
  const handleCopy = () => {
    const textToCopy = `${quote} - ${author}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success('Quote copied to clipboard!');     
  };

  // WhatsApp share
  const handleShareToWhatsapp = () => {
    const message = encodeURIComponent(`${quote} - ${author}`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, '_blank'); // Open WhatsApp link in a new tab
  };

  useEffect(() => {
    handleFetchQuote();
  }, []);
  return (
    <div className="bg-gray-800">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-2/4 p-10 bg-white rounded-md shadow-xl">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl sriracha-regular text-center">
              {quote ? `"${quote}"` : 'Loading...'}
            </h1>
            <p className="mt-3 text-lg text-gray-600 caveat-regular text-right">
              {author && <div>- {author}</div>}
            </p>
            <div className="mt-5 flex items-center justify-center gap-x-6 text-2xl text-red-600 hover:text-blue-600">
              <FontAwesomeIcon icon={faRefresh} onClick={handleFetchQuote} />
              <FontAwesomeIcon icon={faCopy} onClick={handleCopy} style={{ color: 'gray' }} />
              <FontAwesomeIcon icon={faWhatsapp} onClick={handleShareToWhatsapp} style={{ color: 'green' }} />
            </div>
          </div>
        </div>

      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;






