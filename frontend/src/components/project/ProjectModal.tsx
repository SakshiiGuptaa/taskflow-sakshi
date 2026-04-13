import { useEffect, useState } from "react";
import type { Project } from "../../types";

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
  onSubmit: (data: {
    name: string;
    description: string;
  }) => void;
  project?: Project | null;
}

export default function ProjectModal({
  open,
  onClose,
  onSubmit,
  project,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        description: project.description || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
      });
    }
  }, [project]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Create Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Project Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
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

          <Button
            className="w-full"
            onClick={() => {
              onSubmit(form);
              onClose();
            }}
          >
            {project ? "Update" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}