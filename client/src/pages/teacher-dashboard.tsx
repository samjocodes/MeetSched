import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, LogOut, Calendar, Mail, BarChart3, Clock, Trash2, Building, User } from "lucide-react";
import StatCard from "@/components/StatCard";
import SlotCard from "@/components/SlotCard";

export default function TeacherDashboard({ teacher, onLogout }) {
  const [, setLocation] = useLocation();
  const [newSlotDate, setNewSlotDate] = useState("");
  const [newSlotTime, setNewSlotTime] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: slots = [], isLoading } = useQuery({
    queryKey: ["/api/teacher", teacher?.id, "slots"],
    enabled: !!teacher?.id,
  });

  const createSlotMutation = useMutation({
    mutationFn: async (slotData: { teacherId: string; date: string; time: string }) => {
      const response = await apiRequest("POST", "/api/slots", slotData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher", teacher?.id, "slots"] });
      setNewSlotDate("");
      setNewSlotTime("");
      toast({
        title: "Slot created",
        description: "New time slot has been added successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to create slot",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteSlotMutation = useMutation({
    mutationFn: async (slotId: string) => {
      const response = await apiRequest("DELETE", `/api/slots/${slotId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/teacher", teacher?.id, "slots"] });
      toast({
        title: "Slot deleted",
        description: "Time slot has been removed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete slot",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddSlot = () => {
    if (!newSlotDate || !newSlotTime) {
      toast({
        title: "Missing information",
        description: "Please fill in both date and time.",
        variant: "destructive",
      });
      return;
    }
    createSlotMutation.mutate({
      teacherId: teacher.id,
      date: newSlotDate,
      time: newSlotTime,
    });
  };

  const handleLogout = () => {
    onLogout();
    setLocation("/");
  };

  if (!teacher) {
    setLocation("/teacher/login");
    return null;
  }

  const availableSlots = slots.filter(slot => !slot.isBooked);
  const bookedSlots = slots.filter(slot => slot.isBooked);
  const totalSlots = slots.length;
  const utilization = totalSlots > 0 ? Math.round((bookedSlots.length / totalSlots) * 100) : 0;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto fade-in">
        {/* Header */}
        <div className="professional-container mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="heading-primary gold-gradient mb-1" data-testid="title-welcome">
                Welcome, {teacher.name}
              </h1>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <span className="flex items-center">
                  <Building className="icon-sm mr-1 text-yellow-500" />
                  {teacher.department || `${teacher.subject} Department`}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <User className="icon-sm mr-1 text-yellow-500" />
                  Faculty Portal
                </span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="btn-professional btn-black"
              data-testid="button-sign-out"
            >
              <LogOut className="icon-sm" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="dashboard-stats mb-6">
          <StatCard 
            number={totalSlots}
            label="Total Slots"
            color="text-white"
            testId="stat-total-slots"
          />
          <StatCard 
            number={availableSlots.length}
            label="Available"
            color="text-green-400"
            testId="stat-available"
          />
          <StatCard 
            number={bookedSlots.length}
            label="Booked"
            color="text-blue-400"
            testId="stat-booked"
          />
          <StatCard 
            number={`${utilization}%`}
            label="Utilization"
            color="text-yellow-500"
            testId="stat-utilization"
          />
        </div>

        <div className="dashboard-grid mb-6">
          {/* Add New Slot */}
          <div className="professional-card slide-up">
            <h2 className="heading-secondary gold-gradient mb-4 flex items-center">
              <Plus className="icon-md mr-2 text-yellow-500" />
              Add Available Slot
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  value={newSlotDate}
                  onChange={(e) => setNewSlotDate(e.target.value)}
                  className="professional-input"
                  data-testid="input-slot-date"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Time Slot</label>
                <input
                  type="text"
                  placeholder="e.g., 9:00 - 10:00"
                  value={newSlotTime}
                  onChange={(e) => setNewSlotTime(e.target.value)}
                  className="professional-input"
                  data-testid="input-slot-time"
                />
              </div>
              
              <button 
                onClick={handleAddSlot}
                disabled={createSlotMutation.isPending}
                className="w-full btn-professional btn-gold"
                data-testid="button-create-slot"
              >
                {createSlotMutation.isPending ? (
                  <Loader2 className="icon-sm animate-spin" />
                ) : (
                  <Plus className="icon-sm" />
                )}
                Create Slot
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="professional-card slide-up">
            <h2 className="heading-secondary gold-gradient mb-4 flex items-center">
              <BarChart3 className="icon-md mr-2 text-yellow-500" />
              Quick Actions
            </h2>
            
            <div className="space-y-3">
              <button className="w-full btn-professional btn-white text-left flex items-center justify-between">
                <span className="flex items-center">
                  <Calendar className="icon-sm mr-2" />
                  View Calendar
                </span>
                <span className="text-xs">→</span>
              </button>
              
              <button className="w-full btn-professional btn-white text-left flex items-center justify-between">
                <span className="flex items-center">
                  <Mail className="icon-sm mr-2" />
                  Send Notifications
                </span>
                <span className="text-xs">→</span>
              </button>
              
              <button className="w-full btn-professional btn-white text-left flex items-center justify-between">
                <span className="flex items-center">
                  <BarChart3 className="icon-sm mr-2" />
                  View Reports
                </span>
                <span className="text-xs">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Available Slots */}
          <div className="professional-card slide-up">
            <h2 className="heading-secondary text-green-400 mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Available Slots ({availableSlots.length})
            </h2>
            
            <div className="space-y-2 max-h-72 overflow-y-auto" data-testid="list-available-slots">
              {isLoading ? (
                <div className="text-center py-4">
                  <Loader2 className="icon-md animate-spin mx-auto text-yellow-500" />
                </div>
              ) : availableSlots.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No available slots</p>
              ) : (
                availableSlots.map((slot) => (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    onDelete={() => deleteSlotMutation.mutate(slot.id)}
                    showDelete
                    testId={`slot-available-${slot.id}`}
                  />
                ))
              )}
            </div>
          </div>

          {/* Booked Slots */}
          <div className="professional-card slide-up">
            <h2 className="heading-secondary text-blue-400 mb-4 flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Booked Slots ({bookedSlots.length})
            </h2>
            
            <div className="space-y-2 max-h-72 overflow-y-auto" data-testid="list-booked-slots">
              {bookedSlots.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">No booked slots</p>
              ) : (
                bookedSlots.map((slot) => (
                  <div key={slot.id} className="slot-card">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white text-sm">{slot.date}</div>
                        <div className="text-blue-400 text-xs flex items-center">
                          <Clock className="icon-xs mr-1" />
                          {slot.time}
                        </div>
                      </div>
                      <span className="status-badge status-booked">Booked</span>
                    </div>
                    {slot.booking && (
                      <div className="mt-2 pt-2 border-t border-gray-600">
                        <div className="text-xs text-gray-400">Student: <span className="text-white">{slot.booking.studentName}</span></div>
                        <div className="text-xs text-gray-400">ID: <span className="text-white">{slot.booking.collegeId}</span></div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
