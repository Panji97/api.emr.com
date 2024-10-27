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
import { roles_has_mchild as _roles_has_mchild } from "./roles_has_mchild";
import type { roles_has_mchildAttributes, roles_has_mchildCreationAttributes } from "./roles_has_mchild";
import { roles_has_mmain as _roles_has_mmain } from "./roles_has_mmain";
import type { roles_has_mmainAttributes, roles_has_mmainCreationAttributes } from "./roles_has_mmain";
import { roles_has_mparent as _roles_has_mparent } from "./roles_has_mparent";
import type { roles_has_mparentAttributes, roles_has_mparentCreationAttributes } from "./roles_has_mparent";
import { user_has_roles as _user_has_roles } from "./user_has_roles";
import type { user_has_rolesAttributes, user_has_rolesCreationAttributes } from "./user_has_roles";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _ms_mchild as ms_mchild,
  _ms_mmain as ms_mmain,
  _ms_mparent as ms_mparent,
  _ms_roles as ms_roles,
  _resetpassword as resetpassword,
  _roles_has_mchild as roles_has_mchild,
  _roles_has_mmain as roles_has_mmain,
  _roles_has_mparent as roles_has_mparent,
  _user_has_roles as user_has_roles,
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
  roles_has_mchildAttributes,
  roles_has_mchildCreationAttributes,
  roles_has_mmainAttributes,
  roles_has_mmainCreationAttributes,
  roles_has_mparentAttributes,
  roles_has_mparentCreationAttributes,
  user_has_rolesAttributes,
  user_has_rolesCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const ms_mchild = _ms_mchild.initModel(sequelize);
  const ms_mmain = _ms_mmain.initModel(sequelize);
  const ms_mparent = _ms_mparent.initModel(sequelize);
  const ms_roles = _ms_roles.initModel(sequelize);
  const resetpassword = _resetpassword.initModel(sequelize);
  const roles_has_mchild = _roles_has_mchild.initModel(sequelize);
  const roles_has_mmain = _roles_has_mmain.initModel(sequelize);
  const roles_has_mparent = _roles_has_mparent.initModel(sequelize);
  const user_has_roles = _user_has_roles.initModel(sequelize);
  const users = _users.initModel(sequelize);

  roles_has_mchild.belongsTo(ms_mchild, { as: "mchild", foreignKey: "mchild_id"});
  ms_mchild.hasMany(roles_has_mchild, { as: "roles_has_mchildren", foreignKey: "mchild_id"});
  ms_mchild.belongsTo(ms_mmain, { as: "menu", foreignKey: "menu_id"});
  ms_mmain.hasMany(ms_mchild, { as: "ms_mchildren", foreignKey: "menu_id"});
  roles_has_mchild.belongsTo(ms_mmain, { as: "mmain", foreignKey: "mmain_id"});
  ms_mmain.hasMany(roles_has_mchild, { as: "roles_has_mchildren", foreignKey: "mmain_id"});
  roles_has_mmain.belongsTo(ms_mmain, { as: "mmain", foreignKey: "mmain_id"});
  ms_mmain.hasMany(roles_has_mmain, { as: "roles_has_mmains", foreignKey: "mmain_id"});
  ms_mmain.belongsTo(ms_mparent, { as: "header", foreignKey: "header_id"});
  ms_mparent.hasMany(ms_mmain, { as: "ms_mmains", foreignKey: "header_id"});
  roles_has_mchild.belongsTo(ms_mparent, { as: "mparent", foreignKey: "mparent_id"});
  ms_mparent.hasMany(roles_has_mchild, { as: "roles_has_mchildren", foreignKey: "mparent_id"});
  roles_has_mmain.belongsTo(ms_mparent, { as: "mparent", foreignKey: "mparent_id"});
  ms_mparent.hasMany(roles_has_mmain, { as: "roles_has_mmains", foreignKey: "mparent_id"});
  roles_has_mparent.belongsTo(ms_mparent, { as: "mparent", foreignKey: "mparent_id"});
  ms_mparent.hasMany(roles_has_mparent, { as: "roles_has_mparents", foreignKey: "mparent_id"});
  roles_has_mchild.belongsTo(ms_roles, { as: "role", foreignKey: "role_id"});
  ms_roles.hasMany(roles_has_mchild, { as: "roles_has_mchildren", foreignKey: "role_id"});
  roles_has_mmain.belongsTo(ms_roles, { as: "role", foreignKey: "role_id"});
  ms_roles.hasMany(roles_has_mmain, { as: "roles_has_mmains", foreignKey: "role_id"});
  roles_has_mparent.belongsTo(ms_roles, { as: "role", foreignKey: "role_id"});
  ms_roles.hasMany(roles_has_mparent, { as: "roles_has_mparents", foreignKey: "role_id"});
  user_has_roles.belongsTo(ms_roles, { as: "role", foreignKey: "role_id"});
  ms_roles.hasMany(user_has_roles, { as: "user_has_roles", foreignKey: "role_id"});
  roles_has_mchild.belongsTo(roles_has_mmain, { as: "role_main", foreignKey: "role_main_id"});
  roles_has_mmain.hasMany(roles_has_mchild, { as: "roles_has_mchildren", foreignKey: "role_main_id"});
  roles_has_mchild.belongsTo(roles_has_mparent, { as: "role_parent", foreignKey: "role_parent_id"});
  roles_has_mparent.hasMany(roles_has_mchild, { as: "roles_has_mchildren", foreignKey: "role_parent_id"});
  roles_has_mmain.belongsTo(roles_has_mparent, { as: "role_parent", foreignKey: "role_parent_id"});
  roles_has_mparent.hasMany(roles_has_mmain, { as: "roles_has_mmains", foreignKey: "role_parent_id"});
  user_has_roles.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasOne(user_has_roles, { as: "user_has_role", foreignKey: "user_id"});

  return {
    ms_mchild: ms_mchild,
    ms_mmain: ms_mmain,
    ms_mparent: ms_mparent,
    ms_roles: ms_roles,
    resetpassword: resetpassword,
    roles_has_mchild: roles_has_mchild,
    roles_has_mmain: roles_has_mmain,
    roles_has_mparent: roles_has_mparent,
    user_has_roles: user_has_roles,
    users: users,
  };
}
