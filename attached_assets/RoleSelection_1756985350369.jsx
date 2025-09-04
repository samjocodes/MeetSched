import React from 'react';

export default function RoleSelection({ onRoleSelect }) {
  return (
    <div className="min-h-screen bg-gradient-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto fade-in">
        {/* Header */}
        <div className="mb-16">
          <h1 className="heading-primary gold-gradient mb-6">
            College Meeting Scheduler
          </h1>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Streamline faculty-student communications with our professional scheduling platform
          </p>
        </div>
        
        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Teacher Card */}
          <div
            onClick={() => onRoleSelect("teacher")}
            className="role-card group"
          >
            <div className="role-emoji">👩‍🏫</div>
            <h2 className="text-2xl font-semibold gold-gradient mb-3">Faculty Portal</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Manage your availability, schedule meetings, and connect with students efficiently
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>✓ Time Management</span>
              <span>•</span>
              <span>✓ Student Communication</span>
              <span>•</span>
              <span>✓ Schedule Overview</span>
            </div>
          </div>
          
          {/* Student Card */}
          <div
            onClick={() => onRoleSelect("student")}
            className="role-card group"
          >
            <div className="role-emoji">👨‍🎓</div>
            <h2 className="text-2xl font-semibold gold-gradient mb-3">Student Portal</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Book appointments with faculty members and manage your academic consultations
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span>✓ Easy Booking</span>
              <span>•</span>
              <span>✓ Faculty Directory</span>
              <span>•</span>
              <span>✓ Instant Confirmation</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-600 text-sm">
            Professional scheduling solution for academic institutions
          </p>
        </div>
      </div>
    </div>
  );
}