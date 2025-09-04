import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RoleSelection from "@/pages/role-selection";
import TeacherLogin from "@/pages/teacher-login";
import TeacherDashboard from "@/pages/teacher-dashboard";
import StudentDashboard from "@/pages/student-dashboard";
import { useState } from "react";

function App() {
  const [currentTeacher, setCurrentTeacher] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={RoleSelection} />
          <Route path="/teacher/login">
            <TeacherLogin onLogin={setCurrentTeacher} />
          </Route>
          <Route path="/teacher/dashboard">
            <TeacherDashboard teacher={currentTeacher} onLogout={() => setCurrentTeacher(null)} />
          </Route>
          <Route path="/student" component={StudentDashboard} />
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
