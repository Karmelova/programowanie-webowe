import {Project} from "../../types/project";
export default class ProjectService {
  static getAllProjects(): Project[] {
    return JSON.parse(localStorage.getItem("projects") || "[]");
  }

  static addProject(project: Project): void {
    const projects = this.getAllProjects();
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static deleteProject(uuid: string): void {
    const projects = this.getAllProjects().filter(
      (project) => project.uuid !== uuid
    );
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  static updateProject(uuid: string, newData: Partial<Project>): void {
    const projects = this.getAllProjects().map((project) => {
      if (project.uuid === uuid) {
        Object.assign(project, newData);
      }
      return project;
    });
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  static getProject(uuid: string): Project | undefined {
    const projects = this.getAllProjects();
    const project = projects.find((project) => project.uuid === uuid);
    return project;
  }
}
