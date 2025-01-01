import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const AppPagination = ({ pages, currentPage, onPageChange }) => {

  const fill = () => {
    let items = [];
    for (let i = 0; i < pages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage - 1}
          onClick={() => switchPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    return items;
  }

  const switchPage = (pageNumber) => {
    document.body.scroll(0, 0);
    if (pageNumber >= 1 && pageNumber <= pages)
      onPageChange(pageNumber);
  };

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.First disabled={currentPage === 1} onClick={() => switchPage(1)} />
        <Pagination.Prev  disabled={currentPage === 1} onClick={() => switchPage(currentPage - 1)} />
        {fill()}
        <Pagination.Next disabled={currentPage === pages} onClick={() => switchPage(currentPage + 1)} />
        <Pagination.Last disabled={currentPage === pages} onClick={() => switchPage(pages)} />
      </Pagination>
    </div>
  );
}

export default AppPagination;