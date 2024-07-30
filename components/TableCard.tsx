"use client";

import { ReactNode } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";

type Props = {
  data: Data | undefined | null;
  loading: boolean;
  inputPlaceholder: string;
  headers: any;
  search: string;
  setSearch: Function;
  page: number;
  setPage: Function;
  sort: SortProps | undefined;
  setSort: Function;
  noData: ReactNode;
  parentPath: string;
};

type Data = {
  docs: any[];
  pageCount: number;
  docCount: number;
};

export type SortProps = {
  key: string;
  order: "asc" | "desc";
};

export type Header = {
  label: string;
  display: Function;
  sortKey: string;
};

export function TableCard({
  data,
  loading,
  search,
  setSearch,
  page,
  setPage,
  sort,
  setSort,
  inputPlaceholder,
  headers,
  noData,
  parentPath,
}: Props) {
  function PaginationItems({
    totalPages,
    offset,
  }: {
    totalPages: number;
    offset: number;
  }) {
    const maxPaginationItems = 10;
    let x = Math.min(totalPages, maxPaginationItems);
    let y = offset;
    if (y > totalPages - x) y = totalPages - x + 1;

    if (x === maxPaginationItems && y == offset) x = maxPaginationItems - 1;

    const repetitions = new Array(x - y).fill(null);

    return (
      <>
        {offset > 0 && (
          <>
            <PaginationItem className="cursor-pointer">
              <PaginationLink onClick={() => setPage(1)} isActive={page === 1}>
                {1}
              </PaginationLink>
            </PaginationItem>
            {offset > 1 && <p>...</p>}
          </>
        )}
        {repetitions.map((_, id) => (
          <PaginationItem className="cursor-pointer" key={id}>
            <PaginationLink
              onClick={() => setPage(y + id + 1)}
              isActive={page === y + id + 1}
            >
              {y + id + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > x + y && y == offset && (
          <>
            <p>...</p>
            <PaginationItem className="cursor-pointer">
              <PaginationLink
                onClick={() => setPage(totalPages)}
                isActive={page === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="items-center min-w-0 px-4 flex-row flex w-full h-10 rounded-md border border-input text-sm disabled:cursor-not-allowed disabled:opacity-50">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          className="w-full placeholder:text-muted-foreground bg-transparent h-10 px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-0"
          placeholder={inputPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="rounded-sm hover:bg-transparent min-w-0">
            {headers &&
              headers.map((header: Header, id: number) => (
                <TableHead
                  key={id}
                  onClick={() => {
                    if (header.sortKey) {
                      if (sort?.key === header.sortKey)
                        if (sort?.order === "asc") {
                          setSort({
                            key: header.sortKey || "",
                            order: "desc",
                          });
                        } else {
                          setSort(undefined);
                        }
                      else
                        setSort({
                          key: header.sortKey || "",
                          order: "asc",
                        });
                    }
                  }}
                  className="text-xs lg:text-sm p-1 md:p-4 cursor-pointer hover:bg-muted/60 min-w-0 truncate"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <p>{header.label}</p>
                    <div className="w-4">
                      {sort &&
                        sort.key === header.sortKey &&
                        (sort?.order === "asc" ? (
                          <ArrowDown className="h-4 w-4" />
                        ) : (
                          <ArrowUp className="h-4 w-4" />
                        ))}
                    </div>
                  </div>
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="h-[50px]">
            <TableCell className="relative truncate overflow-hidden px-0.5 md:px-2 max-w-[600px]">
              <Link href={parentPath}>
                <div className="flex flex-row gap-2 items-center">
                  <p className="hidden md:block">
                    ☝️
                  </p>
                  <div className="truncate">
                    <p className="text-xs md:text-base">
                      Dossier Parent
                    </p>
                  </div>
                </div>
              </Link>
            </TableCell>
            {[...Array(headers.length - 1)].map((_, cellId) => (
              <TableCell key={cellId} className="p-1 md:p-4">-</TableCell>
            ))}
          </TableRow>
          {loading &&
            [...Array(10)].map((_, index) => (
              <TableRow key={index} className="h-[50px]">
                {[...Array(headers.length)].map((_, cellId) => (
                  <TableCell key={cellId} className="p-1 md:p-4">
                    <Skeleton className="w-full h-[20px] rounded-sm min-w-5" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!loading &&
            data &&
            data.docs.map((row, rowId) => (
              <TableRow key={rowId} className="group">
                {headers.map((_: any, cellId: number) => (
                  <TableCell
                    className="relative truncate overflow-hidden px-1 md:px-2 max-w-[200px] lg:max-w-[600px]"
                    key={cellId}
                  >
                    {headers[cellId].display && headers[cellId].display(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {!loading && data && data.docCount === 0 && (
        <div className="flex items-center w-full justify-center my-6">
          {noData}
        </div>
      )}

      {data && data?.pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className="cursor-pointer"
              onClick={() => setPage(Math.max(1, page - 1))}
            >
              <PaginationPrevious />
            </PaginationItem>
            <PaginationItems
              offset={Math.max(page - 5, 0)}
              totalPages={data?.pageCount}
            />
            <PaginationItem
              className="cursor-pointer"
              onClick={() => setPage(Math.min(data?.pageCount || 1, page + 1))}
            >
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
