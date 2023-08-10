const createTokenUser = (user: IUser) => {
  return { name: user.name, userId: user._id, role: user.role };
};

export default createTokenUser;
