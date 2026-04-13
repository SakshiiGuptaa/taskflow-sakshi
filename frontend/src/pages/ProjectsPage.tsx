import { useEffect, useState } from "react";
import api from "../services/api";

import type { Project } from "../types";

import Navbar from "../components/layout/Navbar";
import ProjectCard from "../components/project/ProjectCard";
import ProjectModal from "../components/project/ProjectModal";

import { Button } from "../components/ui/button";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects || res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateOrUpdate = async (data: {
    name: string;
    description: string;
  }) => {
    if (editingProject) {
      await api.patch(`/projects/${editingProject.id}`, data);
    } else {
      await api.post("/projects", data);
    }

    setEditingProject(null);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <>
      <Navbar />

      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Your Projects
          </h1>

          <Button onClick={() => setModalOpen(true)}>
            New Project
          </Button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={(project) => {
                  setEditingProject(project);
                  setModalOpen(true);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <ProjectModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingProject(null);
          }}
          onSubmit={handleCreateOrUpdate}
          project={editingProject}
        />
      </main>
    </>
  );
}