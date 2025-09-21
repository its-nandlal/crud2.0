"use client"

import Link from 'next/link'
import { Home, Package, User, Settings, ShoppingBag } from "lucide-react";
import { useEffect, useState } from 'react';


export default function DashBordNave() {


  const [nBg, setNBg] = useState(0)

    useEffect(() => {
    const savedPosition = localStorage.getItem('navPosition')
    if (savedPosition !== null) {
      setNBg(parseInt(savedPosition))
    }
  }, [])

  // Custom function to update state and localStorage
  const updateNavPosition = (newPosition: number) => {
    setNBg(newPosition)
    localStorage.setItem('navPosition', newPosition.toString())
  }


    const navegater = [
        {nText: "Home", nLink: "/user", icon: Home,},
        {nText: "All Products", nLink: "/user/products", icon: Package,},
        {nText: "Profile", nLink: "/user/profile", icon: User,},
        {nText: "Settings", nLink: "/user/settings", icon: Settings,},
    ]


  return (
    <div className='w-fit h-screen border-r bg-card'>
      <div className="w-14 md:w-48 ">
          <div className="p-4 border-b max-md:opacity-0">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Dashboard
            </h2>
          </div>
      <div className='relative w-full h-fit flex flex-col  md:p-2 md:pl-4'>
        <div
          className={`w-[95%] h-12 absolute right-0 z-[0] bg-zinc-400/20 backdrop-blur-md border border-zinc-200/10 [box-shadow:inset,"0px","0px", "5px", "0px", "#bdbdbd17"] px-4 py-3 max-md:mt-3.5 md:mt-2 rounded-l-2xl ease-in-out duration-300`}
          style={{ top: `${nBg}%` }}
        >

        </div>
          {navegater.map((n, index) => (
        <Link 
        onClick={()=> updateNavPosition(index * 23)}
        key={index} 
        href={n.nLink} 
        className={`relative z-[2] w-full flex items-center justify-start gap-3 px-4 py-3 text-white mix-blend-difference ${index === 0 && 'bg-red-900/0'} max-md:mt-3`}>
            <n.icon className="h-5 w-5 text-white mix-blend-difference" />
            <p className='hidden md:inline-block'>
            {n.nText}
            </p>
        </Link>
          ))}

      </div>
      </div>
    </div>
  )
}



