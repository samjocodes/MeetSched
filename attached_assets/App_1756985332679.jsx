import React, { useState } from 'react';
import RoleSelection from './components/RoleSelection';
import TeacherLogin from './components/TeacherLogin';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

export default function App() {
  const [userType, setUserType] = useState(null); // null, "teacher", "student"
  const [loggedInTeacher, setLoggedInTeacher] = useState(null);

  // Role Selection Screen
  if (!userType) {
    return <RoleSelection onRoleSelect={setUserType} />;
  }

  // Teacher Flow
  if (userType === "teacher") {
    if (!loggedInTeacher) {
      return <TeacherLogin onLogin={setLoggedInTeacher} onBack={() => setUserType(null)} />;
    }
    
    return (
      <TeacherDashboard 
        teacher={loggedInTeacher}
        onLogout={() => {
          setLoggedInTeacher(null);
          setUserType(null);
        }}
      />
    );
  }

  // Student Flow
  if (userType === "student") {
    return <StudentDashboard onBack={() => setUserType(null)} />;
  }

  return null;
}