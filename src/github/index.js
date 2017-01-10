/*
 * See github-api usage at http://github-tools.github.io/github/docs/3.0.0
 */
import GitHub from 'github-api';
var conf = process.env.GITHUB;
var gh_token = require('js-cookie').get('gh_token');
var github = new GitHub({
  token: gh_token
});
var structures = github.getRepo(conf.structure.org, conf.structure.repo);
var media = github.getRepo(conf.content.org, conf.content.repo);
var sitePattern = new RegExp(".+?_.+?.json");
var contents = github.getRepo(conf.content.org, conf.content.repo);

export default {
  //load structure file list
  loadSites() {
    return loadStructure(conf.structure.path)
      .then(function(data) {
        var files = data || [];
        var sites = [];
        for (var i in files) {
          var file = files[i];
          if (file.type === 'file') {
            if (sitePattern.test(file.name)) {
              sites.push(file);
            }
          }
        }
        return sites;
      });
  },
  loadSite(path) {
    return loadStructure(path);
  },
  /*
   *  Update site content
   */
  update(site) {
    // if(!site.changed) {
    //   //Nothing to update
    //   return;
    // }
    return structures
      .writeFile(
        conf.structure.dev,
        site.path,
        JSON.stringify(site.content),
        'Update ' + site.name,
        {}
      );
  },
  updateContent(path,content) {
    return contents
    .writeFile(
      conf.content.dev,
      conf.content.path + '/' + path,
      content,
      'Update' + path,
      {}
    );
  },
  create(path,fileName, file) {
    return media
      .writeFile(
        conf.content.live,
        path + '/' + fileName,
        file,
        'Upload '+ fileName,
        {encode: false}
      )
      .then(function(response){
        return response.data;
      });
  },
  loadMedia(path) {
    var _path = path ?  path : conf.content.mediaPath;
    return media
      .getContents(
        conf.content.live, //TODO: create dev for content path,
        _path,
        true
      )
      .then(function(response){
        return response.data;
      });
  },
  getMediaRoot() {
    return conf.content.mediaPath;
  },
  loadContent(path) {
    var _path = conf.content.path + '/' + path;
    return contents
      .getContents(
        conf.content.dev,
        _path,
        true
      )
      .then(function(response){
        return response.data;
      });
  }
};

function loadStructure(path) {
  return structures
    .getContents(
      conf.structure.dev,
      path,
      true
    )
    .then(function(response){
      return response.data;
    });
}
