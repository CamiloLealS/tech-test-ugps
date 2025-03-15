const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    const handlePageChange = (page) => {
      setCurrentPage(page);
      localStorage.setItem("lastVisitedPage", page);
      window.scrollTo(0, 0);
    };
  
    const maxVisiblePages = 6;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <>
            <button className="btn-page" onClick={() => handlePageChange(1)}>«</button>
            <button className="btn-page" onClick={() => handlePageChange(currentPage - 1)}>Anterior</button>
          </>
        )}
  
        {startPage > 1 && <span>...</span>}
  
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const page = startPage + index;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`page-button ${currentPage === page ? "active" : ""}`}
            >
              {page}
            </button>
          );
        })}
  
        {endPage < totalPages && <span>...</span>}
  
        {currentPage < totalPages && (
          <>
            <button className="btn-page" onClick={() => handlePageChange(currentPage + 1)}>Siguiente</button>
            <button className="btn-page" onClick={() => handlePageChange(totalPages)}>»</button>
          </>
        )}
      </div>
    );
  };
  
  export default Pagination;
  