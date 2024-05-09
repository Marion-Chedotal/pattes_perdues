import React from "react";
import "./Pagination.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  numOfTotalPages,
  prevPageHandle,
  nextPageHandle,
}) => {
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  return (
    <div className="pagination d-flex align-items-center justify-content-center">
      <span onClick={prevPageHandle}>{'<'}</span>
      <p>
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${currentPage === page ? "active" : ""}`}
          >
            {page}
          </span>
        ))}
      </p>
      <span onClick={nextPageHandle}>{'>'}</span>
    </div>
  );
};

export default Pagination;
