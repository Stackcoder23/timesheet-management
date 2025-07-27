import axios from "./axios";
import type { TimesheetEntry } from "./types";

export const getTimesheets = async (): Promise<TimesheetEntry[]> => {
  try {
    const { data } = await axios.get("/api/timesheets");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch timesheets.");
  }
};

export const getTimesheetById = async (id: string): Promise<TimesheetEntry> => {
  try {
    const { data } = await axios.get(`/api/timesheets/${id}`);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch timesheet with ID: ${id}`);
  }
};

export const addTimesheetEntry = async (
  timesheetId: string,
  date: string,
  timesheetEntry: {
    projectName: string;
    time: number;
    type: string;
    description: string;
  }
): Promise<TimesheetEntry> => {
  try {
    const { data } = await axios.post(`/api/timesheets/${timesheetId}`, {
      date,
      timesheetEntry,
    });
    return data.entry;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to add timesheet entry";
    throw new Error(message);
  }
};

export const deleteTimesheetEntry = async (
  timesheetId: string,
  date: string,
  entryIndex: number
): Promise<TimesheetEntry> => {
  try {
    const { data } = await axios.delete(
      `/api/timesheets/${timesheetId}?date=${encodeURIComponent(
        date
      )}&entryIndex=${entryIndex}`
    );
    return data.entry;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to delete timesheet entry";
    throw new Error(message);
  }
};

export const editTimesheetEntry = async (
  timesheetId: string,
  date: string,
  entryIndex: number,
  updatedEntry: {
    projectName: string;
    time: number;
    type: string;
    description: string;
  }
): Promise<TimesheetEntry> => {
  try {
    const { data } = await axios.put(`/api/timesheets/${timesheetId}`, {
      date,
      entryIndex,
      updatedEntry,
    });
    return data.entry;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to edit timesheet entry';
    throw new Error(message);
  }
};

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
      rememberMe,
    });
    return data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Invalid email or password";
    throw new Error(message);
  }
};
