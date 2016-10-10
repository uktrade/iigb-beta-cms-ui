var cx = require('classnames');

import React from "react";
import * as FileActions from '../actions/FileActions';
import SectionStore from '../example/SectionStore.js';
import Editable from './Editable';

let placeholder = document.createElement("li");
placeholder.className = "placeholder";
let input;

let Section = React.createClass({

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },

  dragEnd(e) {
    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);
    // Update data
    let data = this.props.files;
    let from = Number(this.dragged.dataset.id);
    let to = Number(this.over.dataset.id);
    if(from < to) to--;
    if(this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    FileActions.sortFile(data);
  },

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;
    this.over = e.target;
    // Inside the dragOver method
    let relY = e.clientY - this.over.offsetTop;
    let height = this.over.offsetHeight / 2;
    let parent = e.target.parentNode;

    if(relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
      this.nodePlacement = "before";
      parent.insertBefore(placeholder, e.target);
    }
  },

  renderFileList(){
    if (Array.isArray(this.props.files)){
      let rows = [];

      this.props.files.map((file, i) => {

        if (file.hasOwnProperty('editing')) {
          rows.push(<li data-id={i}
                        key={i}
                        className={cx('file', {
                          'is-active': this
                        })} >
            <Editable
              editing={true}
              fileId={i}
              sectionId={this.props.sectionId}
              className='editing'
              value={file}
              onEdit={this.onEditFile}/>
          </li>)
        } else {
          rows.push(<li data-id={i}
                      key={i}
                      draggable="true"
                      onDragEnd={this.dragEnd}
                      onDragStart={this.dragStart}
                      className={cx('file', {
                        'is-active': this
                      })} >
                      <Editable
                        className="editable"
                        file={file}
                        onClick={this.loadFile.bind(null, file, i)} />
                      <button
                        className="edit"
                        onClick={this.editFile.bind(null, i, this.props.sectionId, file)}>E</button>
                      <button
                        className="delete"
                        onClick={this.deleteFile.bind(null, i, this.props.sectionId)}>X</button>
                  </li>)
        }
      })
      return (
        <ul onDragOver={this.dragOver}>Files
          {rows}
          <div>
            <form onSubmit={e => {
              e.preventDefault();
              if (!this.input.value.trim()) {
                return;
              }
              FileActions.addFile(this.input.value, this.props.files);
              this.input.value = '';
            }}>
              <input ref={node => {
                this.input = node
              }} />
              <button type="submit">
                Add file
              </button>
            </form>
          </div>
        </ul>
      );
    } else {
      return (
        <ul>File
          <li className={cx('file', {
            'is-active': this.props.files.section
          })} onClick={this.loadFile.bind(null, this.props.files)} onContextMenu={this.contextMenu}>
            {this.props.files}
          </li>
          <div>
            <form onSubmit={e => {
              e.preventDefault();
              if (!this.input.value.trim()) {
                return;
              }
              SectionStore.addFileNameToSection(this.props, this.input.value);
              this.input.value = '';
            }}>
              <input ref={node => {
                this.input = node
              }} />
              <button type="submit">
                Add/rename file
              </button>
            </form>
          </div>
        </ul>
      );
    }
  },

  loadFile(file, editing) {
    const url = 'https://raw.githubusercontent.com/uktrade/iigb-beta-content/master/content/' + file;
    alert (url);
    // Render .md page on right section
    //FileActions.getFile(url)
  },

  deleteFile(fileId, sectionId, e) {
    // Avoid bubbling to edit
    e.stopPropagation();
    SectionStore.deleteFile(fileId, sectionId)
  },

  editFile(fileId, sectionId, fileName) {
    SectionStore.editFile(fileId, sectionId, fileName)
  },

  onEditFile(fileId, sectionId, fileName) {
    SectionStore.renameFile(fileId, sectionId, fileName)
  },

  contextMenu: function(e) {
    e.preventDefault();
    console.log(e)
    // Do something here....
    alert('right click');
  },

  render() {
    return (
      <div>Section: {this.props.section}
        {this.renderFileList()}
      </div>
    )
  }
});

module.exports = Section;