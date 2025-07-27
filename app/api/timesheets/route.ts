import { NextResponse } from "next/server";
import { timesheetEntries } from "@/lib/mock-data";

function calculateTotalHours(timesheetEntry: any): number {
  return timesheetEntry.timesheetData.reduce((weekTotal: any, dayData: any) => {
    const dayTotal = dayData.data.reduce(
      (daySum: any, entry: any) => daySum + entry.time,
      0
    );
    return weekTotal + dayTotal;
  }, 0);
}

function getTimesheetStatus(
  totalHours: number
): "COMPLETED" | "INCOMPLETE" | "MISSING" {
  if (totalHours === 0) {
    return "MISSING";
  } else if (totalHours < 40) {
    return "INCOMPLETE";
  } else {
    return "COMPLETED";
  }
}

function getTimesheetEntriesWithStatus() {
  return timesheetEntries.map((entry) => {
    const totalHours = calculateTotalHours(entry);
    const status = getTimesheetStatus(totalHours);

    return {
      ...entry,
      status,
      totalHours,
    };
  });
}

export async function GET() {
  const entriesWithStatus = getTimesheetEntriesWithStatus();
  return NextResponse.json(entriesWithStatus);
}
