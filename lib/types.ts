export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface TimesheetEntry {
  id: string;
  week: string;
  date: string;
  timesheetData: any;
}
