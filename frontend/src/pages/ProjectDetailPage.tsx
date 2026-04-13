import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import type { Task } from "../types";

import Navbar from "../components/layout/Navbar";
import TaskCard from "../components/task/TaskCard";
import TaskModal from "../components/task/TaskModal";

import { Button } from "../components/ui/button";

export default function ProjectDetailPage() {
  const { id } = useParams();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [statusFilter, setStatusFilter] = useState("");

  const fetchProject = async () => {
    const res = await api.get(`/projects/${id}`);
    setProject(res.data);
  };

  const fetchTasks = async () => {
    const query = statusFilter
      ? `?status=${statusFilter}`
      : "";

    const res = await api.get(
      `/projects/${id}/tasks${query}`
    );

    setTasks(res.data.tasks || res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter]);

  const handleCreateOrUpdate = async (data: any) => {
    if (editingTask) {
      await api.patch(`/tasks/${editingTask.id}`, data);
    } else {
      await api.post(`/projects/${id}/tasks`, data);
    }

    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (taskId: string) => {
    await api.delete(`/tasks/${taskId}`);
    fetchTasks();
  };

  const handleStatusChange = async (
    taskId: string,
    status: Task["status"]
  ) => {
    const previousTasks = [...tasks];

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status }
          : task
      )
    );

    try {
      await api.patch(`/tasks/${taskId}`, { status });
    } catch {
      setTasks(previousTasks);
    }
  };

  return (
    <>
      <Navbar />

      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {project?.name}
            </h1>

            <p className="text-slate-500">
              {project?.description}
            </p>
          </div>

          <Button onClick={() => setModalOpen(true)}>
            New Task
          </Button>
        </div>

        <div className="mb-4">
          <select
            className="border rounded p-2"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="">All Statuses</option>
            <option value="todo">Todo</option>
            <option value="in_progress">
              In Progress
            </option>
            <option value="done">Done</option>
          </select>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(task) => {
                  setEditingTask(task);
                  setModalOpen(true);
                }}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        <TaskModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleCreateOrUpdate}
          task={editingTask}
        />
      </main>
    </>
  );
}