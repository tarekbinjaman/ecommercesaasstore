// themes/grocery/src/index.tsx
import { DesignPackage } from '@/_contracts/src/design-package'
import Layout from './Layout'
import Home from '../pages/Home'
import { ProductPage } from '../pages/ProductPage'
import ProductDetail from '../pages/ProductDetail'
import CategoryPage from '../pages/CategoryPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import Login from '../pages/Login'
import BestProducts from '../pages/BestProducts'
import FlashSale from '../pages/Flash-Sale'

const design: DesignPackage = {
  Layout,
  pages: {
    Home,
    ProductPage,
    ProductDetail,
    CategoryPage,
    CartPage,
    CheckoutPage,
    Login,
    BestProducts,
    FlashSale
  },
  routes: {
    '':                  'Home',
    'products':          'ProductPage',
    'products/:slug':      'ProductDetail',
    'categories':        'CategoryPage',
    'categories/:slug':  'CategoryPage',
    'cart':              'CartPage',
    'checkout':          'CheckoutPage',
    'login-reg':         'Login',
    'best-products':     'BestProducts',
    'flash-sale':        'FlashSale',
  },
}

export default design