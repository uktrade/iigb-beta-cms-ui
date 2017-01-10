var g = require('../github.conf.json');

module.exports = {
  NODE_ENV: '"production"',
  GITHUB: {
    structure: {
      org: '"' + (process.env.IIGB_STRUCURE_ORG ||  g.structure.org) + '"',
      repo: '"' + (process.env.IIGB_STRUCTURE_REPO || g.structure.repo) + '"',
      dev: '"' + (process.env.IIGB_STRUCTURE_DEV || g.structure.dev) + '"',
      live: '"' + (process.env.IIGB_STRUCTURE_LIVE || g.structure.live) + '"',
      path: '"' + (process.env.IIGB_STRUCTURE_PATH || g.structure.path) + '"'
    },
    content: {
      org: '"' + (process.env.IIGB_CONTENT_ORG || g.content.org) + '"',
      repo: '"' + (process.env.IIGB_CONTENT_REPO || g.content.repo) + '"',
      dev: '"' + (process.env.IIGB_CONTENT_DEV || g.content.dev) + '"',
      live: '"' + (process.env.IIGB_CONTENT_LIVE || g.content.live) + '"',
      path: '"' + (process.env.IIGB_CONTENT_PATH || g.content.path) + '"',
      mediaPath: '"' + (process.env.IIGB_CONTENT_MEDIA_PATH || g.content.mediaPath) + '"'
    },
    gateKeeper: '"' + (process.env.IIGB_GATE_KEEPER || g.gateKeeper) + '"',
    clientId: '"' + (process.env.IIGB_CLIENT_ID || g.clientId) + '"'
  }
}
