"use client";

import { MapPin, PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/contexts/search-context";
import { useCallback } from "react";
import debounce from "lodash/debounce";
import { LogoutButton } from "./auth/logout-button";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    e.target.value = value;
    debouncedSearch(value);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <MapPin className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline-block">PropertyFinder</span>
        </Link>

        <div className="flex flex-1 items-center justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by location, price, or features..."
              className="w-full pl-9 pr-4 bg-background rounded-full border-muted-foreground/20"
              defaultValue={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/form">
            <Button><PlusCircle /> Add Property</Button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;