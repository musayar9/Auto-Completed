import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const data = [
  {
    id: 1,
    title: 'test 1',
  },

  {
    id: 2,
    title: 'test 2',
  },

  {
    id: 3,
    title: 'test 3',
  },

  {
    id: 4,
    title: 'test 4',
  },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(false);
  const searchRef = useRef();
  const isTyping = search.replace(/\s+/, '').length > 0;

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    console.log(e);
    //tıkladpım elemen search div değil ise setSearch boş değerre çek
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearch('');
    }
  };
  useEffect(() => {
    /**burada search değişiğ ddeişmediğne bakacağiz */
    if (isTyping) {
      //buradakiler benim yazdığımı içeriyorsa filtreleyeceğim
      const filteredResult = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setResult(filteredResult.length ? filteredResult : false);
    } else {
      //search boş veya değişiyorda set resultu boşa çek
      setResult(false);
    }
  }, [search]);
  return (
    <>
      <div className="search" ref={searchRef}>
        <input
          className={isTyping ? 'typing' : null}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="birşeyler Ara"
        />
        {isTyping && (
          <div className="search-result">
            {result &&
              result.map((item) => (
                <div key={item.id} className="search-result-item">
                  {item.title}
                </div>
              ))}
          </div>
        )}

        {!result && (
          <div
            className={`${(!isTyping && 'result-not-found') || 'result-found'}`}
          >
            "{search}" ile ilgili birşey bulunmadı{' '}
          </div>
        )}
      </div>
    </>
  );
}
