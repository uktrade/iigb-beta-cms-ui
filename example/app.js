var axios = require('axios');
var cx = require('classnames');
var React = require('react');
var ReactDOM = require('react-dom');
var Tree = require('../lib/react-ui-tree.js');
var tree = require('./tree');
var _ = require('../node_modules/lodash');

import Section from "../dist/Section";
import * as SectionActions from '../actions/SectionActions';
import SectionStore from './SectionStore.js';
import FileStore from './FileStore.js';

require('../lib/react-ui-tree.scss');
require('./theme.scss');
require('./app.scss');

var App = React.createClass({

  getInitialState() {
    return {
      active: null,
      tree: {}
    };
  },

  componentDidMount: function() {
    let _this = this;
    this.serverRequest =
      axios
        .get('https://raw.githubusercontent.com/uktrade/iigb-beta-structure/master/structure/us.json')
        .then (function (result) {
          _this.setState({
            tree: {children: result.data}
          });
        })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  renderNode(node) {
    return (
      <span className={cx('node', {
        'is-active': node === this.state.active
        })} onClick={this.onClickNode.bind(null, node)}>
        {node.title}
      </span>
    );
  },

  onClickNode(node) {
    const section = node.sections;
    SectionStore.clearAll();
    const sections = SectionStore.createSection(section);
    this.setState({
      active: node,
      sections: sections
    });
  },

  createSections(section) {
    SectionActions.createSection({section: section, files: ''});
  },

  componentWillMount() {
    SectionStore.on("change", () => {
      SectionStore.clearAll();
      this.setState({
        sections: SectionStore.getAll(),
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

/*    //Add sections. Not needed at the moment
    SectionStore.on("added", () => {
      this.setState({
        sections: SectionStore.getAll(),
      });
    });*/
  },

  // componentWillUnmount() {
  //   FileStore.removeListener('change', SectionStore.getAll());
  // },

  render() {
    const sections = this.state.sections || [{section: '', files: ''}];

    const SectionComponents = sections.map((section) => {
      return <Section key={section.section} {...section}/>;
    });

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