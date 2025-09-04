export const mockDatabase = {
  teachers: [
    {
      id: 1,
      name: "Prof. Mathur",
      subject: "Mathematics",
      email: "mathur@college.edu",
      password: "teacher123",
    },
    {
      id: 2, 
      name: "Prof. Singh",
      subject: "Data Structures & Algorithms",
      email: "singh@college.edu",
      password: "teacher123",
    },
    {
      id: 3,
      name: "Prof. Verma", 
      subject: "Machine Learning",
      email: "verma@college.edu",
      password: "teacher123",
    }
  ],
  slots: [
    // Teacher 1 slots
    { id: 1, teacherId: 1, date: "2024-01-15", time: "9:00 - 10:00", isBooked: false, studentDetails: null },
    { id: 2, teacherId: 1, date: "2024-01-15", time: "11:00 - 12:00", isBooked: true, studentDetails: { name: "John Doe", collegeId: "CS2023001" }},
    { id: 3, teacherId: 1, date: "2024-01-16", time: "2:00 - 3:00", isBooked: false, studentDetails: null },
    
    // Teacher 2 slots  
    { id: 4, teacherId: 2, date: "2024-01-15", time: "10:00 - 11:00", isBooked: false, studentDetails: null },
    { id: 5, teacherId: 2, date: "2024-01-16", time: "1:00 - 2:00", isBooked: false, studentDetails: null },
    
    // Teacher 3 slots
    { id: 6, teacherId: 3, date: "2024-01-15", time: "9:30 - 10:30", isBooked: false, studentDetails: null },
    { id: 7, teacherId: 3, date: "2024-01-16", time: "12:00 - 1:00", isBooked: true, studentDetails: { name: "Jane Smith", collegeId: "AI2023005" }},
  ]
};