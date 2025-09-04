import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RoleSelection from "@/pages/role-selection";
import TeacherLogin from "@/pages/teacher-login";
import TeacherDashboard from "@/pages/teacher-dashboard";
import StudentDashboard from "@/pages/student-dashboard";
import { useState, useEffect } from "react";

function App() {
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [location, setLocation] = useLocation();

  const handleTeacherLogin = (teacher: any) => {
    setCurrentTeacher(teacher);
    // Use setTimeout to ensure state update completes before navigation
    setTimeout(() => {
      setLocation("/teacher/dashboard");
    }, 100);
  };

  const handleTeacherLogout = () => {
    setCurrentTeacher(null);
    setLocation("/");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Switch>
          <Route path="/" component={RoleSelection} />
          <Route path="/teacher/login">
            <TeacherLogin onLogin={handleTeacherLogin} />
          </Route>
          <Route path="/teacher/dashboard">
            <TeacherDashboard teacher={currentTeacher} onLogout={handleTeacherLogout} />
          </Route>
          <Route path="/student" component={StudentDashboard} />
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
