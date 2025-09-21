import { deleteProduct } from "@/actions/product.action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/lib/generated/prisma";


import {
  Copy,
  EllipsisVertical,
  ExternalLink,
  Eye,
  IdCard,
  Link,
  Pickaxe,
  SquareUserRound,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProductActionProps {
    product: Product;
    productURL: string;
}

export default function ProductAction({product, productURL}: ProductActionProps) {

    const router = useRouter()

    const handleDelete = async () => {
        try {
            await deleteProduct(product.id)
            toast.success("Product Deleted SuccesFully")
        } catch (error) {
            console.error("Product not deleted", error )
            toast.error("Product not deleted" + error)
        }
    }

    const handleCopy = async (type: string) => {
  try {
    let textToCopy = "";
    
    if (type === "name") {
      textToCopy = product.name;
    } 
    
    else if (type === "id") {
      textToCopy = product.id;
    }
    else if (type === "link") {
      textToCopy = productURL
    }
    
    await navigator.clipboard.writeText(textToCopy);
    
    // Success toast show karo
    toast.success(`Product ${type} copied to clipboard!`);
    
  } catch (error) {
    console.error("Failed to copy:", error);
    toast.error(`Failed to copy ${type}`);
  }
    };


  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2">
        <DropdownMenuItem onClick={() => router.push(productURL)}>
          <Eye className="mr-1" /> Open product details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
                <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Pickaxe className="mr-3 size-4 text-muted-foreground" />
            Actions
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={handleDelete} variant="destructive">
                <Trash2 />
                Delete Product
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Copy className="mr-3 size-4 text-muted-foreground" />
            Copy
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleCopy("name")}> <SquareUserRound /> Copy name</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCopy("id")}> <IdCard /> Copy id</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleCopy("link")}> <Link /> Copy link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem
          onClick={() => window.open(productURL, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink className="mr-1" /> Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </>
  );
}
