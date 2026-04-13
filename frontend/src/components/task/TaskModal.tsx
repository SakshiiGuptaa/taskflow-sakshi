import { useEffect, useState } from "react";
import type { Task } from "../../types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  task?: Task | null;
}

export default function TaskModal({
  open,
  onClose,
  onSubmit,
  task,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assignee_id: "",
    due_date: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority,
        assignee_id: task.assignee_id || "",
        due_date: task.due_date || "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        assignee_id: "",
        due_date: "",
      });
    }
  }, [task]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {task ? "Edit Task" : "Create Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded p-2"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            className="w-full border rounded p-2"
            value={form.priority}
            onChange={(e) =>
              setForm({
                ...form,
                priority: e.target.value,
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <Input
            type="date"
            value={form.due_date}
            onChange={(e) =>
              setForm({
                ...form,
                due_date: e.target.value,
              })
            }
          />

          <Button
            className="w-full"
            onClick={() => {
              onSubmit(form);
              onClose();
            }}
          >
            {task ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}