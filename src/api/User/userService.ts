import User from "../../types/user";
export default class UserService {
  static getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }

  static addUser(user: User): void {
    const users = this.getAllUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }
  static deleteUser(uuid: string): void {
    const users = this.getAllUsers().filter((user) => user.uuid !== uuid);
    localStorage.setItem("users", JSON.stringify(users));
  }

  static updateUser(uuid: string, newData: Partial<User>): void {
    const users = this.getAllUsers().map((user) => {
      if (user.uuid === uuid) {
        Object.assign(user, newData);
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  static getUser(uuid: string): User | undefined {
    const users = this.getAllUsers();
    const user = users.find((user) => user.uuid === uuid);
    return user;
  }
}
