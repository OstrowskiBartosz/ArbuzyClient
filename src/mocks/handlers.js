import { rest } from 'msw';
import {
  mainPageProducts,
  cartItems3Items,
  profileInvoiceList,
  profielUserData,
  InvoiceItems3Items,
  searchHintsProductsWithB,
  searchHintsCategoriesWithB,
  searchHintsManufacturersWithB,
  searchHintsProductsWithBar,
  searchHintsCategoriesWithBar,
  searchHintsManufacturersWithBar
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
    return res(ctx.json({ data: [], message: 'Not logged.' }));
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
    const cartItems = JSON.parse(JSON.stringify(cartItems3Items));
    const cartItemsLength = cartItems.cartItemsData.length;
    return res(ctx.json({ data: { numberOfProducts: cartItemsLength }, message: 'No cart.' }));
  }),
  rest.get(`${process.env.REACT_APP_API}/cart`, (req, res, ctx) => {
    const cartItems = JSON.parse(JSON.stringify(cartItems3Items));
    return res(ctx.json({ data: cartItems, message: 'No cart.' }));
  }),
  rest.put(`${process.env.REACT_APP_API}/cartitem/:cartItemID/:operationSign`, (req, res, ctx) => {
    const { cartItemID } = req.params;
    const { operationSign } = req.params;
    const cartItems = JSON.parse(JSON.stringify(cartItems3Items));
    const index = cartItems.cartItemsData.find((el) => el.Product.cartItemID === cartItemID);
    const price = cartItems.cartItemsData[index].Prices[0].grossPrice;
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
    return res(ctx.json({ data: cartItems, message: 'Success' }));
  }),

  rest.delete(`${process.env.REACT_APP_API}/cartitem/:cartItemID`, (req, res, ctx) => {
    const { cartItemID } = req.params;
    const cartItems = JSON.parse(JSON.stringify(cartItems3Items));
    const index = cartItems.cartItemsData.find((el) => el.Product.cartItemID === cartItemID);
    const quantity = cartItems.cartItemsData[index].quantity;
    cartItems.slice(index);
    cartItems.cartData.totalQuantityofProducts -= quantity;
    cartItems.cartData.numberOfProducts -= 1;
    return res(ctx.json({ data: cartItems, message: 'Success' }));
  }),
  rest.delete(`${process.env.REACT_APP_API}/cart/:cartID`, (req, res, ctx) => {
    const { cartID } = req.params;
    const cartItems = JSON.parse(JSON.stringify(cartItems3Items));
    if (cartID === 4) {
      cartItems.cartData = null;
      cartItems.cartItemsData = [];
      return res(ctx.json({ data: { cartData: null, cartItemsData: [] }, message: 'Success' }));
    }
  }),

  // PROFILE
  rest.get(`${process.env.REACT_APP_API}/invoice`, (req, res, ctx) => {
    return res(ctx.json({ data: profileInvoiceList, message: 'Success' }));
  }),
  rest.get(`${process.env.REACT_APP_API}/user`, (req, res, ctx) => {
    const editedUserData = sessionStorage.getItem('profielUserData');
    if (editedUserData) {
      return res(ctx.json({ data: editedUserData, message: 'Successfully user retrieved data.' }));
    }
    return res(ctx.json({ data: profielUserData, message: 'Successfully user retrieved data.' }));
  }),
  rest.put(`${process.env.REACT_APP_API}/user`, async (req, res, ctx) => {
    sessionStorage.setItem('profielUserData', await JSON.stringify(req.json()));
    return res(ctx.json({ data: profielUserData, message: 'Successfully user retrieved data.' }));
  }),
  rest.delete(`${process.env.REACT_APP_API}/user`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),

  // INVOICE
  rest.get(`${process.env.REACT_APP_API}/invoice/:invoiceID`, (req, res, ctx) => {
    const { invoiceID } = req.params;
    if (invoiceID === '4') {
      const InvoiceItems = JSON.parse(JSON.stringify(InvoiceItems3Items));
      return res(ctx.json({ data: InvoiceItems, message: 'Success' }));
    }
  }),
  rest.put(`${process.env.REACT_APP_API}/invoice/:invoiceID`, (req, res, ctx) => {
    const { invoiceID } = req.params;
    if (invoiceID === '4') {
      const InvoiceItems = JSON.parse(JSON.stringify(InvoiceItems3Items));
      InvoiceItems[0].status = 'Cancelled';
      return res(ctx.json({ data: InvoiceItems, message: 'Success' }));
    }
  }),

  // SEARCHHINTS
  rest.get(`${process.env.REACT_APP_API}/product/productName/:productName`, (req, res, ctx) => {
    const { productName } = req.params;
    if (productName === 'b') {
      return res(ctx.json({ data: searchHintsProductsWithB, message: 'Product retrieved.' }));
    } else if (productName === 'bar') {
      return res(ctx.json({ data: searchHintsProductsWithBar, message: 'Product retrieved.' }));
    } else {
      ctx.json({ data: [], message: 'Product retrieved.' });
    }
  }),
  rest.get(`${process.env.REACT_APP_API}/category/categoryName/:categoryName`, (req, res, ctx) => {
    const { categoryName } = req.params;
    if (categoryName === 'b') {
      return res(ctx.json({ data: searchHintsCategoriesWithB, message: 'Category retrieved.' }));
    } else if (categoryName === 'bar') {
      return res(ctx.json({ data: searchHintsCategoriesWithBar, message: 'Category retrieved.' }));
    } else {
      ctx.json({ data: [], message: 'Category retrieved.' });
    }
  }),
  rest.get(
    `${process.env.REACT_APP_API}/manufacturer/manufacturerName/:manufacturerName`,
    (req, res, ctx) => {
      const { manufacturerName } = req.params;
      if (manufacturerName === 'b') {
        return res(
          ctx.json({ data: searchHintsManufacturersWithB, message: 'Manufacturer retrieved.' })
        );
      } else if (manufacturerName === 'bar') {
        return res(
          ctx.json({ data: searchHintsManufacturersWithBar, message: 'Manufacturer retrieved.' })
        );
      } else {
        ctx.json({ data: [], message: 'Manufacturer retrieved.' });
      }
    }
  ),

  // SEARCHRESULTS DOKONCZYC
  rest.get(`${process.env.REACT_APP_API}/product/productName/:productName`, (req, res, ctx) => {
    const { productName } = req.params;
    if (productName === 'b') {
      return res(ctx.json({ data: searchHintsProductsWithB, message: 'Product retrieved.' }));
    } else if (productName === 'bar') {
      return res(ctx.json({ data: searchHintsProductsWithBar, message: 'Product retrieved.' }));
    } else {
      ctx.json({ data: [], message: 'Product retrieved.' });
    }
  })
];

//  const productId = req.url.searchParams.get('id')
//  const { userId } = req.params
