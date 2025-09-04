import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, X, Clock, Loader2 } from "lucide-react";
import FacultyCard from "@/components/FacultyCard";

export default function StudentDashboard() {
  const [, setLocation] = useLocation();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teachers = [], isLoading } = useQuery({
    queryKey: ["/api/teachers"],
  });

  const { data: availableSlots = [] } = useQuery({
    queryKey: ["/api/slots/available"],
  });

  const typedTeachers = (teachers as any[]) || [];
  const typedAvailableSlots = (availableSlots as any[]) || [];

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: { slotId: string; studentName: string; collegeId: string }) => {
      const response = await apiRequest("POST", "/api/bookings", bookingData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teachers"] });
      queryClient.invalidateQueries({ queryKey: ["/api/slots/available"] });
      setShowBookingForm(false);
      setSelectedSlot(null);
      setStudentName("");
      setCollegeId("");
      toast({
        title: "Booking confirmed!",
        description: "Your meeting has been scheduled successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSlotSelect = (slot: any) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
    // Smooth scroll to booking form
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot || !studentName || !collegeId) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    bookingMutation.mutate({
      slotId: (selectedSlot as any).id,
      studentName,
      collegeId,
    });
  };

  const handleCancelBooking = () => {
    setShowBookingForm(false);
    setSelectedSlot(null);
    setStudentName("");
    setCollegeId("");
  };

  // Group available slots by teacher
  const teachersWithAvailableSlots = typedTeachers.filter((teacher: any) => 
    typedAvailableSlots.some((slot: any) => slot.teacherId === teacher.id)
  ).map((teacher: any) => ({
    ...teacher,
    availableSlots: typedAvailableSlots.filter((slot: any) => slot.teacherId === teacher.id)
  }));

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto fade-in">
        {/* Header */}
        <div className="professional-container mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <div className="flex items-center mb-3">
                <button 
                  onClick={() => setLocation("/")}
                  className="mr-3 flex items-center text-gray-400 hover:text-yellow-500 transition-colors group"
                  data-testid="button-back"
                >
                  <ArrowLeft className="icon-sm mr-1 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
              </div>
              <h1 className="heading-primary gold-gradient mb-1" data-testid="title-book-meeting">
                Book Faculty Meeting
              </h1>
              <p className="text-gray-400 text-sm">
                Schedule your consultation with available faculty members
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-500" data-testid="text-available-faculty-count">
                {teachersWithAvailableSlots.length}
              </div>
              <div className="text-gray-400 text-xs">Available Faculty</div>
            </div>
          </div>
        </div>

        {/* Faculty Cards */}
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="icon-xl animate-spin mx-auto text-yellow-500" />
          </div>
        ) : (
          <div className="dashboard-grid mb-6" data-testid="grid-faculty-cards">
            {teachersWithAvailableSlots.map((teacher: any) => (
              <FacultyCard
                key={teacher.id}
                teacher={teacher}
                onSlotSelect={handleSlotSelect}
                testId={`faculty-card-${teacher.id}`}
              />
            ))}
          </div>
        )}

        {/* Booking Form */}
        {showBookingForm && selectedSlot && (
          <div id="booking-form" className="max-w-2xl mx-auto">
            <div className="professional-container slide-up">
              <h3 className="heading-secondary gold-gradient mb-4 text-center flex items-center justify-center">
                <Check className="icon-md mr-2 text-yellow-500" />
                Confirm Your Booking
              </h3>
              
              {/* Selected Slot Summary */}
              <div className="professional-card !bg-black !bg-opacity-60 mb-6">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <div className="w-4 h-4 text-yellow-500 mr-2 flex items-center justify-center">ⓘ</div>
                  Booking Details
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Faculty</div>
                    <div className="text-yellow-400 font-medium text-sm" data-testid="text-selected-faculty">
                      {(selectedSlot as any)?.teacher?.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Date</div>
                    <div className="text-white font-medium text-sm" data-testid="text-selected-date">
                      {(selectedSlot as any)?.date}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Time</div>
                    <div className="text-white font-medium text-sm" data-testid="text-selected-time">
                      {(selectedSlot as any)?.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Information Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="professional-input"
                    data-testid="input-student-name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    College ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your college ID"
                    value={collegeId}
                    onChange={(e) => setCollegeId(e.target.value)}
                    className="professional-input"
                    data-testid="input-college-id"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <button 
                    onClick={handleCancelBooking}
                    className="flex-1 btn-professional btn-white"
                    data-testid="button-cancel-booking"
                  >
                    <X className="icon-sm" />
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmBooking}
                    disabled={bookingMutation.isPending}
                    className="flex-1 btn-professional btn-gold"
                    data-testid="button-confirm-booking"
                  >
                    {bookingMutation.isPending ? (
                      <Loader2 className="icon-sm animate-spin" />
                    ) : (
                      <Check className="icon-sm" />
                    )}
                    Confirm Booking
                  </button>
                </div>
              </div>

              {/* Terms Notice */}
              <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
                <div className="flex items-start">
                  <div className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0 flex items-center justify-center">ⓘ</div>
                  <div className="text-xs text-gray-400">
                    <p className="mb-2">By confirming this booking, you agree to attend the scheduled meeting on time. Cancellations must be made at least 2 hours in advance.</p>
                    <p>You will receive an email confirmation with meeting details and any additional instructions from the faculty member.</p>
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
