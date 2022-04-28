import React from "react";

function Pagination({ pageNumber, setCurrentPage }) {
  return (
    <nav>
      {pageNumber.map((e) => (
        <button key={e} onClick={() => setCurrentPage(e)}>
          {e}
        </button>
      ))}
    </nav>
  );
}

export default Pagination;
