var cx = require('classnames');

import React from 'react';

export default ({editing, file, onEdit, className, ...props}) => {
  if(editing) {
    return <Edit
      className={className}
      value={file}
      onEdit={onEdit}
      {...props} />;
  }

  return <span className={cx('value', className)} {...props}>
    {file}
  </span>;
}

class Edit extends React.Component {

  render() {
    const {className, value, ...props} = this.props;

    return <input
      type="text"
      className={cx('edit', className)}
      autoFocus={true}
      defaultValue={value.file}
      onBlur={this.finishEdit}
      onKeyDown={this.checkEnter}
      {...props} />;
  }

  checkEnter = (e) => {
    const ESCAPE_KEY = 27;
    const ENTER_KEY = 13;

    if (e.keyCode === ESCAPE_KEY) {
      this.cancelEdit();
    } else if (e.keyCode === ENTER_KEY) {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    const file = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(this.props.fileId, this.props.sectionId, file);
    }
  }

  cancelEdit = () => {
    if(this.props.onEdit) {
      this.props.onEdit(this.props.fileId, this.props.sectionId, this.props.value.file);
    }
  }
}
