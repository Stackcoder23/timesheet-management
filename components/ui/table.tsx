"use client";

import React from "react";

interface TimesheetEntry {
  id: string;
  week: string;
  date: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
}

interface TableProps {
  data: TimesheetEntry[];
}

export default function Table({ data }: TableProps) {
  const getStatusStyle = (status: TimesheetEntry["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 border border-green-200";
      case "INCOMPLETE":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "MISSING":
        return "bg-pink-100 text-pink-700 border border-pink-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="text-black text-2xl font-bold m-5">Your Timesheets</div>
        <div className="m-5 bg-[#f9fafb] rounded-md border-1">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  WEEK #
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  DATE
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                      {entry.week}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {entry.date}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusStyle(
                          entry.status
                        )}`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm">
                      <a
                        href={`/timesheet/${entry.id}`}
                        className="text-blue-500 text-base font-[550]"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500">
                    No timesheet entries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 mt-7 p-5">
        <div className="text-gray-600 text-sm m-5 text-center">© 2024 tentwenty. All rights reserved.</div>
      </div>
    </>
  );
}
