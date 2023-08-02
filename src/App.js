import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import axios from "axios";
import ContentLoader from "react-content-loader";
const data = [
  {
    id: 1,
    title: "test 1",
  },

  {
    id: 2,
    title: "test 2",
  },

  {
    id: 3,
    title: "test 3",
  },

  {
    id: 4,
    title: "test 4",
  },
];

const AotoComplete = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#ffffff"
    foregroundColor="#ecebeb"
  >
    <rect x="57" y="60" rx="2" ry="2" width="140" height="10" />
    <rect x="58" y="33" rx="2" ry="2" width="140" height="10" />
    <rect x="58" y="10" rx="2" ry="2" width="140" height="10" />
  </ContentLoader>
);

export default function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(false);
  const [loading, setLoadin] = useState(false);
  const searchRef = useRef();
  const isTyping = search.replace(/\s+/, "").length > 0;
  const [newData, setNewData] = useState([]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    console.log(e);
    //tıkladpım elemen search div değil ise setSearch boş değerre çek
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearch("");
    }
  };

  const getResultItem = (item) => {
    console.log(item);
    setSearch(item.name);
  };
  useEffect(() => {
    /**burada search değişiğ ddeişmediğne bakacağiz */

    if (isTyping) {
      setLoadin(true);
      //buradakiler benim yazdığımı içeriyorsa filtreleyeceğim
      const filteredResult = newData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

      //  const filteredResult = data.filter((item) =>
      //    item.title.toLowerCase().includes(search.toLowerCase())
      //  );
      setResult(filteredResult.length ? filteredResult : false);

      const getData = setTimeout(() => {
        axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((response) => {
            setNewData(response.data);
            setLoadin(false);
          })
          .catch((err) => console.log(err));
      }, 1000);

      return () => {
        clearTimeout(getData);
        setLoadin(false);
      };
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
          className={isTyping ? "typing" : null}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="birşeyler Ara"
        />
        {isTyping && (
          <div className="search-result">
            {result &&
              loading === false &&
              result.map((item) => (
                <div
                  onClick={() => getResultItem(item)}
                  key={item.id}
                  className="search-result-item"
                >
                  {item.name}
                  <p>{item.email}</p>
                  <p>Phone: {item.phone}</p>
                </div>
              ))}
          </div>
        )}
        {/* {loading && new Array(3).fill().map(() => <AotoComplete />)} */}
        {loading &&  <AotoComplete />}
        {!result && !loading && (
          <div
            className={`${(!isTyping && "result-not-found") || "result-found"}`}
          >
            "{search}" ile ilgili birşey bulunmadı{" "}
          </div>
        )}
      </div>
    </>
  );
}
