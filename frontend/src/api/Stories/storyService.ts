import Story from "../../types/story";
export default class StoryService {
  static getAllStories(): Story[] {
    return JSON.parse(localStorage.getItem("stories") || "[]");
  }

  static addStory(story: Story): void {
    const stories = this.getAllStories();
    stories.push(story);
    localStorage.setItem("stories", JSON.stringify(stories));
  }

  static deleteStory(uuid: string): void {
    const stories = this.getAllStories().filter((story) => story.uuid !== uuid);
    localStorage.setItem("stories", JSON.stringify(stories));
  }

  static updateStory(uuid: string, newData: Partial<Story>): void {
    const stories = this.getAllStories().map((story) => {
      if (story.uuid === uuid) {
        Object.assign(story, newData);
      }
      return story;
    });
    localStorage.setItem("stories", JSON.stringify(stories));
  }

  static getStory(uuid: string): Story | undefined {
    const stories = this.getAllStories();
    return stories.find((story) => story.uuid === uuid);
  }
}
