import Task from "../../types/tasks";
export default class TaskService {
  static getAllTasks(): Task[] {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }

  static addTask(task: Task): void {
    const tasks = this.getAllTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(task));
  }

  static deleteTask(uuid: string): void {
    const tasks = this.getAllTasks().filter((task) => task.uuid !== uuid);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static updateTask(uuid: string, newData: Partial<Task>): void {
    const tasks = this.getAllTasks().map((task) => {
      if (task.uuid === uuid) {
        Object.assign(task, newData);
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  static getTask(uuid: string): Task | undefined {
    const tasks = this.getAllTasks();
    return tasks.find((task) => task.uuid === uuid);
  }
}
