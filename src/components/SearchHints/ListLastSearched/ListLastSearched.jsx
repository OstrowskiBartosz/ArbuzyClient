import React from 'react';
import { Link } from 'react-router-dom';

const ListLastSearched = ({ data, hideHints, removeLastSearched }) => {
  return (
    <table className="w-100">
      <thead>
        <tr>
          <th>Ostatnio szukane:</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 5).map((searchTerm, index) => (
          <tr key={index}>
            <td>
              <Link
                to={searchTerm.url}
                onClick={() => hideHints(searchTerm.value, searchTerm.url, searchTerm.isProduct)}>
                <i className="fa fa-search pr-1"></i>
                {searchTerm.value}
              </Link>
              <i
                className="fa fa-times float-right mr-2 pt-1 lastSearchedCross"
                title="Remove last search value"
                onClick={() => removeLastSearched(searchTerm.url)}></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListLastSearched;
