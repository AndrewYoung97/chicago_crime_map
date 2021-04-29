class location {
  // constructor
  constructor(data) {
    this.loc = data;
  }
  
  getBlockInfo() {
    return this.loc.block;
  }

  getLocationDescrip() {
    return this.loc._location_description;
  }

  getX() {
    return this.loc.x_coordinate;
  }

  getY() {
    return this.loc.y_coordinate;
  }

  getLatitude() {
    return this.loc.latitude;
  }

  getLongitude() {
    return this.loc.longitude;
  }
}
export default location
