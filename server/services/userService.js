const User = require("../models/user");

const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dto/user.dto");
const ApiError = require("../exceptions/apiError.js");
const JWT = require("../models/jwt");
const editFileList = require("../utils/editFiles");

const deleteFilesById = require("../utils/deleteFilesById");
class UserService {
  async registration(email, password, name, totalSize) {

    const candidate = await User.findOne({
      where: { email },
    });

    if (candidate !== null) {
      throw ApiError.BadRequest(`Пользователь с таким email уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({
      email,
      password: hashPassword,
      name,
      activationLink,
      totalSize

    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activate/${activationLink}`
    );
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });


    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.UnauthorizedError("Некорреткная ссылка активации");
    }

    user.isActivated = true;
    await user.save();
  }
  async logIn(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не был найден");
    }
    const isEqualPassword = await bcrypt.compare(password, user.password);
    if (!isEqualPassword) {
      throw ApiError.BadRequest("Пароль неверный");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logOut(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async getAllUsers() {
    const users = await User.findAll();
    return users;
  }
  async updateUser(payload) {
    const user = await User.update(
      {
        email: payload.email,
        name: payload.name,
      },
      {
        where: { id: payload.id },
      }
    );
    return user;
  }
  async deleteUser(userId) {
    await JWT.destroy({ where: { user: userId } })
    const user = await User.findOne({ where: { id: userId } })
    const allFiles = user.files.concat(user.deleteFiles)

    deleteFilesById(allFiles)
    const res = await User.destroy({ where: { id: userId } });
    return res
  }
  async getUserInfo(id) {
    const user = await User.findOne({ where: { id } })
    const userDto = new UserDto(user);
    console.log(userDto)
    return userDto
  }
  async deleteFileInFileList(fileIds, id) {
    const user = await User.findOne({ where: { id } })

    const updateFile = editFileList(fileIds, user.files)
    console.log(user)
    const res = await user.update({
      files: updateFile,
      deleteFiles: user.deleteFiles.concat(fileIds),

    })
    console.log(user)
    return res
  }
  async removeFromDeleteFiles(fileIds, userId) {
    const user = await User.findOne({ where: { id: userId } })

    const updateFile = editFileList(fileIds, user.deleteFiles)

    const res = await user.update({
      files: user.files.concat(fileIds),
      deleteFiles: updateFile,

    })
    console.log(user)
    return res
  }
  async getDeletedFiles(id) {
    const user = await User.findOne({ where: { id } })

    return user.deleteFiles
  }


}
module.exports = new UserService();
