import { Clock, Trash2 } from "lucide-react";

interface SlotCardProps {
  slot: {
    id: string;
    date: string;
    time: string;
    isBooked: boolean;
    booking?: {
      studentName: string;
      collegeId: string;
    };
  };
  onDelete?: () => void;
  showDelete?: boolean;
  testId?: string;
}

export default function SlotCard({ slot, onDelete, showDelete = false, testId }: SlotCardProps) {
  return (
    <div className="slot-card flex justify-between items-center" data-testid={testId}>
      <div>
        <div className="font-medium text-white text-sm">{slot.date}</div>
        <div className="text-green-400 text-xs flex items-center">
          <Clock className="icon-xs mr-1" />
          {slot.time}
        </div>
      </div>
      {showDelete && onDelete && (
        <button
          onClick={onDelete}
          className="btn-professional bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-xs"
          data-testid={`button-delete-slot-${slot.id}`}
        >
          <Trash2 className="icon-xs" />
        </button>
      )}
    </div>
  );
}
