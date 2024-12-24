"use client";

import { useQueryState } from "nuqs";

import { SearchInput } from "@/components/search-input";
import { searchParser } from "@/features/ticket/search-params";

type TicketSearchInputProps = {
  placeholder: string;
};

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);
  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder={placeholder}
    />
  );
};

export { TicketSearchInput };
