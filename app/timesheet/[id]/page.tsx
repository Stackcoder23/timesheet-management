import { Header } from "@/components/dashboard/Header";
import { TimesheetDetails } from "@/components/dashboard/TimesheetDetails";
import Skeleton from "@/components/ui/skeleton";
import { getTimesheetById } from "@/lib/api";
import { Suspense } from "react";

export default async function Timesheet({ params }: { params: { id: string } }) {
  const timesheet = await getTimesheetById(params.id);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="bg-white rounded-lg">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <TimesheetDetails data={timesheet} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
