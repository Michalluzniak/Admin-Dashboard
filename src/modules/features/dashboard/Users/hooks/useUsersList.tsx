import { useEffect, useState } from 'react';
import { getUsers } from '../../../../../api/users';
import { UserListProps } from '../../../../../types/userTypes';

import { useSearchParams } from 'react-router-dom';

export const useUsersList = () => {
  // ERORR & LOADING
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState<string[] | string>('');
  // USERS LIST
  const [usersList, setUsersList] = useState<UserListProps[]>([]);
  // PAGINATION
  const [paginationMeta, setPaginationMeta] = useState<{ [key: string]: number }>({});
  // RESULTS PER PAGE
  const resultPerPage = 30; // repair numbers overflowing when nubmer is bigger than 99

  const { nextPage, previousPage, totalPages } = paginationMeta;

  const [searchParams, setSearchParams] = useSearchParams();

  const loadPage = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  let pageFromUrl = parseInt(searchParams.get('page') || '1');

  let currentPage = pageFromUrl >= totalPages ? totalPages : pageFromUrl;

  const getPageFromApi = async () => {
    loadPage(currentPage);
    try {
      setIsLoading(true);
      const result = await getUsers(currentPage, resultPerPage);

      setPaginationMeta(result.pagination);
      setUsersList(result.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setErrorValue(error.response.data.message);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pageFromUrl > totalPages) {
      loadPage(totalPages);
    }

    getPageFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return {
    isLoading,
    isError,
    errorValue,
    usersList,
    previousPage,
    currentPage,
    nextPage,
    loadPage,
    totalPages,
  };
};
