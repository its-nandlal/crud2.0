
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

const BrandCategories = [
  { value: "", label: "None" },
  // Mobile & Smartphone Brands
  { value: "Apple", label: "Apple" },
  { value: "Samsung", label: "Samsung" },
  { value: "OnePlus", label: "OnePlus" },
  { value: "Xiaomi", label: "Xiaomi" },
  { value: "Realme", label: "Realme" },
  { value: "Oppo", label: "Oppo" },
  { value: "Vivo", label: "Vivo" },
  { value: "Google", label: "Google (Pixel)" },
  
  // Home Appliances Brands
  { value: "LG", label: "LG" },
  { value: "Whirlpool", label: "Whirlpool" },
  { value: "Bosch", label: "Bosch" },
  { value: "IFB", label: "IFB" },
  { value: "Godrej", label: "Godrej" },
  { value: "Haier", label: "Haier" },
  { value: "Panasonic", label: "Panasonic" },
  { value: "Voltas", label: "Voltas" },
  
  // Electronics & Technology Brands
  { value: "Sony", label: "Sony" },
  { value: "Dell", label: "Dell" },
  { value: "HP", label: "HP" },
  { value: "Lenovo", label: "Lenovo" },
  { value: "Asus", label: "Asus" },
  { value: "Canon", label: "Canon" },
  { value: "Nikon", label: "Nikon" },
  { value: "JBL", label: "JBL" },
  { value: "Bose", label: "Bose" },
  
  // Indian Electronic Brands
  { value: "Bajaj", label: "Bajaj" },
  { value: "Crompton", label: "Crompton" },
  { value: "Orient", label: "Orient" },
  { value: "Havells", label: "Havells" },
  { value: "Syska", label: "Syska" },
  { value: "Philips", label: "Philips" },
  { value: "V-Guard", label: "V-Guard" },
  { value: "Anchor", label: "Anchor" },
  
  // Cable & Accessories Brands
  { value: "Belkin", label: "Belkin" },
  { value: "Anker", label: "Anker" },
  { value: "AmazonBasics", label: "Amazon Basics" },
  { value: "Boat", label: "boAt" },
  { value: "Mi", label: "Mi" }
];

export function BrandBox({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {BrandCategories.map((cat) => (
                <CommandItem
                  key={cat.value}
                  value={cat.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {cat.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cat.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}