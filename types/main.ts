import { Image, Project, ProjectSection, ProjectsOnScopes, ProjectType } from "@prisma/client";

export type CombinedProject = Partial<Project> & {
    type: Partial<ProjectType>;
    sections: (Partial<ProjectSection> & { images: Partial<Image>[] })[];
    scopes: Partial<ProjectsOnScopes>[];
};