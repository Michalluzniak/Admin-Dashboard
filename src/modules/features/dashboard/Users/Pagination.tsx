import { Pagination as PaginationElement, PaginationItem, PaginationLink } from 'reactstrap';
import { PaginationProps } from '../../../../types/types';

export const Pagination = ({ previousPage, currentPage, nextPage, loadPage, totalPages }: PaginationProps) => {
  const pagesArr: number[] = [];

  for (let i = 0; i <= totalPages; i++) {
    pagesArr.push(i);
  }

  let paginationStart: number;
  let paginationEnd: number;

  const PaginationRange = (currentPage: number) => {
    if (currentPage < 3) {
      paginationStart = 0;
      paginationEnd = 6;
    } else if (currentPage > totalPages - 3) {
      paginationStart = totalPages - 5;
      paginationEnd = totalPages + 1;
    } else {
      paginationStart = currentPage - 3;
      paginationEnd = currentPage + 3;
    }
  };
  PaginationRange(currentPage);

  return (
    <PaginationElement
      style={{
        position: 'absolute',
        bottom: '2%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <PaginationItem disabled={previousPage === null}>
        <PaginationLink
          first
          onClick={() => {
            loadPage(1);
          }}
        />
      </PaginationItem>
      <PaginationItem disabled={previousPage === null}>
        <PaginationLink
          previous
          onClick={() => {
            loadPage(previousPage);
          }}
        />
      </PaginationItem>
      {pagesArr.map((pageNumber) => {
        return (
          pageNumber < paginationEnd &&
          pageNumber > paginationStart && (
            <PaginationItem key={pageNumber} active={currentPage === pageNumber}>
              <PaginationLink
                onClick={() => {
                  loadPage(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          )
        );
      })}
      <PaginationItem disabled={nextPage === null}>
        <PaginationLink
          next
          onClick={() => {
            loadPage(nextPage);
          }}
        />
      </PaginationItem>
      <PaginationItem disabled={nextPage === null}>
        <PaginationLink
          last
          onClick={() => {
            loadPage(totalPages);
          }}
        />
      </PaginationItem>
    </PaginationElement>
  );
};
