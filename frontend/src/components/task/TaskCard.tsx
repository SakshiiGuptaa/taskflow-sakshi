import type { Task } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: Task["status"]
  ) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold">{task.title}</h3>

        <p className="text-sm text-slate-500">
          {task.description}
        </p>

        <select
          className="w-full border rounded p-2"
          value={task.status}
          onChange={(e) =>
            onStatusChange(
              task.id,
              e.target.value as Task["status"]
            )
          }
        >
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}