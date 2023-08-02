import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import axios from 'axios';
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
  const [newData, setNewData] = useState([]);
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
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setNewData(response.data);
      })
      .catch((err) => console.log(err));
    if (isTyping) {
      //buradakiler benim yazdığımı içeriyorsa filtreleyeceğim
      const filteredResult = newData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

      //  const filteredResult = data.filter((item) =>
      //    item.title.toLowerCase().includes(search.toLowerCase())
      //  );
      setResult(filteredResult.length ? filteredResult : false);
    } else {
      //search boş veya değişiyorda set resultu boşa çek
      setResult(false);
    }
  }, [search]);
  console.log(newData);
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
                  {item.name}
                  <p>{item.email}</p>
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
