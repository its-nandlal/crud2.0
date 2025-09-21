"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { CategoryBox} from "./CategoryBox";
import { BrandBox} from "./BrandBox";
import { createProduct } from "@/actions/product.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

export default function CreateBox() {


    const [formData, setFormData] = useState({
        name: "",
        stock: 1,
        price: 1,
        category: "",
        brand: "",
        model: "",
        userId: "",
        imageUrl: ""

    })

    const handleChange = (field: string, value: string | number) => {
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await createProduct(formData)
        toast.success("New product created succesFully")

      } catch (error) {
        console.error("Error creating new product", error)
        toast.error("Error creating new product" + (error instanceof Error ? `: ${error.message}` : ""))
      }

    }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="font-semibold scale-y-[1.1] cursor-pointer">New Product</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 space-y-5">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="category">Category</Label>
              <CategoryBox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-col gap-3">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                type="text"
                placeholder="Enter Model"
                value={formData.model}
                onChange={(e) => handleChange("model",e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="brand">Brand</Label>
              <BrandBox 
                value={formData.brand}
                onChange={(val) => handleChange("brand", val)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="flex flex-col gap-3">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>



          {/*Image Upload*/}
          <div className="py-5">
          <ImageUpload
            value={formData.imageUrl}
            onChange={(url) => {
              handleChange("imageUrl", url);
            }}
          />
          </div>
        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction type="submit" className="cursor-pointer">Create Product</AlertDialogAction>
        </AlertDialogFooter>
        </form>

       </AlertDialogContent>
    </AlertDialog>
  );
}
