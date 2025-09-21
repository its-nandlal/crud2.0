"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { UploadCloud, XIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
}

export default function ImageUpload({onChange, value}: ImageUploadProps) {


  if(value) {
    return (
      <div className="relative size-40">
        <img src={value} 
        alt="Upload" 
        className="rounded-md w-full h-full object-cover"/>

        <Button
        className=""
        onClick={() => onChange("")}
        type="button">
          <XIcon className="w-4 h-4 cursor-pointer" />
        </Button>
      </div>

    )
  }

  return (
    <div className=" relative w-fit flex px-4 items-center justify-center  rounded-md overflow-hidden cursor-pointer">
        <div className=" absolute top-0 left-1/2 -translate-x-1/2 z-[2]  w-full h-full flex flex-col items-center justify-center bg-zinc-300 opacity-[1] pointer-events-none">
        <UploadCloud className="text-2xl" />
        <p className="text-sm">max size-4MB</p>
        </div>
      <UploadButton
        endpoint="postImage"
        onClientUploadComplete={(res) => {
            toast.success("File uploaded succesfully")
          if(res && res[0]?.ufsUrl){
            onChange(res[0].ufsUrl)
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}