import React from 'react';

const Pagination = ({gamesPerPage, videogames, changePage, currentPage}) => {
  const pages = [];

  const buttonStyle = {
  backgroundImage: 'linear-gradient(15deg, #13547a 0%, #80d0c7 100%)',
    
  }

  const handlePrevious = () => {
    if(currentPage > 1) {
      changePage(currentPage-1)
    }
  }

  const handleNext = () => {
    if(currentPage >= 1) {
      changePage(currentPage+1)
    }
  }

  
  for (let i =0; i < Math.ceil(videogames.length / gamesPerPage); i++  ){
    pages.push(i+1);
  }
  return (
    <div>
      <ul>
      <li><span onClick={handlePrevious}>Previous</span></li>
        { pages && 
          pages.map(page => 
          (page === currentPage 
          ? (<li><button style={buttonStyle}>{page}</button></li>)
          : (<li><button onClick={() => changePage(page)}>{page}</button></li>))
        )}
        <li><span onClick={handleNext}>Next</span></li>
      </ul>
    </div>
  );
}

export default Pagination;
