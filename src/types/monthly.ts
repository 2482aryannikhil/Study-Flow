export type Subject = "Mathematics" | "Physics" | "Chemistry";

export interface MonthlyGoal {
  id: number;
  title: string;
  subject: Subject;
  completed: boolean;
}
