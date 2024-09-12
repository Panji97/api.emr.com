import type { Sequelize } from "sequelize";
import { menus as _menus } from "./menus";
import type { menusAttributes, menusCreationAttributes } from "./menus";
import { menus_header as _menus_header } from "./menus_header";
import type { menus_headerAttributes, menus_headerCreationAttributes } from "./menus_header";
import { menus_item as _menus_item } from "./menus_item";
import type { menus_itemAttributes, menus_itemCreationAttributes } from "./menus_item";
import { resetpassword as _resetpassword } from "./resetpassword";
import type { resetpasswordAttributes, resetpasswordCreationAttributes } from "./resetpassword";
import { user_menus as _user_menus } from "./user_menus";
import type { user_menusAttributes, user_menusCreationAttributes } from "./user_menus";
import { user_menus_header as _user_menus_header } from "./user_menus_header";
import type { user_menus_headerAttributes, user_menus_headerCreationAttributes } from "./user_menus_header";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _menus as menus,
  _menus_header as menus_header,
  _menus_item as menus_item,
  _resetpassword as resetpassword,
  _user_menus as user_menus,
  _user_menus_header as user_menus_header,
  _users as users,
};

export type {
  menusAttributes,
  menusCreationAttributes,
  menus_headerAttributes,
  menus_headerCreationAttributes,
  menus_itemAttributes,
  menus_itemCreationAttributes,
  resetpasswordAttributes,
  resetpasswordCreationAttributes,
  user_menusAttributes,
  user_menusCreationAttributes,
  user_menus_headerAttributes,
  user_menus_headerCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const menus = _menus.initModel(sequelize);
  const menus_header = _menus_header.initModel(sequelize);
  const menus_item = _menus_item.initModel(sequelize);
  const resetpassword = _resetpassword.initModel(sequelize);
  const user_menus = _user_menus.initModel(sequelize);
  const user_menus_header = _user_menus_header.initModel(sequelize);
  const users = _users.initModel(sequelize);

  menus_item.belongsTo(menus, { as: "menu", foreignKey: "menu_id"});
  menus.hasMany(menus_item, { as: "menus_items", foreignKey: "menu_id"});
  user_menus.belongsTo(menus, { as: "menu", foreignKey: "menus_id"});
  menus.hasMany(user_menus, { as: "user_menus", foreignKey: "menus_id"});
  menus.belongsTo(menus_header, { as: "header", foreignKey: "header_id"});
  menus_header.hasMany(menus, { as: "menus", foreignKey: "header_id"});
  user_menus_header.belongsTo(menus_header, { as: "menus_header", foreignKey: "menus_header_id"});
  menus_header.hasMany(user_menus_header, { as: "user_menus_headers", foreignKey: "menus_header_id"});
  user_menus.belongsTo(user_menus_header, { as: "user_menus_header", foreignKey: "user_menus_header_id"});
  user_menus_header.hasMany(user_menus, { as: "user_menus", foreignKey: "user_menus_header_id"});
  user_menus.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_menus, { as: "user_menus", foreignKey: "user_id"});
  user_menus_header.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_menus_header, { as: "user_menus_headers", foreignKey: "user_id"});

  return {
    menus: menus,
    menus_header: menus_header,
    menus_item: menus_item,
    resetpassword: resetpassword,
    user_menus: user_menus,
    user_menus_header: user_menus_header,
    users: users,
  };
}
