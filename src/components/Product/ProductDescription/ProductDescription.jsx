import React from 'react';
import { useState, useEffect } from 'react';

const splitProductDesc = (description) => {
  let descriptionElements = [];
  description.split('|').forEach((part, index) => {
    if (part.startsWith('http')) {
      descriptionElements[index] = <img className="img-fluid mt-2 mb-2" src={part} alt="product description" />;
    } else {
      descriptionElements[index] = <span>{part}</span>;
    }
  });
  return descriptionElements;
};

const ProductDescription = ({ rawDescription }) => {
  const [productDescription, setProductDescription] = useState([]);

  useEffect(() => {
    setProductDescription(splitProductDesc(rawDescription));
  }, [rawDescription]);

  return (
    <div id="productDescription" className="mt-5 mb-5 text-center">
      <div className="fs-1 fw-bold mb-5">
        <span>Opis produktu</span>
      </div>
      <div className="row m-bot-10 ml-3 mr-3">
        <div className="col-xl-12 mb-0 pb-0">
          {productDescription.map((part, index) => {
            if (part.type !== 'img') {
              return (
                <div className="mb-3 mt-3 text-left" key={index}>
                  {part}
                </div>
              );
            } else {
              return (
                <span className="mb-3 mt-3" key={index}>
                  {part}
                </span>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
