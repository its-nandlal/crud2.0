import { getProductById } from '@/actions/product.action'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeftToLine } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Product = Awaited<ReturnType<typeof getProductById>>


interface ProductPageProps {
  params: {slug: string}
}

const page: React.FC<ProductPageProps> = async (props: { params: {slug: string} }) => {

  const { params } = await Promise.resolve(props)

  const [id] = params.slug.split("--")
  const [product]: Product = await getProductById(id)

  return (
    <div className='w-full relative pt-28 px-5 md:px-10 flex max-lg:flex-col gap-4'>

      <Link href="/user/products" className=' absolute left-5 md:left-10 top-8 bg-zinc-300/20 backdrop-blur-md border border-zinc-100/40 p-3 rounded-lg'><ArrowLeftToLine /></Link>

      <div className='w-full lg:w-1/3 h-[400px] xl:h-[600px] rounded-lg overflow-hidden'>
        <img
          src={product?.imageUrl || ""}
          alt={product.name}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex flex-col gap-8 xl:scale-[1.3] xl:ml-24 xl:mt-24'>
        <div className='flex gap-8'>
        <div className='flex flex-col gap-2'>
        <Label className='pl-1'>Name</Label>
        <Input value={product.name} />
        </div>

        <div className='flex flex-col gap-2'>
        <Label className='pl-1'>Category</Label>
        <Input value={product.category} />
        </div>
        </div>

        <div className='flex gap-8'>
        <div className='flex flex-col gap-2'>
        <Label className='pl-1'>Model</Label>
        <Input value={product.model} />
        </div>

        <div className='flex flex-col gap-2'>
        <Label className='pl-1'>Brand</Label>
        <Input value={product.brand} />
        </div>
        </div>

        <div className='flex gap-8'>
        <div className='flex flex-col gap-2'>
        <Label className='pl-1'>Price</Label>
        <Input value={product.price} />
        </div>

        <div className='flex flex-col gap-2'>
        <Label className='pl-1'>Stock</Label>
        <Input value={product.stock} />
        </div>
        </div>

        <div className='flex flex-col gap-2'>
          <Label className='pl-1'>Created At</Label>
          <Input value={product.createdAt ? new Date(product.createdAt).toDateString() : 'N/A'}/>
        </div>


      </div>
    </div>
  )
}

export default page