import { EventEmitter } from "events";
import dispatcher from "./dispatcher";

class FileStore extends EventEmitter {

  constructor() {
    super();
  }

  addFile(name, files) {
    if (Array.isArray(files)) {
      let data = files;
      data.push(name);
      this.emit("newAdded");
    }
  }

  sortFiles() {
    this.emit("fileSorted");
  }

  handleAction(action) {
    switch(action.type) {
      case "ADD_FILE": {
        this.addFile(action.name, action.files);
        break;
      }
      case "SORT_FILE": {
        this.sortFiles(action.files);
        break;
      }
    }
  }
}

const fileStore = new FileStore;
dispatcher.register(fileStore.handleAction.bind(fileStore));
export default fileStore;