import { useLocation } from "wouter";

export default function RoleSelection() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px"
            }}
          ></div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto fade-in">
          {/* Header */}
          <div className="mb-12">
            <h1 className="heading-primary gold-gradient mb-4" data-testid="title-main">
              College Meeting Scheduler
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto" data-testid="text-subtitle">
              Streamline faculty-student communications with our professional scheduling platform
            </p>
          </div>
          
          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
            {/* Teacher Card */}
            <div 
              className="role-card group"
              onClick={() => setLocation("/teacher/login")}
              data-testid="card-teacher-portal"
            >
              <div className="role-emoji">👩‍🏫</div>
              <h2 className="text-xl font-semibold gold-gradient mb-2">Faculty Portal</h2>
              <p className="text-gray-400 mb-4 text-sm">
                Manage your availability, schedule meetings, and connect with students efficiently
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <span>✓ Time Management</span>
                <span>•</span>
                <span>✓ Student Communication</span>
              </div>
            </div>
            
            {/* Student Card */}
            <div 
              className="role-card group"
              onClick={() => setLocation("/student")}
              data-testid="card-student-portal"
            >
              <div className="role-emoji">👨‍🎓</div>
              <h2 className="text-xl font-semibold gold-gradient mb-2">Student Portal</h2>
              <p className="text-gray-400 mb-4 text-sm">
                Book appointments with faculty members and manage your academic consultations
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <span>✓ Easy Booking</span>
                <span>•</span>
                <span>✓ Faculty Directory</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-600 text-sm" data-testid="text-footer">
              Professional scheduling solution for academic institutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
