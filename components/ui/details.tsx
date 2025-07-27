"use client";

import React, { useState } from "react";
import AddTaskModal from "../dashboard/AddTaskModal";
import { addTimesheetEntry, deleteTimesheetEntry, editTimesheetEntry, getTimesheetById } from "@/lib/api";

export default function Details({ data: initialData }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [editingTask, setEditingTask] = useState<{
    date: string;
    taskIndex: number;
    taskData: any;
  } | null>(null);

  const timesheetData = data?.timesheetData || [];

  const totalHours = timesheetData.reduce((total: any, day: any) => {
    return (
      total +
      day.data.reduce((dayTotal: any, task: any) => dayTotal + task.time, 0)
    );
  }, 0);

  const refetchData = async () => {
    try {
      setIsLoading(true);
      const updatedData = await getTimesheetById(data.id);
      setData(updatedData);
    } catch (error) {
      console.error("Failed to refetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewTask = (date: any) => {
    setSelectedDate(date);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (date: any, taskIndex: any) => {
    const dayData = timesheetData.find((day: any) => day.date === date);
    if (dayData && dayData.data[taskIndex]) {
      setEditingTask({
        date,
        taskIndex,
        taskData: dayData.data[taskIndex]
      });
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const handleDeleteTask = async (date: any, taskIndex: any) => {
    try {
      setIsLoading(true);
      await deleteTimesheetEntry(data.id, date, taskIndex);
      await refetchData();
      console.log(`Deleted task ${taskIndex} for ${date}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskSubmit = async (taskData: any) => {
    try {
      setIsLoading(true);
      
      if (editingTask) {
        await editTimesheetEntry(data.id, editingTask.date, editingTask.taskIndex, taskData);
        console.log("Task edited successfully");
      } else {
        await addTimesheetEntry(data.id, selectedDate, taskData);
        console.log("Task added successfully");
      }
      
      await refetchData();
      handleModalClose();
    } catch (error) {
      console.error("Failed to save task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate("");
    setEditingTask(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-black text-2xl font-bold">
              This week's timesheet
            </div>
            <div className="text-gray-500 text-sm mt-1">{data.date}</div>
          </div>
          <div className="flex items-center">
            <div className="text-right mr-4">
              <div className="text-sm text-gray-500">{totalHours}/40 hrs</div>
              <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="h-2 bg-orange-400 rounded-full"
                  style={{
                    width: `${Math.min((totalHours / 40) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {Math.min((totalHours / 40) * 100, 100)}%
            </div>
          </div>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-20">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Updating...</span>
            </div>
          </div>
        )}

        <div className="space-y-6 relative">
          {timesheetData.map((dayData: any, dayIndex: any) => (
            <div key={dayIndex}>
              <div className="flex">
                <div className="w-20 flex-shrink-0">
                  <div className="text-lg font-semibold text-gray-800 sticky top-0">
                    {dayData.date}
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  {dayData.data.map((task: any, taskIndex: any) => (
                    <div
                      key={taskIndex}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">
                          {task.type}
                        </div>
                        {task.description && (
                          <div className="text-sm text-gray-600 mt-1">
                            {task.description}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          {task.time} hrs
                        </div>
                        <div className="bg-blue-100 text-blue-800 border border-green-200 text-xs p-1 rounded-md font-semibold">
                          {task.projectName}
                        </div>

                        <div className="relative group">
                          <button 
                            className="text-gray-400 hover:text-gray-600 p-1"
                            disabled={isLoading}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                          <div className="absolute right-0 top-8 w-24 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            <button
                              onClick={() =>
                                handleEditTask(dayData.date, taskIndex)
                              }
                              disabled={isLoading}
                              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteTask(dayData.date, taskIndex)
                              }
                              disabled={isLoading}
                              className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => handleAddNewTask(dayData.date)}
                    disabled={isLoading}
                    className="w-full p-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add new task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mt-7 p-5">
        <div className="text-gray-600 text-sm text-center">
          © 2024 tentwenty. All rights reserved.
        </div>
      </div>
      
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleTaskSubmit}
        editingTask={editingTask?.taskData || null}
        isEditing={!!editingTask}
      />
    </>
  );
}