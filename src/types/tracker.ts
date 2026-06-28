import { Subject } from "./subject";

export interface Chapter {
  id: number;
  title: string;
  subject: Subject;

  lectures: boolean;
  module: boolean;
  pyqs: boolean;
  sidebook: boolean;
  revision: boolean;
}
