// components/tabs/products/products-tab-wrapper.tsx

import ProductsTab from './products-tab';
import getProducts from '@/actions/product.action';


export default async function ProductsTabMain() {

  const result = getProducts()
  const products =  (await result).userProducts

  return <ProductsTab products={products} />;
}
