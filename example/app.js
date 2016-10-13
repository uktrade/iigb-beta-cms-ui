var axios = require('axios');
var cx = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('../lib/react-ui-tree.js');
var tree = require('./tree');
var _ = require('../node_modules/lodash');

import Section from "../dist/Section";
import SectionStore from './SectionStore.js';
import FileStore from './FileStore.js';

require('../lib/react-ui-tree.scss');
require('./theme.scss');
require('./app.scss');

var App = React.createClass({

  getInitialState() {
    return {
      active: null,
      // tree: tree,
      tree: {},
    };
  },

  componentDidMount: function() {
    let _this = this;
    this.serverRequest =
      axios
        .get('https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/en_US.json')
        .then (function (result) {
          _this.setState({
            tree: {children: result.data}
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  renderNode: function(node) {
    return (
      <span className={cx('node', {
        'is-active': node === this.state.active
        })} onClick={this.onClickNode.bind(null, node)}>
        {node.pageTitle}
      </span>
    );
  },

  onClickNode: function(node) {
    const section = node.contentBlocks;
    SectionStore.clearAll();
    const sections = SectionStore.createSection(section);
    // node.sections = sections;
    this.setState({
      active: node,
      sections: sections
    });
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },

  componentWillMount: function() {
    SectionStore.on("change", () => {
      SectionStore.clearAll();
      this.setState({
        active: SectionStore.getAll(),
      });
      console.log('change-count', SectionStore.listenerCount('change'))
    });

    SectionStore.on("fileAdded", () => {
      let id =  SectionStore.id;
      let section = SectionStore.section;
      let sect = SectionStore.getAll();
      this.state.active.sections[section] = sect[id].files;
      this.setState({
        active: this.state.active,
      });
      console.log('add-count', SectionStore.listenerCount('fileAdded'))
    });

    SectionStore.on("fileDeleted", () => {
      this.setState({
        active: SectionStore.getAll(),
      });
      console.log('deleted-count', SectionStore.listenerCount('fileDeleted'))
    });

    SectionStore.on("fileToEdit", () => {
      this.setState({
        active: SectionStore.getAll(),
      });
      console.log('toEdit-count', SectionStore.listenerCount('fileToEdit'))
    });

    SectionStore.on("fileRenamed", () => {
      this.setState({
        active: SectionStore.getAll(),
      });
      console.log('renamed-count', SectionStore.listenerCount('fileRenamed'))
    });

    FileStore.on("newAdded", () => {
      this.setState({
        sections: SectionStore.getAll(),
      });
      console.log('new-count', FileStore.listenerCount('newAdded'))
    });

    FileStore.on("fileSorted", () => {
      this.setState({
        sections: SectionStore.getAll(),
      });
      console.log('sort-count', FileStore.listenerCount('fileSorted'))
    });

    FileStore.on("newName", () => {
      let id =  FileStore.id;
      let section = FileStore.section;
      let sect = FileStore.getAll();
      this.state.active.sections[section] = sect[id].files;
      this.setState({
        active: this.state.active,
      });
      console.log('new-count', FileStore.listenerCount('newName'))
    });

    FileStore.on("fileSorted", () => {
      this.setState({
        sections: SectionStore.getAll(),
      });
      console.log('sort-count', FileStore.listenerCount('fileSorted'))
    });

/*    //Add sections. Not needed at the moment
    SectionStore.on("added", () => {
      this.setState({
        sections: SectionStore.getAll(),
      });
    });*/
  },

  render() {
    const sections = this.state.sections;
    let SectionComponents = <div />;

    if (sections) {
      SectionComponents = sections.map((section) => {
        return <Section key={section.section} {...section}/>;
      });
    }

    return (
      <div className="app">
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
        <div className="sections">
          {SectionComponents}
        </div>
        <div className="inspector">
          <pre>
          {JSON.stringify(this.state.tree, null, '  ')}
          </pre>
         </div>
      </div>
    );
  },

  handleChange(tree) {
    this.setState({
      tree: tree
    });
  },

  updateTree() {
    var tree = this.state.tree;
    tree.children.push({module: 'test'});
    this.setState({
      tree: tree
    });
  },

  renderSection(sections) {
    Object.keys(sections).forEach(function(key) {
      console.log(key, obj[key]);
    });
  }
});

ReactDOM.render(<App/>, document.getElementById('app'));