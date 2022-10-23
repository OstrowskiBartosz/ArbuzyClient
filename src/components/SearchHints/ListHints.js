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

const ListData = ({ data, resource, hideHints }) => {
  return data.slice(0, 5).map((dataItem, index) => (
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
  ));
};

export default ListData;
