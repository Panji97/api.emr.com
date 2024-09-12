import type { Sequelize } from "sequelize";
import { menus as _menus } from "./menus";
import type { menusAttributes, menusCreationAttributes } from "./menus";
import { menus_header as _menus_header } from "./menus_header";
import type { menus_headerAttributes, menus_headerCreationAttributes } from "./menus_header";
import { menus_item as _menus_item } from "./menus_item";
import type { menus_itemAttributes, menus_itemCreationAttributes } from "./menus_item";
import { resetpassword as _resetpassword } from "./resetpassword";
import type { resetpasswordAttributes, resetpasswordCreationAttributes } from "./resetpassword";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _menus as menus,
  _menus_header as menus_header,
  _menus_item as menus_item,
  _resetpassword as resetpassword,
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
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const menus = _menus.initModel(sequelize);
  const menus_header = _menus_header.initModel(sequelize);
  const menus_item = _menus_item.initModel(sequelize);
  const resetpassword = _resetpassword.initModel(sequelize);
  const users = _users.initModel(sequelize);

  menus_item.belongsTo(menus, { as: "menu", foreignKey: "menu_id"});
  menus.hasMany(menus_item, { as: "menus_items", foreignKey: "menu_id"});
  menus.belongsTo(menus_header, { as: "header", foreignKey: "header_id"});
  menus_header.hasMany(menus, { as: "menus", foreignKey: "header_id"});

  return {
    menus: menus,
    menus_header: menus_header,
    menus_item: menus_item,
    resetpassword: resetpassword,
    users: users,
  };
}
