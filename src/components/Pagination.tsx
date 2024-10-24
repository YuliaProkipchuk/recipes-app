
interface PaginationProps {
  totalRecipes: number;
  recipesPerPage: number; 
  onPageChange: (page: number) => void; 
  currentPage:number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRecipes,
  recipesPerPage,
  onPageChange,
  currentPage
}) => {
  const totalPages = Math.ceil(totalRecipes / recipesPerPage); 

  const handlePageChange = (page: number) => {
    onPageChange(page); 
  };

  const updateNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const updatePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const pageNumbers = [];
  if (totalPages <= 10) {
   
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = 1; i <= 7; i++) {
      pageNumbers.push(i);
    }
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return (
    <div className="pagination">
      <button onClick={updatePrevPage} disabled={currentPage === 1}>
        &lt; Prev
      </button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => typeof number === 'number' && handlePageChange(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
      <button onClick={updateNextPage} disabled={currentPage === totalPages}>
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
