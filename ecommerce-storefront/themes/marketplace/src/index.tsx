// themes/marketplace/src/index.tsx
import { DesignPackage } from '@/_contracts/src/design-package'
import Home from '../pages/Home'
import { ProductPage } from '../pages/ProductPage'
import Layout from './Layout'
import ProductDetail from '../pages/ProductDetail'
import CategoryPage from '../pages/CategoryPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'

const design: DesignPackage = {
  Layout,
  pages: {
    Home,
    ProductList: ProductPage,
    ProductDetail,
    CategoryList: CategoryPage,
    Cart: CartPage,
    Checkout: CheckoutPage,
  },
  routes: {
    '':                  'Home',
    'products':          'ProductList',
    'products/:id':      'ProductDetail',
    'categories':        'CategoryList',
    'categories/:slug':  'CategoryList',
    'cart':              'Cart',
    'checkout':          'Checkout',
  },
}

export default design