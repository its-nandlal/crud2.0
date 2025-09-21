"use client"

import { AlertCircle, Package } from "lucide-react";
import SearchProduct from "./search-product";
import CreateBox from "./create-box";
import { useMemo, useState } from "react";
import type { Product } from '@/lib/generated/prisma'
import ShowProducts from "./ShowProduct";


interface ProductsListProps {
  products: Product[]
}


export default function ProductsTab({products}: ProductsListProps) {


  const [searchTerm, setSerachTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCategory === '' || p.category === selectedCategory)
      )
      ,
      
    [products, searchTerm, selectedCategory]
  );



  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <CreateBox />
      </div>


      <SearchProduct searchTerm={searchTerm} setSerachTerm={setSerachTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      

      {products &&(
        <>
          <ShowProducts products={filteredProducts} />
        </>
      )}

      {products.length === 0 && (
        <div className="w-full h-[50vh] flex items-center justify-center  opacity-[.5]">
          <div className="flex items-center justify-center px-8 py-5 bg-zinc-400/10 backdrop-blur-sm  border-2 rounded-md">
          <div className="text-[4em]">
          <Package className="h-20 w-20" />
          </div>
          <div className="bg-zinc-400/10 backdrop-blur-sm p-3 rounded-md font-bold">
          <p className="flex items-center gap-1"><AlertCircle className="w-4 h-4 font-bold bg-red-500 rounded-full"/>No Products</p>
          <p>Create a product</p>
          </div>
          </div>
        </div>
      )}






    </div>
  );
}