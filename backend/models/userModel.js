const toUserDTO = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  role: user.role,
  profile_image: user.profile_image,
  createdAt: user.created_at,
});

module.exports = { toUserDTO };
