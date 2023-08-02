import React, { useState, useEffect } from 'react';
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
  const [result, setResult] = useState([]);

  const isTyping = search.replace(/\s+/, '').length > 0;
  useEffect(() => {
    /**burada search değişiğ ddeişmediğne bakacağiz */
    if (isTyping) {
      //buradakiler benim yazdığımı içeriyorsa filtreleyeceğim
      setResult(
        data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      //search boş veya değişiyorda set resultu boşa çek
      setResult([]);
    }
  }, [search]);
  return (
    <>
      <div className="search">
        <input
          className={isTyping ? 'typing' : null}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="birşeyler Ara"
        />
        {result.length > 0 ? (
          <div className="search-result">
            {result.map((item) => (
              <div key={item.id} className="search-result-item">
                {item.title}
              </div>
            ))}
          </div>
        ) : (
          <div className={`${(!search && 'try') || 'tryValue search-result'}`}>
            <div className="search-result-item">
              herhangi birr sonuç nulunmadıdi{' '}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
