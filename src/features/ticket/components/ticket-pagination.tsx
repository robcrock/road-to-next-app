"use client";

import { useEffect, useRef } from "react";
import { useQueryState, useQueryStates } from "nuqs";

import { Pagination } from "@/components/pagination";
import { PaginatedData } from "@/types/pagination";

import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";
import { TicketWithMetadata } from "../types";

type TicketPaginationProps = {
  paginatedTicketMetadata: PaginatedData<TicketWithMetadata>["metadata"];
};

const TicketPagination = ({
  paginatedTicketMetadata,
}: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );

  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  /*
  This useEffect is esentially listening to the search event and triggering a side effect.
  */
  useEffect(() => {
    if (search === prevSearch.current) return;
    prevSearch.current = search;

    setPagination({ ...pagination, page: 0 });

    // Add more reactive elements here when needed
  }, [search, pagination, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
};

export { TicketPagination };
