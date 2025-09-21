"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/generated/prisma";
import ProductAction from "./ProductAction";
import EditProduct from "./EditProduct";
import { useRouter } from "next/navigation";


interface ShowProductsProps {
    products: Product[]
}

export default function ShowProducts({products}: ShowProductsProps) {

  const router = useRouter()

  return (
    <div className="grid w-full [&>div]:max-h-[300px] [&>div]:border [&>div]:rounded">
      <Table>
        <TableHeader>
          <TableRow className="*:whitespace-nowrap">
            <TableHead className="pl-4">ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Price (INR)</TableHead>
            <TableHead>Stock Quantity</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-hidden">
          {products.toReversed().map((product) => {

            const slugifiedName = product.name.toLocaleLowerCase().replace(/\s+/g, '-')
            const slug = `${product.id}--${slugifiedName}`
            const productURL = `/user/products/${slug}`

            return (
            <TableRow
              key={product.id}
              onClick={() => router.push(productURL)}
              className={` *:whitespace-nowrap ${product.stock > 5 ? 'odd:bg-muted/50': 'bg-red-600/70 hover:bg-red-600/80' } ease-in-out duration-200`}
            >
              <TableCell className="pl-4">{product.id}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.model}</TableCell>
              <TableCell>₹{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {product.createdAt
                  ? new Date(product.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell 
              className="flex gap-2 opacity-[.8]" 
              onClick={(e) => e.stopPropagation()}>
                <div className="-ml-4">
                <EditProduct product={product} />
                </div>
                <ProductAction product={product} productURL={productURL}/>
              </TableCell>

            </TableRow>
            )
           })}
        </TableBody>
      </Table>

    </div>

  );
}
