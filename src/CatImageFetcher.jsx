import React, { useState } from 'react';

const CatImageFetcher = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const fetchCatImages = async () => {
    setLoading(true); 
    setError(null); 

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5'); 
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json(); 
      setData(result); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <button onClick={fetchCatImages}>Fetch Cat Images</button>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
        {data.map((cat, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <img src={cat.url} alt="cat" style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatImageFetcher;
