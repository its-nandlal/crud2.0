

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { CategoryBox } from './CategoryBox';


interface Props {
   searchTerm: string;
   setSerachTerm: (value: string) => void;
   selectedCategory: string;
   setSelectedCategory: (value: string) => void;
}

export default function SearchProduct({
  searchTerm,
  setSerachTerm, 
  selectedCategory, 
  setSelectedCategory
  } : Props) {


  return (
    <div className='w-full flex items-center gap-4'>
        <div className="relative max-w--sm w-full">
          <Input
          value={searchTerm}
          onChange={(e) => setSerachTerm(e.target.value)}
          placeholder="Search product..."
          className="pl-10" />

          <Search className=" absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        <CategoryBox value={selectedCategory} onChange={(val) => setSelectedCategory(val)} />

    </div>
  )
}
