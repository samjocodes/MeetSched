import React, { useState } from 'react';
import { mockDatabase } from '../data/mockDatabase';

export default function StudentDashboard({ onBack }) {
  const [allSlots] = useState(mockDatabase.slots);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const availableSlots = allSlots.filter(slot => !slot.isBooked);
  const slotsByTeacher = {};
  
  availableSlots.forEach(slot => {
    const teacher = mockDatabase.teachers.find(t => t.id === slot.teacherId);
    if (!slotsByTeacher[slot.teacherId]) {
      slotsByTeacher[slot.teacherId] = {
        teacher,
        slots: []
      };
    }
    slotsByTeacher[slot.teacherId].slots.push(slot);
  });

  const handleBooking = async () => {
    if (!selectedSlot || !studentName || !collegeId) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    setIsBooking(true);
    
    // Simulate API call
    setTimeout(() => {
      const teacher = mockDatabase.teachers.find(t => t.id === selectedSlot.teacherId);
      alert(`✅ Booking confirmed!\n\nTeacher: ${teacher.name}\nDate: ${selectedSlot.date}\nTime: ${selectedSlot.time}\nStudent: ${studentName}\n\nConfirmation details have been sent to your email.`);
      
      // Reset form
      setSelectedSlot(null);
      setStudentName("");
      setCollegeId("");
      setIsBooking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-black text-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto fade-in">
        {/* Header */}
        <div className="professional-container p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center mb-4">
                <button
                  onClick={onBack}
                  className="mr-4 flex items-center text-gray-400 hover:text-gold-500 transition-colors group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              </div>
              <h1 className="heading-primary gold-gradient mb-2">
                Book Faculty Meeting
              </h1>
              <p className="text-gray-400 text-lg">
                Schedule your consultation with available faculty members
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gold-500">
                {Object.keys(slotsByTeacher).length}
              </div>
              <div className="text-gray-400 text-sm">Available Faculty</div>
            </div>
          </div>
        </div>

        {/* Faculty Cards */}
        {Object.keys(slotsByTeacher).length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {Object.values(slotsByTeacher).map(({ teacher, slots }) => (
              <div key={teacher.id} className="professional-card slide-up">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-black">👨‍🏫</span>
                  </div>
                  <h2 className="text-xl font-semibold gold-gradient mb-2">{teacher.name}</h2>
                  <p className="text-gray-400 text-sm mb-3">{teacher.subject}</p>
                  <div className="flex items-center justify-center text-green-400 text-sm font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {slots.length} available slot{slots.length !== 1 ? 's' : ''}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {slots.map(slot => (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`slot-card ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{slot.date}</div>
                          <div className="text-sm opacity-90 flex items-center mt-1">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {slot.time}
                          </div>
                        </div>
                        {selectedSlot?.id === slot.id && (
                          <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="professional-container p-12">
              <svg className="w-24 h-24 mx-auto mb-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-300 mb-4">No Available Slots</h2>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                All faculty members are currently unavailable. Please check back later or contact the administration.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-professional btn-gold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        )}

        {/* Booking Form */}
        {selectedSlot && (
          <div className="max-w-2xl mx-auto">
            <div className="professional-container p-8 slide-up">
              <h3 className="heading-secondary gold-gradient mb-6 text-center flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
                Confirm Your Booking
              </h3>
              
              {/* Selected Slot Summary */}
              <div className="professional-card !bg-black !bg-opacity-60 mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Booking Details
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Faculty</div>
                    <div className="text-gold-400 font-medium">
                      {mockDatabase.teachers.find(t => t.id === selectedSlot.teacherId)?.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Date</div>
                    <div className="text-white font-medium">{selectedSlot.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Time</div>
                    <div className="text-white font-medium">{selectedSlot.time}</div>
                  </div>
                </div>
              </div>

              {/* Student Information Form */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="professional-input"
                    disabled={isBooking}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    College ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your college ID"
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    className="professional-input"
                    disabled={isBooking}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => setSelectedSlot(null)}
                    className="flex-1 btn-professional btn-white"
                    disabled={isBooking}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={isBooking || !studentName || !collegeId}
                    className={`flex-1 btn-professional btn-gold ${(isBooking || !studentName || !collegeId) ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isBooking ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Notice */}
              <div className="mt-8 p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gold-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-gray-400">
                    <p className="mb-2">
                      <strong className="text-gray-300">Important:</strong> Please arrive 5 minutes before your scheduled time. 
                      Cancellations must be made at least 2 hours in advance.
                    </p>
                    <p>
                      You will receive a confirmation email with meeting details and location information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}