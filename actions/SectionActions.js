import dispatcher from "../example/dispatcher";

export function createSection(section) {
  dispatcher.dispatch({
    type: "CREATE_SECTION",
    section,
  });
}

//Not needed at the moment. Kept for future changes
/*export function addSection(section) {
  dispatcher.dispatch({
    type: "ADD_SECTION",
    section,
  });
}*/