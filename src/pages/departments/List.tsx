import { useMemo, useState } from "react";

import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";

import { useTable } from "@refinedev/react-table";

import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";

import { SearchIcon } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

type DepartmentListItem = {
  id: number;
  name: string;
  code?: string | null;
  description?: string | null;
  totalSubjects?: number | null;
};

const DepartmentList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilters = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
        {
          field: "code",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const departmentTable = useTable<DepartmentListItem>({
    columns: useMemo<ColumnDef<DepartmentListItem>[]>(
      () => [
        {
          id: "code",
          accessorKey: "code",
          size: 100,
          header: () => <p className="column-title ml-2">Code</p>,
          cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title">Name</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>()}</span>
          ),
          filterFn: "includesString",
        },
        {
          id: "totalSubjects",
          accessorKey: "totalSubjects",
          size: 150,
          header: () => <p className="column-title">Total Subjects</p>,
          cell: ({ getValue }) => (
            <Badge variant="default">{getValue<number>() ?? 0}</Badge>
          ),
        },
        {
          id: "description",
          accessorKey: "description",
          size: 300,
          header: () => <p className="column-title ml-2">Description</p>,
          cell: ({ getValue }) => (
            <span className="truncate line-clamp-2">{getValue<string>()}</span>
          ),
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "departments",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...searchFilters],
      },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Departments</h1>

      <div className="intro-row">
        <p>Quick access to all departments offered in the curriculum.</p>

        <div className="actions-row">
          <div className="search-field">
            <SearchIcon className="search-icon" />

            <Input
              type="text"
              placeholder="Search"
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={departmentTable} />
    </ListView>
  );
};

export default DepartmentList;
