import { rest } from 'msw';
import {
  mainPageProducts,
  cartItems3Items,
  profileInvoiceList,
  profilelUserData,
  InvoiceItems3Items,
  hintsManufacturersWithB,
  hintsManufacturersWithBar,
  hintsCategoriesWithB,
  hintsCategoriesWithBar,
  hintsProductsWithB,
  hintsProductsWithBar,
  searchResultProducts,
  productID_13,
  productID_4
} from './resMocks';

export const handlers = [
  // REGISTER
  rest.post(`${process.env.REACT_APP_API}/user`, async (req, res, ctx) => {
    const registerData = await req.json();
    if (registerData.email === 'b.ostrowski@gmail.com' || registerData.login === 'bartek') {
      return res(ctx.json({ data: [], message: 'User with that login or email already exists.' }));
    } else {
      return res(ctx.json({ data: [], message: 'signedup' }));
    }
  }),

  // SESSION
  rest.get(`${process.env.REACT_APP_API}/session`, (req, res, ctx) => {
    return res(ctx.json({ data: [], message: 'Logged.' }));
  }),
  rest.delete(`${process.env.REACT_APP_API}/session`, (req, res, ctx) => {
    return res(ctx.json({ data: [], message: 'Logged out.' }));
  }),
  rest.post(`${process.env.REACT_APP_API}/session`, async (req, res, ctx) => {
    const loginData = await req.json();
    const { login, password } = loginData;
    if (login === 'bartek' && password === 'bartek123') {
      return res(ctx.json({ data: [], message: 'Logged.' }));
    } else {
      return res(ctx.json({ data: [], message: 'Wrong combination of login and password.' }));
    }
  }),

  // MAIN PAGE
  rest.get(`${process.env.REACT_APP_API}/product/mostBoughtCategoryProducts`, (req, res, ctx) => {
    return res(ctx.json(mainPageProducts));
  }),
  rest.get(`${process.env.REACT_APP_API}/product/mostBoughtProducts`, (req, res, ctx) => {
    return res(ctx.json(mainPageProducts));
  }),
  rest.get(`${process.env.REACT_APP_API}/product/youMayLikeThisProducts`, (req, res, ctx) => {
    return res(ctx.json(mainPageProducts));
  }),

  // CART
  rest.get(`${process.env.REACT_APP_API}/cart/getItemsNumber`, (req, res, ctx) => {
    const cartItems =
      JSON.parse(sessionStorage.getItem('cartItems')) ??
      JSON.parse(JSON.stringify(cartItems3Items));
    const cartItemsLength = cartItems.cartItemsData.length;
    return res(ctx.json({ data: { numberOfProducts: cartItemsLength }, message: 'Cart found.' }));
  }),

  rest.get(`${process.env.REACT_APP_API}/cart`, (req, res, ctx) => {
    const cartItemsEdited = sessionStorage.getItem('cartItems');
    if (cartItemsEdited) {
      return res(ctx.json({ data: JSON.parse(cartItemsEdited), message: 'Success' }));
    }
    const cartItems = JSON.parse(JSON.stringify(cartItems3Items));
    return res(ctx.json({ data: cartItems, message: 'Success' }));
  }),

  rest.put(`${process.env.REACT_APP_API}/cartitem/:cartItemID/:operationSign`, (req, res, ctx) => {
    const { cartItemID } = req.params;
    const { operationSign } = req.params;

    const cartItems =
      JSON.parse(sessionStorage.getItem('cartItems')) ??
      JSON.parse(JSON.stringify(cartItems3Items));

    const index = cartItems.cartItemsData.findIndex((el) => el.cartItemID === parseInt(cartItemID));
    const price = cartItems.cartItemsData[index].Product.Prices[0].grossPrice;
    if (operationSign === '+') {
      cartItems.cartItemsData[index].quantity++;
      cartItems.cartData.totalQuantityofProducts++;
      cartItems.cartData.totalPriceOfProducts += price;
    }
    if (operationSign === '-') {
      cartItems.cartItemsData[index].quantity--;
      cartItems.cartData.totalQuantityofProducts--;
      cartItems.cartData.totalPriceOfProducts -= price;
    }
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    return res(ctx.json({ data: cartItems, message: 'Success' }));
  }),

  rest.delete(`${process.env.REACT_APP_API}/cartitem/:cartItemID`, (req, res, ctx) => {
    const { cartItemID } = req.params;

    const cartItems =
      JSON.parse(sessionStorage.getItem('cartItems')) ??
      JSON.parse(JSON.stringify(cartItems3Items));
    const index = cartItems.cartItemsData.findIndex((el) => el.cartItemID === parseInt(cartItemID));
    const quantity = cartItems.cartItemsData[index].quantity;
    const price = cartItems.cartItemsData[index].Product.Prices[0].grossPrice;
    cartItems.cartItemsData.splice(index, 1);
    cartItems.cartData.totalQuantityofProducts -= quantity;
    cartItems.cartData.numberOfProducts -= 1;
    cartItems.cartData.totalPriceOfProducts -= quantity * price;

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    return res(ctx.json({ data: cartItems, message: 'Success' }));
  }),

  rest.delete(`${process.env.REACT_APP_API}/cart/:cartID`, (req, res, ctx) => {
    const { cartID } = req.params;
    if (parseInt(cartID) === 4) {
      const cartItems = JSON.parse(JSON.stringify(cartItems3Items));
      cartItems.cartItemsData = [];
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      cartItems.cartData.totalQuantityofProducts = 0;
      cartItems.cartData.numberOfProducts = 0;
      cartItems.cartData.totalPriceOfProducts = 0;
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      return res(ctx.json({ data: cartItems, message: 'Success' }));
    }
  }),

  // PROFILE
  rest.get(`${process.env.REACT_APP_API}/invoice`, (req, res, ctx) => {
    return res(ctx.json({ data: profileInvoiceList, message: 'Success' }));
  }),
  rest.get(`${process.env.REACT_APP_API}/user`, (req, res, ctx) => {
    const editedUserData = JSON.parse(sessionStorage.getItem('profilelUserData'));
    if (editedUserData) {
      if (editedUserData.companyName === '') editedUserData.companyName = null;
      if (editedUserData.VATNumber === '') editedUserData.VATNumber = null;
      sessionStorage.removeItem('profilelUserData');
      return res(ctx.json({ data: editedUserData, message: 'Successfully user retrieved data.' }));
    }
    return res(ctx.json({ data: profilelUserData, message: 'Successfully user retrieved data.' }));
  }),
  rest.put(`${process.env.REACT_APP_API}/user`, async (req, res, ctx) => {
    const jsonResponse = await req.json();
    sessionStorage.setItem('profilelUserData', JSON.stringify(jsonResponse));
    return res(ctx.json({ data: profilelUserData, message: 'Successfully user retrieved data.' }));
  }),
  rest.delete(`${process.env.REACT_APP_API}/user`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // INVOICE
  rest.get(`${process.env.REACT_APP_API}/invoice/:invoiceID`, (req, res, ctx) => {
    const InvoiceItemsEdited = sessionStorage.getItem('InvoiceItems');
    if (InvoiceItemsEdited) {
      sessionStorage.removeItem('InvoiceItems');
      return res(ctx.json({ data: JSON.parse(InvoiceItemsEdited), message: 'Success' }));
    }

    const InvoiceItems = JSON.parse(JSON.stringify(InvoiceItems3Items));
    return res(ctx.json({ data: InvoiceItems, message: 'Success' }));
  }),

  rest.put(`${process.env.REACT_APP_API}/invoice/:invoiceID`, (req, res, ctx) => {
    const InvoiceItems = JSON.parse(JSON.stringify(InvoiceItems3Items));
    InvoiceItems.status = 'Cancelled';
    sessionStorage.setItem('InvoiceItems', JSON.stringify(InvoiceItems));
    return res(ctx.json({ data: InvoiceItems, message: 'Success' }));
  }),

  rest.post(`${process.env.REACT_APP_API}/invoice`, (req, res, ctx) => {
    return res(ctx.json({ data: { invoiceID: 4 }, message: 'Items have been bought.' }));
  }),

  // PRODUCT
  rest.get(`${process.env.REACT_APP_API}/product/:productID`, (req, res, ctx) => {
    const { productID } = req.params;
    if (Number(productID) === 13) {
      return res(ctx.json({ data: productID_13, message: 'Product retrieved' }));
    }
    if (Number(productID) === 4) {
      return res(ctx.json({ data: productID_4, message: 'Product retrieved' }));
    }
  }),
  rest.post(`${process.env.REACT_APP_API}/cartItem`, (req, res, ctx) => {
    return res(ctx.json({ data: [], message: 'Product has been added to cart.' }));
  }),

  // SEARCHHINTS
  rest.get(`${process.env.REACT_APP_API}/product/productHints/:productName`, (req, res, ctx) => {
    const { productName } = req.params;
    if (productName === 'b') {
      return res(ctx.json({ data: hintsProductsWithB, message: 'Product hints retrieved.' }));
    } else if (productName === 'bar') {
      return res(ctx.json({ data: hintsProductsWithBar, message: 'Product hints retrieved.' }));
    } else {
      return res(ctx.json({ data: [], message: 'Product hints retrieved.' }));
    }
  }),
  rest.get(`${process.env.REACT_APP_API}/category/categoryHints/:categoryName`, (req, res, ctx) => {
    const { categoryName } = req.params;
    if (categoryName === 'b') {
      return res(ctx.json({ data: hintsCategoriesWithB, message: 'Category hints retrieved.' }));
    } else if (categoryName === 'bar') {
      return res(ctx.json({ data: hintsCategoriesWithBar, message: 'Category hints retrieved.' }));
    } else {
      ctx.json({ data: [], message: 'Category hints retrieved.' });
    }
  }),
  rest.get(
    `${process.env.REACT_APP_API}/manufacturer/manufacturerHints/:manufacturerName`,
    (req, res, ctx) => {
      const { manufacturerName } = req.params;
      if (manufacturerName === 'b') {
        return res(
          ctx.json({ data: hintsManufacturersWithB, message: 'Manufacturer hints retrieved.' })
        );
      } else if (manufacturerName === 'bar') {
        return res(
          ctx.json({
            data: hintsManufacturersWithBar,
            message: 'Manufacturer hints retrieved.'
          })
        );
      } else {
        ctx.json({ data: [], message: 'Manufacturer hints retrieved.' });
      }
    }
  )

  // SEARCHRESULTS DOKONCZYC
  // rest.get(
  //   `${process.env.REACT_APP_API}/product/productName/bar?s=domy%C5%9Blne&p=1&l=10&`,
  //   (req, res, ctx) => {
  //     return res(ctx.json({ data: searchResultProducts, message: 'Product retrieved.' }));
  //   }
  // )
];

//  const productId = req.url.searchParams.get('id')
//  const { userId } = req.params
