interface StatCardProps {
  number: string | number;
  label: string;
  color?: string;
  testId?: string;
}

export default function StatCard({ number, label, color = "text-white", testId }: StatCardProps) {
  return (
    <div className="stat-card" data-testid={testId}>
      <div className={`stat-number ${color}`}>{number}</div>
      <div className="text-gray-400 text-xs font-medium">{label}</div>
    </div>
  );
}
