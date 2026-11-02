// themes/marketplace/src/index.tsx
import { DesignPackage } from '@/_contracts/src/design-package'
import Home from '../pages/Home'
import { ProductPage } from '../pages/ProductPage'
import Layout from './Layout'
import ProductDetail from '../pages/ProductDetail'
import CategoryPage from '../pages/CategoryPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import Login from '../pages/Login'
import FlashSale from '../pages/FlashSale'
import BestProducts from '../pages/BestProducts'

const design: DesignPackage = {
  Layout,
  pages: {
    Home,
    ProductList: ProductPage,
    ProductDetail,
    CategoryList: CategoryPage,
    Cart: CartPage,
    Checkout: CheckoutPage,
    Login: Login,
    FlashSale,
    BestProducts,
  },
  routes: {
    '':                  'Home',
    'products':          'ProductList',
    'productDetail/:slug':      'ProductDetail',
    'categories':        'CategoryList',
    'categories/:slug':  'CategoryList',
    'cart':              'Cart',
    'checkout':          'Checkout',
    'login':             'Login',
    'flash-sale':        'FlashSale',
    'best-products':     'BestProducts',
  },
}

export default design