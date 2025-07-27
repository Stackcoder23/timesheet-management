import { NextRequest, NextResponse } from "next/server";
import { timesheetEntries } from "@/lib/mock-data";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const entry = timesheetEntries.find((e) => e.id === id);
  if (entry) {
    return NextResponse.json(entry);
  }
  return NextResponse.json({ message: "Timesheet not found" }, { status: 404 });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { date, timesheetEntry } = body;

    if (!date || !timesheetEntry) {
      return NextResponse.json(
        { message: "Date and timesheet entry are required" },
        { status: 400 }
      );
    }

    const { projectName, time, type, description } = timesheetEntry;
    if (!projectName || !time || !type || !description) {
      return NextResponse.json(
        {
          message:
            "Timesheet entry must include projectName, time, type, and description",
        },
        { status: 400 }
      );
    }

    const entryIndex = timesheetEntries.findIndex((e) => e.id === params.id);
    if (entryIndex === -1) {
      return NextResponse.json(
        { message: "Timesheet not found" },
        { status: 404 }
      );
    }

    const dateIndex = timesheetEntries[entryIndex].timesheetData.findIndex(
      (d: any) => d.date === date
    );

    if (dateIndex === -1) {
      return NextResponse.json(
        { message: `Date ${date} not found in this timesheet` },
        { status: 404 }
      );
    }

    timesheetEntries[entryIndex].timesheetData[dateIndex].data.push(
      timesheetEntry
    );

    return NextResponse.json({
      message: "Timesheet entry added successfully",
      entry: timesheetEntries[entryIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const entryIndex = searchParams.get("entryIndex");

    if (!date || entryIndex === null) {
      return NextResponse.json(
        { message: "Date and entryIndex are required as query parameters" },
        { status: 400 }
      );
    }

    const entryIndexNum = parseInt(entryIndex);
    if (isNaN(entryIndexNum) || entryIndexNum < 0) {
      return NextResponse.json(
        { message: "entryIndex must be a valid non-negative number" },
        { status: 400 }
      );
    }

    const timesheetIndex = timesheetEntries.findIndex(
      (e) => e.id === params.id
    );
    if (timesheetIndex === -1) {
      return NextResponse.json(
        { message: "Timesheet not found" },
        { status: 404 }
      );
    }

    const dateIndex = timesheetEntries[timesheetIndex].timesheetData.findIndex(
      (d: any) => d.date === date
    );

    if (dateIndex === -1) {
      return NextResponse.json(
        { message: `Date ${date} not found in this timesheet` },
        { status: 404 }
      );
    }

    const dateData =
      timesheetEntries[timesheetIndex].timesheetData[dateIndex].data;

    if (entryIndexNum >= dateData.length) {
      return NextResponse.json(
        { message: `Entry index ${entryIndexNum} not found for date ${date}` },
        { status: 404 }
      );
    }

    const deletedEntry = dateData.splice(entryIndexNum, 1)[0];

    return NextResponse.json({
      message: "Timesheet entry deleted successfully",
      deletedEntry,
      entry: timesheetEntries[timesheetIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request parameters" },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { date, entryIndex, updatedEntry } = body;

    if (!date || entryIndex === undefined || !updatedEntry) {
      return NextResponse.json(
        { message: "Date, entryIndex, and updatedEntry are required" },
        { status: 400 }
      );
    }

    const { projectName, time, type, description } = updatedEntry;
    if (!projectName || !time || !type || !description) {
      return NextResponse.json(
        {
          message:
            "Updated entry must include projectName, time, type, and description",
        },
        { status: 400 }
      );
    }

    if (typeof entryIndex !== "number" || entryIndex < 0) {
      return NextResponse.json(
        { message: "entryIndex must be a valid non-negative number" },
        { status: 400 }
      );
    }

    const timesheetIndex = timesheetEntries.findIndex(
      (e) => e.id === params.id
    );
    if (timesheetIndex === -1) {
      return NextResponse.json(
        { message: "Timesheet not found" },
        { status: 404 }
      );
    }

    const dateIndex = timesheetEntries[timesheetIndex].timesheetData.findIndex(
      (d: any) => d.date === date
    );

    if (dateIndex === -1) {
      return NextResponse.json(
        { message: `Date ${date} not found in this timesheet` },
        { status: 404 }
      );
    }

    const dateData =
      timesheetEntries[timesheetIndex].timesheetData[dateIndex].data;

    if (entryIndex >= dateData.length) {
      return NextResponse.json(
        { message: `Entry index ${entryIndex} not found for date ${date}` },
        { status: 404 }
      );
    }

    const oldEntry = { ...dateData[entryIndex] };

    dateData[entryIndex] = updatedEntry;

    return NextResponse.json({
      message: "Timesheet entry updated successfully",
      oldEntry,
      updatedEntry,
      entry: timesheetEntries[timesheetIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
