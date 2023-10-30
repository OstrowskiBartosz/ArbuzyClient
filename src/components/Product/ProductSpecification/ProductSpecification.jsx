import React from 'react';

const ProductSpecification = ({ productData }) => {
  return (
    <div id="productSpecification" className="mt-5 mb-5 text-center">
      <h1>Pełna specyfikacja</h1>

      <div className="row justify-content-center mt-5">
        <div className="col-auto">
          <span className="text-center fw-bold fs-4 mb-5">Dane produktu</span>
          <table className="table table-striped table-hover table-bordered m-auto">
            <tbody>
              <tr>
                <td className="text-right w-50 align-middle pr-3">Pełna nazwa produktu:</td>
                <td className="text-left w-50 align-middle pl-3 fw-bold">
                  <span>
                    {productData.Manufacturer.manufacturerName} {productData.productName}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="text-right w-50 align-middle pr-3">Nazwa modelu:</td>
                <td className="text-left w-50 align-middle pl-3 fw-bold">
                  <span>{productData.productName.replace(/\(([^)]+)\)/g, '')}</span>
                </td>
              </tr>
              <tr>
                <td className="text-right w-50 align-middle pr-3">Producent:</td>
                <td className="text-left w-50 align-middle pl-3 fw-bold">
                  <span>{productData.Manufacturer.manufacturerName}</span>
                </td>
              </tr>
              <tr>
                <td className="text-right w-50 align-middle pr-3">Kod produktu producenta:</td>
                <td className="text-left w-50 align-middle pl-3 fw-bold">
                  <span>{productData.productName.match(/\(([^)]+)\)/g)}</span>
                </td>
              </tr>
              <tr>
                <td className="text-right w-50 align-middle pr-3">Kategoria produktu:</td>
                <td className="text-left  w-50 align-middle pl-3 fw-bold">
                  <span>{productData.Category.categoryName}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-auto">
          <span className="text-center fw-bold fs-4 mb-5">Specyfikacje produktu</span>
          <table className="table table-striped table-hover table-bordered">
            <tbody>
              {productData.Attributes.map((attribute, index) => {
                return Number(attribute.type) === 1 ? (
                  <tr key={index}>
                    <td className="text-right w-50 align-middle pr-3">{attribute.property + ':'}</td>
                    <td className="text-left w-50 align-middle pl-3 fw-bold">
                      {attribute.value} {productData.Attributes[index].property.match(/\[(.*)\]/g)}
                    </td>
                  </tr>
                ) : null;
              })}

              {productData.Attributes.map((attribute, index) => {
                return Number(attribute.type) === 0 ? (
                  <tr key={index}>
                    <td className="text-right w-50 align-middle pr-3">{attribute.property + ':'}</td>
                    <td className="text-left w-50 align-middle pl-3 fw-bold">
                      {attribute.value} {productData.Attributes[index].property.match(/\[(.*)\]/g)}
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecification;
