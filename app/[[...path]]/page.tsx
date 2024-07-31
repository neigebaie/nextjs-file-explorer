"use client";

import { SortProps, TableCard } from "@/components/TableCard";
import { formatAgo, formatSize, joinHttpPaths } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React, { useEffect, useState } from "react";

type Props = {};

type File = {
  name: string;
  path: string;
  size: number;
  type: string;
  dlCount: number;
  lastUpdate: string;
  lastDownload: string;
};

type Data = {
  docs: File[];
  pageCount: number;
  docCount: number;
};

export default function FilePage({}: Props) {
  const [filter, setFilter] = useState<string[]>([]); // unused for now
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<SortProps | undefined>();
  const [page, setPage] = useState<number>(1);

  // Files
  const [files, setFiles] = useState<Data | null>();
  const [filesLoading, setFilesLoading] = useState(true);
  const [filesError, setFilesError] = useState();

  const pathname = usePathname();

  const fileHeaders = [
    {
      label: "Nom",
      display: (file: File) => (
        <Link
          href={
            file.type === "directory"
              ? `/${file.path}`
              : joinHttpPaths(
                  `${process.env.NEXT_PUBLIC_API_URL}/files/download/`,
                  file.path
                )
          }
        >
          <div className="flex flex-row gap-2 items-center group">
            <p>
              {file.type === "directory" ? "📁" : "📄"}
            </p>
            <div className="truncate">
              <p className="text-xs md:text-base group-hover:animate-slide">
                {decodeURIComponent(file.name)}
              </p>
            </div>
          </div>
        </Link>
      ),
      sortKey: "name",
    },
    {
      label: "Taille",
      display: (file: File) => (
        <p className="text-xs md:text-base">
          {file.type === "directory" ? "-" : formatSize(file.size)}
        </p>
      ),
      sortKey: "size",
    },
    {
      label: "Type",
      display: (file: File) => (
        <p className="text-xs md:text-base">{file.type}</p>
      ),
      sortKey: "type",
    },
    {
      label: "Màj le",
      display: (file: File) => (
        <p className="text-xs md:text-base">
          {formatAgo(new Date(file.lastUpdate), "fr")}
        </p>
      ),
      sortKey: "lastUpdate",
    },
    {
      label: "Téléchargements",
      display: (file: File) => (
        <p className="text-xs md:text-base">
          {file.type === "directory" ? "-" : file.dlCount}
        </p>
      ),
      sortKey: "dlCount",
    },
  ];

  const formatFilter = (filter: string[] | undefined) => {
    if (filter && filter.length > 0) {
      return "&tag=" + filter.map((tag) => tag).join(",");
    } else {
      return "";
    }
  };

  const fetchFiles = async () => {
    // setFilesLoading(true);
    setFilesError(undefined);

    let sortString = "";
    if (sort) {
      sortString = `&sortBy=${sort?.key}&sortOrder=${sort?.order}`;
    }

    let searchString = "";
    if (search) {
      searchString = `&search=${search}`;
    }

    const filterString = formatFilter(filter);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files?page=${page}&path=${pathname}${searchString}${sortString}${filterString}`
        // {
        //   credentials: "include",
        // }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch Files\nCode : ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setFiles(data);
    } catch (err: any) {
      console.error("Error fetching Files:", err);
      setFilesError(err.message);
    } finally {
      setFilesLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [sort, page, search, filter]);

  const noData = (
    <div className="flex flex-row gap-2 mt-4">
      <div className="flex flex-col gap-2 px-2">
        <p>Pas de fichiers</p>
      </div>
    </div>
  );

  return (
    <div>
      <TableCard
        data={files}
        loading={filesLoading}
        headers={fileHeaders}
        inputPlaceholder="Rechercher un fichier..."
        sort={sort}
        setSort={setSort}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        noData={noData}
        parentPath={path.join(pathname, "..")}
      />
    </div>
  );
}
