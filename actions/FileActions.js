import dispatcher from "../example/dispatcher";

export function addFile(name, files) {
  dispatcher.dispatch({
    type: "ADD_FILE",
    name,
    files,
  });
}

export function sortFile() {
  dispatcher.dispatch({
    type: "SORT_FILE",
  });
}