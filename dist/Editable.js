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
      onKeyPress={this.checkEnter}
      {...props} />;
  }

  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    const file = e.target.value;

    if(this.props.onEdit) {
      this.props.onEdit(this.props.fileId, this.props.sectionId, file);
    }
  }
}
