import type { Sequelize } from "sequelize";
import { menus as _menus } from "./menus";
import type { menusAttributes, menusCreationAttributes } from "./menus";
import { menus_header as _menus_header } from "./menus_header";
import type { menus_headerAttributes, menus_headerCreationAttributes } from "./menus_header";
import { menus_item as _menus_item } from "./menus_item";
import type { menus_itemAttributes, menus_itemCreationAttributes } from "./menus_item";
import { resetpassword as _resetpassword } from "./resetpassword";
import type { resetpasswordAttributes, resetpasswordCreationAttributes } from "./resetpassword";
import { user_menu as _user_menu } from "./user_menu";
import type { user_menuAttributes, user_menuCreationAttributes } from "./user_menu";
import { user_menu_header as _user_menu_header } from "./user_menu_header";
import type { user_menu_headerAttributes, user_menu_headerCreationAttributes } from "./user_menu_header";
import { user_menu_item as _user_menu_item } from "./user_menu_item";
import type { user_menu_itemAttributes, user_menu_itemCreationAttributes } from "./user_menu_item";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _menus as menus,
  _menus_header as menus_header,
  _menus_item as menus_item,
  _resetpassword as resetpassword,
  _user_menu as user_menu,
  _user_menu_header as user_menu_header,
  _user_menu_item as user_menu_item,
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
  user_menuAttributes,
  user_menuCreationAttributes,
  user_menu_headerAttributes,
  user_menu_headerCreationAttributes,
  user_menu_itemAttributes,
  user_menu_itemCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const menus = _menus.initModel(sequelize);
  const menus_header = _menus_header.initModel(sequelize);
  const menus_item = _menus_item.initModel(sequelize);
  const resetpassword = _resetpassword.initModel(sequelize);
  const user_menu = _user_menu.initModel(sequelize);
  const user_menu_header = _user_menu_header.initModel(sequelize);
  const user_menu_item = _user_menu_item.initModel(sequelize);
  const users = _users.initModel(sequelize);

  menus_item.belongsTo(menus, { as: "menu", foreignKey: "menu_id"});
  menus.hasMany(menus_item, { as: "menus_items", foreignKey: "menu_id"});
  user_menu.belongsTo(menus, { as: "menu", foreignKey: "menu_id"});
  menus.hasMany(user_menu, { as: "user_menus", foreignKey: "menu_id"});
  menus.belongsTo(menus_header, { as: "header", foreignKey: "header_id"});
  menus_header.hasMany(menus, { as: "menus", foreignKey: "header_id"});
  user_menu_header.belongsTo(menus_header, { as: "header", foreignKey: "header_id"});
  menus_header.hasMany(user_menu_header, { as: "user_menu_headers", foreignKey: "header_id"});
  user_menu.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_menu, { as: "user_menus", foreignKey: "user_id"});
  user_menu_header.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_menu_header, { as: "user_menu_headers", foreignKey: "user_id"});

  return {
    menus: menus,
    menus_header: menus_header,
    menus_item: menus_item,
    resetpassword: resetpassword,
    user_menu: user_menu,
    user_menu_header: user_menu_header,
    user_menu_item: user_menu_item,
    users: users,
  };
}
