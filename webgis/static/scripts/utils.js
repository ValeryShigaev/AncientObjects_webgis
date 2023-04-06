export const icon = window.L.icon
export const icons = {
  iconStable: icon({
    iconSize: [20, 20],
    iconAnchor: [13, 27],
    popupAnchor:  [1, -24],
    iconUrl: '../static/images/marker-icon.png',
  }),
  iconSelected: icon({
    iconSize: [20, 20],
    iconAnchor: [13, 27],
    popupAnchor:  [1, -24],
    iconUrl: '../static/images/icon-selected.png',
  })
};
export const errorMessage = {
  appError: "This application is temporarily unavailable",
  moveError: "Move service is temporarily unavailable",
  deleteError: "Delete service is temporarily unavailable",
  updateError: "Update service is temporarily unavailable",
  createError: "Create service is temporarily unavailable",
  noName: "Enter a name",
  noType: "Select a type"
};
export const infoMessage = {
  clickMove: "And now click where to move",
  clickObject: "Click on the object",
  clickMap: "Click on the map",
};