import type { Sequelize } from "sequelize";
import { ms_mchild as _ms_mchild } from "./ms_mchild";
import type { ms_mchildAttributes, ms_mchildCreationAttributes } from "./ms_mchild";
import { ms_mmain as _ms_mmain } from "./ms_mmain";
import type { ms_mmainAttributes, ms_mmainCreationAttributes } from "./ms_mmain";
import { ms_mparent as _ms_mparent } from "./ms_mparent";
import type { ms_mparentAttributes, ms_mparentCreationAttributes } from "./ms_mparent";
import { ms_roles as _ms_roles } from "./ms_roles";
import type { ms_rolesAttributes, ms_rolesCreationAttributes } from "./ms_roles";
import { resetpassword as _resetpassword } from "./resetpassword";
import type { resetpasswordAttributes, resetpasswordCreationAttributes } from "./resetpassword";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _ms_mchild as ms_mchild,
  _ms_mmain as ms_mmain,
  _ms_mparent as ms_mparent,
  _ms_roles as ms_roles,
  _resetpassword as resetpassword,
  _users as users,
};

export type {
  ms_mchildAttributes,
  ms_mchildCreationAttributes,
  ms_mmainAttributes,
  ms_mmainCreationAttributes,
  ms_mparentAttributes,
  ms_mparentCreationAttributes,
  ms_rolesAttributes,
  ms_rolesCreationAttributes,
  resetpasswordAttributes,
  resetpasswordCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const ms_mchild = _ms_mchild.initModel(sequelize);
  const ms_mmain = _ms_mmain.initModel(sequelize);
  const ms_mparent = _ms_mparent.initModel(sequelize);
  const ms_roles = _ms_roles.initModel(sequelize);
  const resetpassword = _resetpassword.initModel(sequelize);
  const users = _users.initModel(sequelize);

  ms_mchild.belongsTo(ms_mmain, { as: "menu", foreignKey: "menu_id"});
  ms_mmain.hasMany(ms_mchild, { as: "ms_mchildren", foreignKey: "menu_id"});
  ms_mmain.belongsTo(ms_mparent, { as: "header", foreignKey: "header_id"});
  ms_mparent.hasMany(ms_mmain, { as: "ms_mmains", foreignKey: "header_id"});

  return {
    ms_mchild: ms_mchild,
    ms_mmain: ms_mmain,
    ms_mparent: ms_mparent,
    ms_roles: ms_roles,
    resetpassword: resetpassword,
    users: users,
  };
}
