module.exports = class UserDto {
  email;
  id;
  name;
  isActivated;
  allFilesSize;
  totalSize;
  constructor(model) {

    this.email = model.email;
    this.id = model.id;
    this.name = model.name;
    this.isActivated = model.isActivated;
    this.allFilesSize = model.allFilesSize
    this.totalSize = model.totalSize
  }
};
