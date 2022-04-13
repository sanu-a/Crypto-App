import React, { useState } from "react";

const Coin = ({ e }) => {
  const [details, setDetails] = useState(false);
  return (
    <div id="container">
      <div
        className="row"
        onClick={() => {
          setDetails(!details);
        }}
      >
        <img className="img" src={e.image} />
        <span className="name-container center">
          <span className="symbol ">{e.symbol.toUpperCase()}</span>
          <span className="r-name ">{e.name}</span>
        </span>
        <span className="price center">{e.current_price} ₹</span>
        {e.price_change_percentage_24h > 0 ? (
          <span className="change center" style={{ color: "green" }}>
            +{e.price_change_percentage_24h.toFixed(3)} %
          </span>
        ) : (
          <span className="change center" style={{ color: "red" }}>
            {e.price_change_percentage_24h.toFixed(3)} %
          </span>
        )}
        <span className="high-low center">
          <span style={{ color: "green" }}>{e.high_24h}₹</span> /{" "}
          <span style={{ color: "red" }}>{e.low_24h}₹</span>
        </span>
        <span className="market-cap center">{e.market_cap}₹</span>
      </div>
      {details ? (
        <div className="details">
          <div className="detail-row">Rank : {e.market_cap_rank}</div>
          <div className="detail-row">Total Volume : {e.total_volume}</div>
          <div className="detail-row">
            Circulating Supply : {e.circulating_supply}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Coin;
