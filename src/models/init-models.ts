import type { Sequelize } from "sequelize";
import { items as _items } from "./items";
import type { itemsAttributes, itemsCreationAttributes } from "./items";
import { menus as _menus } from "./menus";
import type { menusAttributes, menusCreationAttributes } from "./menus";
import { resetpassword as _resetpassword } from "./resetpassword";
import type { resetpasswordAttributes, resetpasswordCreationAttributes } from "./resetpassword";
import { users as _users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  _items as items,
  _menus as menus,
  _resetpassword as resetpassword,
  _users as users,
};

export type {
  itemsAttributes,
  itemsCreationAttributes,
  menusAttributes,
  menusCreationAttributes,
  resetpasswordAttributes,
  resetpasswordCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const items = _items.initModel(sequelize);
  const menus = _menus.initModel(sequelize);
  const resetpassword = _resetpassword.initModel(sequelize);
  const users = _users.initModel(sequelize);

  items.belongsTo(menus, { as: "menu", foreignKey: "menu_id"});
  menus.hasMany(items, { as: "items", foreignKey: "menu_id"});

  return {
    items: items,
    menus: menus,
    resetpassword: resetpassword,
    users: users,
  };
}
