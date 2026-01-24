import { useMemo, useState } from "react";

import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";

import { useTable } from "@refinedev/react-table";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import { SearchIcon } from "lucide-react";

import { DEPARTMENT_OPTIONS } from "@/constants";

import { Class, Subject, User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useList } from "@refinedev/core";

const ClassList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedTeacher, setSelectedTeacher] = useState("All");

  const { query: teachersQuery } = useList<User>({
    resource: "users",
    filters: [{ field: "role", operator: "eq", value: "teacher" }],

    pagination: { pageSize: 100 },
  });

  const { query: subjectsQuery } = useList<Subject>({
    resource: "subjects",

    pagination: { pageSize: 100 },
  });

  const teachers = teachersQuery?.data?.data || [];
  const subjects = subjectsQuery?.data?.data || [];

  const subjectFilters =
    selectedSubject === "All"
      ? []
      : [
          {
            field: "subject",
            operator: "eq" as const,
            value: selectedSubject,
          },
        ];
  const teacherFilters =
    selectedTeacher === "All"
      ? []
      : [
          {
            field: "user",
            operator: "eq" as const,
            value: selectedTeacher,
          },
        ];
  const searchFilters = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const classTable = useTable<Class>({
    columns: useMemo<ColumnDef<Class>[]>(
      () => [
        {
          id: "bannerUrl",
          accessorKey: "bannerUrl",
          size: 80,
          header: () => <p className="column-title ml-2">Banner</p>,
          cell: ({ getValue }) => (
            <div className="flex items-center justify-center">
              <img
                src={getValue<string>() || "/placeholder-class.png"}
                alt="Class banner"
                className="w-15 h-15 rounded-3xl object-cover"
              />
            </div>
          ),
        },
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title ml-2">Class Name</p>,
          cell: ({ getValue }) => <>{getValue<string>()}</>,
        },
        {
          id: "capacity",
          accessorKey: "capacity",
          size: 80,
          header: () => <p className="column-title">Capacity</p>,
          cell: ({ getValue }) => <>{getValue<string>()}</>,
        },
        {
          id: "teacher",
          accessorKey: "teacher.name",
          size: 100,
          header: () => <p className="column-title ml-2">Teacher</p>,
          cell: ({ getValue }) => (
            <Badge variant="secondary">{getValue<string>()}</Badge>
          ),
        },
        {
          id: "subject",
          accessorKey: "subject.name",
          size: 100,
          header: () => <p className="column-title ml-2">Subject</p>,
          cell: ({ getValue }) => (
            <Badge variant="secondary">{getValue<string>()}</Badge>
          ),
        },
        {
          id: "status",
          accessorKey: "status",
          size: 100,
          header: () => <p className="column-title ml-2">Status</p>,
          cell: ({ getValue }) => {
            let status = getValue<string>();
            status = status.charAt(0).toUpperCase() + status.slice(1);
            return (
              <Badge variant={status === "Active" ? "default" : "secondary"}>
                {status}
              </Badge>
            );
          },
        }
      ],
      [],
    ),
    refineCoreProps: {
      resource: "classes",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...teacherFilters, ...subjectFilters, ...searchFilters],
      },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Classes</h1>

      <div className="intro-row">
        <p>Quick access to all classes offered in the curriculum.</p>

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
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Teacher" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">All Teachers</SelectItem>

                {teachers.map((teacher) => {
                  return (
                    <SelectItem key={teacher.id} value={teacher.name}>
                      {teacher.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="All">All Subjects</SelectItem>

                {subjects.map((subject) => {
                  return (
                    <SelectItem key={subject.id} value={subject.name}>
                      {subject.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={classTable} />
    </ListView>
  );
};

export default ClassList;
