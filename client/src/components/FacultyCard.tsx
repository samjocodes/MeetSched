import { Clock } from "lucide-react";

interface FacultyCardProps {
  teacher: {
    id: string;
    name: string;
    subject: string;
    availableSlots: Array<{
      id: string;
      date: string;
      time: string;
      isBooked: boolean;
    }>;
  };
  onSlotSelect: (slot: any) => void;
  testId?: string;
}

export default function FacultyCard({ teacher, onSlotSelect, testId }: FacultyCardProps) {
  return (
    <div className="professional-card slide-up" data-testid={testId}>
      <div className="text-center mb-4">
        <div className="faculty-avatar mx-auto mb-3">
          👨‍🏫
        </div>
        <h2 className="text-lg font-semibold gold-gradient mb-1" data-testid={`text-faculty-name-${teacher.id}`}>
          {teacher.name}
        </h2>
        <p className="text-gray-400 text-sm mb-2" data-testid={`text-faculty-subject-${teacher.id}`}>
          {teacher.subject}
        </p>
        <div className="flex items-center justify-center text-green-400 text-xs font-medium">
          <Clock className="icon-xs mr-1" />
          <span data-testid={`text-available-slots-count-${teacher.id}`}>
            {teacher.availableSlots.length}
          </span> available slots
        </div>
      </div>
      
      <div className="space-y-2">
        {teacher.availableSlots.map((slot) => (
          <div
            key={slot.id}
            className="slot-card cursor-pointer"
            onClick={() => onSlotSelect({ ...slot, teacher })}
            data-testid={`slot-${slot.id}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{slot.date}</div>
                <div className="text-xs opacity-90 flex items-center mt-1">
                  <Clock className="icon-xs mr-1" />
                  {slot.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
