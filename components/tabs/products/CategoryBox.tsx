
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

interface CategoryBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const productCategories = [
  { value: "", label: "None" },
  { value: "Mobile", label: "Mobile & Smartphones" },
  { value: "WashingMachine", label: "Washing Machine" },
  { value: "Bulb", label: "Bulbs & LED" },
  { value: "Cable", label: "Cables & Wires" },
  { value: "Television", label: "Television & TV" },
  { value: "Computer", label: "Computer & Laptop" },
  { value: "Audio", label: "Audio & Headphones" },
  { value: "KitchenAppliances", label: "Kitchen Appliances" },
  { value: "HomeAppliances", label: "Home Appliances" },
  { value: "Gaming", label: "Gaming & Consoles" },
  { value: "Camera", label: "Camera & Photography" },
  { value: "SmartDevices", label: "Smart Devices & IoT" },
  { value: "PowerBattery", label: "Power & Battery" },
  { value: "Networking", label: "Networking & Router" },
  { value: "Storage", label: "Storage & Memory" },
  { value: "AirConditioner", label: "Air Conditioner" },
  { value: "Refrigerator", label: "Refrigerator" },
  { value: "Fan", label: "Fans & Coolers" }
];

export function CategoryBox({ value, onChange }: CategoryBoxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="CategoryBox"
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
              {productCategories.map((cat) => (
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