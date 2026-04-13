import type { Project } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: Props) {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-4 space-y-3">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <h2 className="font-semibold text-lg">
            {project.name}
          </h2>

          <p className="text-sm text-slate-500">
            {project.description || "No description"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(project)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}