const userService = require("../services/userService");

const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/apiError");
class UserContoller {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }
            const { email, password, name, totalSize } = req.body;

            const userData = await userService.registration(email, password, name, totalSize);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logIn(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log("Пароль", password);
            const userData = await userService.logIn(email, password);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            console.log(userData)
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logOut(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logOut(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            console.log('res', refreshToken)
            const userData = await userService.refresh(refreshToken);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;

            await userService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }
    async getUser(req, res, next) {
        try {
            const user = await userService.getAllUsers();

            res.json({ user });
        } catch (error) {
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const payload = req.body;

            const user = await userService.updateUser(payload);

            res.json({ user });
        } catch (error) {
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;

            const response = await userService.deleteUser(userId);

            res.json({ response });
        } catch (error) {
            next(error);
        }
    }
    async getUserInfo(req, res, next) {
        try {
            const { id } = req.params;
            const response = await userService.getUserInfo(id);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
    async deleteFileInFileList(req, res, next) {
        try {
            const { id } = req.params;
            const { fileIds } = req.body
            console.log(id)
            console.log('fileIds===', fileIds)
            const response = await userService.deleteFileInFileList(fileIds, id);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
    async removeFromDeleteFiles(req, res, next) {
        try {
            const { userId } = req.params;
            const { fileIds } = req.body
            const response = await userService.removeFromDeleteFiles(fileIds, userId);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }


}
module.exports = new UserContoller();
