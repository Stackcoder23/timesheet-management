"use client";

import React, { useState, useEffect } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: any;
  date?: string;
  editingTask?: any;
  isEditing?: boolean;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onSubmit,
  date,
  editingTask = null,
  isEditing = false,
}: AddTaskModalProps) {
  const [project, setProject] = useState("");
  const [workType, setWorkType] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(1);

  useEffect(() => {
    if (isOpen) {
      if (isEditing && editingTask) {
        setProject(editingTask.projectName || "");
        setWorkType(editingTask.type || "");
        setDescription(editingTask.description || "");
        setHours(editingTask.time || 1);
      } else {
        setProject("");
        setWorkType("");
        setDescription("");
        setHours(1);
      }
    }
  }, [isOpen, isEditing, editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      projectName: project,
      type: workType,
      description,
      time: hours,
    });
    setProject("");
    setWorkType("");
    setDescription("");
    setHours(1);
    onClose();
  };

  const handleCancel = () => {
    setProject("");
    setWorkType("");
    setDescription("");
    setHours(1);
    onClose();
  };

  const incrementHours = () => {
    setHours((prev) => prev + 1);
  };

  const decrementHours = () => {
    setHours((prev) => Math.max(1, prev - 1));
  };

  if (!isOpen) return null;

  const modalTitle = isEditing ? "Edit Entry" : "Add New Entry";
  const submitButtonText = isEditing ? "Update entry" : "Add entry";

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[500px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">{modalTitle}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Project *
            </label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
            >
              <option defaultChecked disabled value="" className="text-gray-900">
                Project Name
              </option>
              <option value="Project Alpha" className="text-gray-900">
                Project Alpha
              </option>
              <option value="Project Beta" className="text-gray-900">
                Project Beta
              </option>
              <option value="Project Gamma" className="text-gray-900">
                Project Gamma
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Work *
            </label>
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900"
            >
              <option value="" className="text-gray-900">
                Bug fixes
              </option>
              <option value="Development" className="text-gray-900">
                Development
              </option>
              <option value="Testing" className="text-gray-900">
                Testing
              </option>
              <option value="Bug fixes" className="text-gray-900">
                Bug fixes
              </option>
              <option value="Code Review" className="text-gray-900">
                Code Review
              </option>
              <option value="Meeting" className="text-gray-900">
                Meeting
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write text here..."
              required
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-gray-900 placeholder-gray-500"
            />
            <div className="text-xs text-gray-500 mt-1">
              Max 50 characters for each line
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours *
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementHours}
                className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-50 text-black"
              >
                -
              </button>
              <input
                type="number"
                value={hours}
                onChange={(e) =>
                  setHours(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-16 h-8 border-t border-b border-gray-300 text-center outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                min="1"
              />
              <button
                type="button"
                onClick={incrementHours}
                className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-50 text-black"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {submitButtonText}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
