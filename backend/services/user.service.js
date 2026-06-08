const bcrypt = require("bcrypt");
const {
  findUserById,
  findUserWithPasswordById,
  updateUserProfile,
  updateUserPassword,
  getAllUsers,
  softDeleteUser,
} = require("../repositories/user.repository");

const SALT_ROUNDS = 10;

function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

const getProfileService = async (id) => {
  const user = await findUserById(id);
  if (!user) throw createError("Хэрэглэгч олдсонгүй", 404);
  return user;
};

const updateProfileService = async (id, data) => {
  const { username, profile_image } = data;
  const user = await findUserById(id);
  if (!user) throw createError("Хэрэглэгч олдсонгүй", 404);

  await updateUserProfile(id, username || user.username, profile_image || user.profile_image);
  return { message: "Профайл амжилттай шинэчлэгдлээ" };
};

const changePasswordService = async (id, data) => {
  const { currentPassword, newPassword } = data;
  const user = await findUserWithPasswordById(id);

  if (!user) throw createError("Хэрэглэгч олдсонгүй", 404);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw createError("Одоогийн нууц үг буруу", 400);

  const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await updateUserPassword(id, hashed);
  return { message: "Нууц үг амжилттай солигдлоо" };
};

const getAllUsersService = async () => getAllUsers();

const deleteUserService = async (id) => {
  const user = await findUserById(id);
  if (!user) throw createError("Хэрэглэгч олдсонгүй", 404);

  await softDeleteUser(id);
  return { message: "Хэрэглэгч устгагдлаа" };
};

module.exports = {
  getProfileService,
  updateProfileService,
  changePasswordService,
  getAllUsersService,
  deleteUserService,
};
