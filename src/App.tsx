import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";

import Dashboard from "./pages/Dashboard";
import { BookOpen, GraduationCap, Home } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectList from "./pages/subjects/List";
import SubjectCreate from "./pages/subjects/Create";
import ClassList from "./pages/classes/List";
import ClassCreate from "./pages/classes/Create";

function App() {
  const customTitleHandler = ({ resource, action }: any) => {
    let title = "";

    if (resource?.name) {
      title = resource.meta?.label || resource.name;
      if (action) {
        title += ` | Classroom`;
      }
    }
    return title;
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <Refine
            dataProvider={dataProvider}
            notificationProvider={useNotificationProvider()}
            routerProvider={routerProvider}
            options={{
              title: { text: "Classroom" },
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "1pRISa-2HyOvZ-RJNgsj",
            }}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Home",
                  icon: <Home />,
                },
              },
              {
                name: "subjects",
                list: "/subjects",
                create: "/subjects/create",
                meta: {
                  label: "Subjects",
                  icon: <BookOpen />,
                },
              },
              {
                name: "classes",
                list: "/classes",
                create: "/classes/create",
                meta: {
                  label: "Classes",
                  icon: <GraduationCap />,
                },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                <Route path="/" element={<Dashboard />} />
                
                // Subject Route
                <Route path="subjects">
                  <Route index element={<SubjectList />} />
                  <Route path="create" element={<SubjectCreate />} />
                </Route>

                // Classes Route
                <Route path="classes">
                  <Route index element={<ClassList />} />
                  <Route path="create" element={<ClassCreate />} />
                </Route>
              </Route>
            </Routes>
            <Toaster />
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler handler={customTitleHandler} />
          </Refine>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
