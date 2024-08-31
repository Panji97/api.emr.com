import type { Sequelize } from "sequelize";
import { resetpassword as _resetpassword } from "./resetpassword";
import type { resetpasswordAttributes, resetpasswordCreationAttributes } from "./resetpassword";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _resetpassword as resetpassword,
  _users as users,
};

export type {
  resetpasswordAttributes,
  resetpasswordCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const resetpassword = _resetpassword.initModel(sequelize);
  const users = _users.initModel(sequelize);


  return {
    resetpassword: resetpassword,
    users: users,
  };
}
