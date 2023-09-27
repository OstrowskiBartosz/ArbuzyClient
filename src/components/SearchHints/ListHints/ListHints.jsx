import React from 'react';
import { Link } from 'react-router-dom';

const resourceURL = (dataItem, resource) => {
  let url;
  if (resource === 'manufacturer') {
    url = `/search?filterManufacturer=[${dataItem[`${resource}ID`]}]&s=domyślne&l=10&p=1`;
  } else if (resource === 'category') {
    url = `/search?filterCategory=[${dataItem[`${resource}ID`]}]&s=domyślne&l=10&p=1`;
  } else if (resource === 'product') {
    url = `/search?q=${dataItem[`${resource}Name`]}&s=domyślne&l=10&p=1`;
  }
  return url;
};

const isProduct = (resource) => {
  if (resource === 'manufacturer') return false;
  else if (resource === 'category') return false;
  else if (resource === 'product') return true;
};

const ListHints = ({ data, resource, hideHints, searchResource }) => {
  return data?.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th>{searchResource}:</th>
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 5).map((dataItem, index) => (
          <tr key={index}>
            <td>
              <Link
                to={resourceURL(dataItem, resource)}
                onClick={() =>
                  hideHints(
                    dataItem[`${resource}Name`],
                    resourceURL(dataItem, resource),
                    isProduct(resource)
                  )
                }>
                <i className="fa fa-search pr-1"></i>
                {dataItem[`${resource}Name`]}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <table>
      <thead>
        <tr>
          <th>{searchResource}:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {searchResource === 'Produkty' ? <td>brak produktów</td> : null}
          {searchResource === 'Kategorie' ? <td>brak kategorii</td> : null}
          {searchResource === 'Producenci' ? <td>brak producentów</td> : null}
        </tr>
      </tbody>
    </table>
  );
};

export default ListHints;
