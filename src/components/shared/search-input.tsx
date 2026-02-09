"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "~/components/ui";
import { useDebouncedValue } from "~/hooks/use-debounced-value";

const SEARCH_DEBOUNCE_MS = 300;

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [term, setTerm] = useState(
    searchParams.get("search")?.toString() ?? "",
  );
  const debouncedTerm = useDebouncedValue(term, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedTerm) {
      params.set("search", debouncedTerm);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [debouncedTerm, pathname, replace, searchParams]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="absolute left-2 top-2/4 size-4 -translate-y-2/4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search posts..."
        className="w-full rounded-lg bg-background pl-8"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
