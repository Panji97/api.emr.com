import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus_item, menus_itemId } from './menus_item';
import type { users, usersId } from './users';

export interface user_menus_itemAttributes {
  id: number;
  user_id?: number;
  menus_item_id?: number;
}

export type user_menus_itemPk = "id";
export type user_menus_itemId = user_menus_item[user_menus_itemPk];
export type user_menus_itemOptionalAttributes = "id" | "user_id" | "menus_item_id";
export type user_menus_itemCreationAttributes = Optional<user_menus_itemAttributes, user_menus_itemOptionalAttributes>;

export class user_menus_item extends Model<user_menus_itemAttributes, user_menus_itemCreationAttributes> implements user_menus_itemAttributes {
  id!: number;
  user_id?: number;
  menus_item_id?: number;

  // user_menus_item belongsTo menus_item via menus_item_id
  menus_item!: menus_item;
  getMenus_item!: Sequelize.BelongsToGetAssociationMixin<menus_item>;
  setMenus_item!: Sequelize.BelongsToSetAssociationMixin<menus_item, menus_itemId>;
  createMenus_item!: Sequelize.BelongsToCreateAssociationMixin<menus_item>;
  // user_menus_item belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_menus_item {
    return user_menus_item.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    menus_item_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menus_item',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_menus_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_menus_item_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
