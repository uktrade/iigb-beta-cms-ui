import dispatcher from "../example/dispatcher";

export function addFile(name, files) {
  dispatcher.dispatch({
    type: "ADD_FILE",
    name,
    files,
  });
}

export function getFile(url) {
  dispatcher.dispatch({
    type: "GET_FILE",
    url,
  });
}

export function startRenameFile(name, id) {
  dispatcher.dispatch({
    type: "RENAME_FILE",
    name,
    id,
  });
}

export function endRenameFile(name, id) {
  dispatcher.dispatch({
    type: "RENAME_FILE",
    name,
    id,
  });
}

export function sortFile() {
  dispatcher.dispatch({
    type: "SORT_FILE",
  });
}