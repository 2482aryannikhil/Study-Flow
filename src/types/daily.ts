import { Subject } from "./subject";

export interface DailyTarget {
  id: number;

  title: string;

  subject: Subject;

  completed: boolean;

  studySeconds: number;
}
