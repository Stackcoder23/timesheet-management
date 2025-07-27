import { Header } from "@/components/dashboard/Header";
import { TimesheetTable } from "@/components/dashboard/TimesheetTable";
import type { TimesheetEntry } from "@/lib/types";
import { Suspense } from "react";
import Skeleton from "@/components/ui/skeleton";
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

async function TimesheetList() {
  const timesheets: TimesheetEntry[] = getTimesheetEntriesWithStatus();

  return <TimesheetTable data={timesheets} />;
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <TimesheetList />
          </Suspense>
        </div>
      </main>
    </div>
  );
}