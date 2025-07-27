import { Header } from "@/components/dashboard/Header";
import { TimesheetTable } from "@/components/dashboard/TimesheetTable";
import type { TimesheetEntry } from "@/lib/types";
import { Suspense } from "react";
import { getTimesheets } from "@/lib/api";
import Skeleton from "@/components/ui/skeleton";

async function TimesheetList() {
  const timesheets: TimesheetEntry[] = await getTimesheets();

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
