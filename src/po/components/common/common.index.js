const TopNavigationComponent = require("./topnavigation.component");
const FiltersComponent = require("./filters.component");
const FramesComponent = require("./frames.component");
const PopupComponent = require("./popup.component");

class Components {
  constructor() {
    this.topNavigationComponent = new TopNavigationComponent();
    this.filtersComponent = new FiltersComponent();
    this.framesComponent = new FramesComponent();
    this.popupComponent = new PopupComponent();
  }
}

module.exports = Components;
