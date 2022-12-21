import TasksCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Project, Task } from "@prisma/client";
import { cookies } from "next/headers";

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      tasks: true,
    },
  });

  return project;
};

export interface ProjectPageParams {
  id: string;
}

const ProjectPage = async ({ params }: { params: ProjectPageParams }) => {
  const project =
    (await getData(params.id)) || ({} as Project & { tasks: Task[] });
  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <TasksCard tasks={project.tasks} title={project.name} />
    </div>
  );
};

export default ProjectPage;
