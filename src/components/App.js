import React, { useEffect, useState } from "react";
import "../styles/App.css";
import axios from "axios";
import Coin from "./Coin";
import Pagination from "./Pagination";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [showCoins, setShowCoins] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        setShowCoins(true);
      });
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(filteredCoins.length / coinsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="coin-app">
      <h1 id="heading">Crypto Coins</h1>
      <div className="coin-search">
        <input
          type="text"
          className="coin-input"
          placeholder="Provide the coin name"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {showCoins ? (
        <h2 className="page-number">
          Showing Page {currentPage} of {pageNumber.length}
        </h2>
      ) : null}
      {showCoins ? (
        <div className="row">
          <span id="name" className="name">
            Name
          </span>
          <span className="price">Price</span>
          <span className="change">Change in 24h</span>
          <span className="high-low">High / Low in 24h</span>
          <span className="market-cap">Market Cap</span>
        </div>
      ) : (
        <h1>Loading Crypto Coins...</h1>
      )}
      {currentCoins.map((e) => {
        return <Coin key={e.id} e={e} />;
      })}
      <Pagination setCurrentPage={setCurrentPage} pageNumber={pageNumber} />
    </div>
  );
}

export default App;
