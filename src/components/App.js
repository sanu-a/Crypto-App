import React, { useEffect, useState } from "react";
import "../styles/App.css";
import axios from "axios";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [showCoins, setShowCoins] = useState(false);

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

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

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
      {filteredCoins.map((e) => {
        return <Coin key={e.id} e={e} />;
      })}
    </div>
  );
}

export default App;
