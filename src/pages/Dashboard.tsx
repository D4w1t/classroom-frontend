import { useMemo } from "react";
import { useLink, useList } from "@refinedev/core";

import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Class, Department, Subject, User } from "@/types";
import {
  BookOpen,
  Building2,
  GraduationCap,
  Layers,
  ShieldCheck,
  Users,
} from "lucide-react";

type ClassListItem = {
  id: number;
  name: string;
  createdAt?: string;
  subject?: {
    name: string;
  };
  teacher?: {
    name: string;
  };
};

const roleColors = ["#f97316", "#0ea5e9", "#22c55e", "#a855f7"];

const Dashboard = () => {
  const Link = useLink();

  const { query: UsersQuery } = useList<User>({
    resource: "users",

    pagination: { mode: "off" },
  });

  const { query: SubjectsQuery } = useList<Subject>({
    resource: "subjects",

    pagination: { mode: "off" },
  });

  const { query: DepartmetsQuery } = useList<Department>({
    resource: "departments",

    pagination: { mode: "off" },
  });

  const { query: ClassesQuery } = useList<Class>({
    resource: "classes",

    pagination: { mode: "off" },
  });

  const users = UsersQuery?.data?.data ?? [];
  const subjects = SubjectsQuery?.data?.data ?? [];
  const departments = DepartmetsQuery?.data?.data ?? [];
  const classes = ClassesQuery?.data?.data ?? [];

  const usersByRole = useMemo(() => {
    const counts = users.reduce<Record<string, number>>((acc, user) => {
      const role = user?.role ?? "Unknown";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([role, total]) => ({ role, total }));
  }, [users]);

  const subjectsByDepartment = useMemo(() => {
    const counts = subjects.reduce<Record<string, number>>((acc, subject) => {
      const departmentName =
        (subject as { department?: { name?: string } }).department?.name ??
        "Unassigned";
      acc[departmentName] = (acc[departmentName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([departmentName, totalSubjects]) => ({
      departmentName,
      totalSubjects,
    }));
  }, [subjects]);

  const classesBySubject = useMemo(() => {
    const counts = classes.reduce<Record<string, number>>((acc, classItem) => {
      const subjectName = classItem.subject?.name ?? "Unassigned";
      acc[subjectName] = (acc[subjectName] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([subjectName, totalClasses]) => ({
      subjectName,
      totalClasses,
    }));
  }, [classes]);

  const newestClasses = useMemo(() => {
    return [...classes]
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [classes]);

  const newestTeachers = useMemo(() => {
    return users
      .filter((user) => user.role === "teacher")
      .sort((a, b) => {
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      })
      .slice(0, 5);
  }, [users]);

  const topDepartments = useMemo(() => {
    return [...subjectsByDepartment]
      .sort((a, b) => b.totalSubjects - a.totalSubjects)
      .slice(0, 5)
      .map((item, index) => ({
        ...item,
        departmentId: index,
      }));
  }, [subjectsByDepartment]);

  const topSubjects = useMemo(() => {
    return [...classesBySubject]
      .sort((a, b) => b.totalClasses - a.totalClasses)
      .slice(0, 5)
      .map((item, index) => ({
        ...item,
        subjectId: index,
      }));
  }, [classesBySubject]);

  const kpis = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      accent: "text-blue-600",
    },
    {
      label: "Teachers",
      value: users.filter((user) => user.role === "teacher").length,
      icon: GraduationCap,
      accent: "text-emerald-600",
    },
    {
      label: "Admins",
      value: users.filter((user) => user.role === "admin").length,
      icon: ShieldCheck,
      accent: "text-amber-600",
    },
    {
      label: "Subjects",
      value: subjects.length,
      icon: BookOpen,
      accent: "text-purple-600",
    },
    {
      label: "Departments",
      value: departments.length,
      icon: Building2,
      accent: "text-cyan-600",
    },
    {
      label: "classes",
      value: classes.length,
      icon: Layers,
      accent: "text-rose-600",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg border border-border bg-muted/20 p-4 hover:border-primary/40 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-muted-foreground">
                    {kpi.label}
                  </p>
                  <kpi.icon className={`h-4 w-4 ${kpi.accent}`} />
                </div>

                <div className="mt-2 text-2xl font-semibold">{kpi.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Users By Role</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="total"
                    nameKey="role"
                    data={usersByRole}
                    innerRadius={65}
                    outerRadius={120}
                    paddingAngle={3}
                  >
                    {usersByRole.map((entry, index) => (
                      <Cell
                        key={`${entry.role}-${index}`}
                        fill={roleColors[index % roleColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-2">
              {usersByRole.map((entry, index) => (
                <span
                  key={entry.role}
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: roleColors[index % roleColors.length],
                    }}
                  />
                  {entry.role} · {entry.total}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Latest Classes</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-semibold">
                {newestClasses.length}
              </div>
              <p className="text-sm text-muted-foreground">
                Most Recent Classes added
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>New Teachers</CardTitle>
            </CardHeader>

            <CardContent className="text-3xl font-semibold">
              <div>{newestTeachers.length}</div>

              <p className="text-sm text-muted-foreground">
                Most Recent Teachers added
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Insights</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Subjects per Department
            </h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectsByDepartment}>
                  <XAxis dataKey="departmentName" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="totalSubjects"
                    fill="#f97316"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Classes per Subject
            </h3>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classesBySubject}>
                  <XAxis dataKey="subjectName" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar
                    dataKey="totalClasses"
                    fill="#0ea5e9"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
