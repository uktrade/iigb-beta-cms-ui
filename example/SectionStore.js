import { EventEmitter } from "events";
import dispatcher from "./dispatcher";

var _ = require('../node_modules/lodash');
var createFragment = require('../node_modules/react-addons-create-fragment');


class SectionStore extends EventEmitter {

  constructor() {
    super();
  }

  createSection(section) {
    let sections = [];

    Object.keys(section).map((key, i) => {
      sections.push({section: key, files: section[key], sectionId: i});
    });

    this.emit("change");
    return this.sections = sections;
  }

  //Not used at the moment
  addSection(title) {
    let sections = this.sections;

    sections.push({section: title, files: 'No files yet'});

    this.emit("added");
    return this.sections = sections;
  }

  addFileNameToSection (props, newName) {
    // if (!props.files) {
      let sections = this.sections;
      let id = _.findIndex(sections, function (obj) {
        return obj.section === props.section;
      });
      sections[id].files.name = newName;
      this.id = id;
      this.section = sections[id].section;
      this.emit("fileAdded");
    // }
  }

  deleteFile(fileId, sectionId) {
    this.sections[sectionId].files.splice(fileId, 1);
    this.emit("fileDeleted");
    return this.sections;
  }

  editFile(fileId, sectionId, fileName) {
    this.sections[sectionId].files[fileId] = {editing: true, file: fileName};
    this.emit("fileToEdit");
    return this.sections;
  }

  renameFile(fileId, sectionId, fileName) {
    this.sections[sectionId].files[fileId] = fileName;
    this.emit("fileRenamed");
    return this.sections;
  }

  clearAll() {
    return this.sections = [];
  }

  getAll() {
    return this.sections;
  }

  handleAction(action) {
    switch(action.type) {
      case "CREATE_SECTION": {
        this.createSection(action.section);
        break;
      }
      case "REVERT_SECTION": {
        this.revertSection(action.section);
        break;
      }
      case "ADD_SECTION": {
        this.addSection(action.section);
        break;
      }
      case "ADD_NEW_FILE": {
        this.addFileNameToSection(action.section, action.file);
        break;
      }
    }
  }
}

const sectionStore = new SectionStore;
dispatcher.register(sectionStore.handleAction.bind(sectionStore));
export default sectionStore;