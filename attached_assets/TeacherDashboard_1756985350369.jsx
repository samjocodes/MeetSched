import React, { useState } from 'react';
import { mockDatabase } from '../data/mockDatabase';

export default function TeacherDashboard({ teacher, onLogout }) {
  const [teacherSlots, setTeacherSlots] = useState(
    mockDatabase.slots.filter(slot => slot.teacherId === teacher.id)
  );
  const [newSlotDate, setNewSlotDate] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addSlot = async () => {
    if (!newSlotDate || !newSlotTime) {
      alert("⚠️ Please fill both date and time!");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSlot = {
        id: Date.now(),
        teacherId: teacher.id,
        date: newSlotDate,
        time: newSlotTime,
        isBooked: false,
        studentDetails: null
      };

      setTeacherSlots([...teacherSlots, newSlot]);
      setNewSlotDate("");
      setNewSlotTime("");
      setIsLoading(false);
      alert("✅ Slot added successfully!");
    }, 800);
  };

  const removeSlot = (slotId) => {
    const slot = teacherSlots.find(s => s.id === slotId);
    if (slot.isBooked) {
      if (!window.confirm("⚠️ This slot is booked! Are you sure you want to remove it?")) return;
    }
    setTeacherSlots(teacherSlots.filter(s => s.id !== slotId));
  };

  const availableSlots = teacherSlots.filter(slot => !slot.isBooked);
  const bookedSlots = teacherSlots.filter(slot => slot.isBooked);

  return (
    <div className="min-h-screen bg-gradient-black text-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto fade-in">
        {/* Header */}
        <div className="professional-container p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="heading-primary gold-gradient mb-2">
                Welcome, {teacher.name}
              </h1>
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {teacher.subject} Department
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Faculty Portal
                </span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="btn-professional btn-black"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="stat-number">{teacherSlots.length}</div>
            <div className="text-gray-400 text-sm font-medium">Total Slots</div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-green-400">{availableSlots.length}</div>
            <div className="text-gray-400 text-sm font-medium">Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-blue-400">{bookedSlots.length}</div>
            <div className="text-gray-400 text-sm font-medium">Booked</div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-gold-500">
              {((bookedSlots.length / teacherSlots.length) * 100 || 0).toFixed(0)}%
            </div>
            <div className="text-gray-400 text-sm font-medium">Utilization</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Add New Slot */}
          <div className="professional-card slide-up">
            <h2 className="heading-secondary gold-gradient mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Available Slot
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                <input
                  type="date"
                  value={newSlotDate}
                  onChange={(e) => setNewSlotDate(e.target.value)}
                  className="professional-input"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Time Slot</label>
                <input
                  type="text"
                  placeholder="e.g., 9:00 - 10:00"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="professional-input"
                  disabled={isLoading}
                />
              </div>
              
              <button
                onClick={addSlot}
                disabled={isLoading}
                className={`w-full btn-professional btn-gold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    Adding Slot...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Slot
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="professional-card slide-up">
            <h2 className="heading-secondary gold-gradient mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>
            
            <div className="space-y-4">
              <button className="w-full btn-professional btn-white text-left flex items-center justify-between">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View Calendar
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="w-full btn-professional btn-white text-left flex items-center justify-between">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Notifications
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button className="w-full btn-professional btn-white text-left flex items-center justify-between">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Reports
                </span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Available Slots */}
          <div className="professional-card slide-up">
            <h2 className="heading-secondary text-green-400 mb-6 flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
              Available Slots ({availableSlots.length})
            </h2>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {availableSlots.map(slot => (
                <div key={slot.id} className="slot-card flex justify-between items-center">
                  <div>
                    <div className="font-medium text-white mb-1">{slot.date}</div>
                    <div className="text-green-400 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {slot.time}
                    </div>
                  </div>
                  <button
                    onClick={() => removeSlot(slot.id)}
                    className="btn-professional bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              {availableSlots.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-medium">No available slots</p>
                  <p className="text-sm">Create your first slot to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Booked Slots */}
          <div className="professional-card slide-up">
            <h2 className="heading-secondary text-blue-400 mb-6 flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
              Booked Meetings ({bookedSlots.length})
            </h2>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {bookedSlots.map(slot => (
                <div key={slot.id} className="professional-card !p-4 !bg-gradient-professional border-blue-500 border-opacity-20">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium text-blue-400 mb-1 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {slot.date} • {slot.time}
                      </div>
                    </div>
                    <span className="status-booked">Confirmed</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="text-white font-medium flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {slot.studentDetails?.name}
                    </div>
                    <div className="text-gray-400 text-sm">ID: {slot.studentDetails?.collegeId}</div>
                  </div>
                </div>
              ))}
              {bookedSlots.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-medium">No booked meetings</p>
                  <p className="text-sm">Student bookings will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}