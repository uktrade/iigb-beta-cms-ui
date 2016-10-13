var axios = require('axios');

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

  getFile(url) {
    axios
      .get(url)
      .then (function (result) {
        _this.setState({
          tree: {children: result.data}
        });
      })
  }

  renameFile(newName, id, files) {
    if (Array.isArray(files)) {
      let data = files;
      data[id].push(newName);
      this.emit("newName");
    }
  }

  sortFiles() {
    this.emit("fileSorted");
  }

  handleAction(action) {
    switch(action.type) {
      case "ADD_FILE": {
        this.addFile(action.file, action.files);
        break;
      }
      case "DELETE_FILE": {
        this.deleteFile(action.id);
        break;
      }
      case "RENAME_FILE": {
        this.renameFile(action.file, action.files, action.id);
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