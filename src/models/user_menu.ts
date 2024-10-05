import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus, menusId } from './menus';
import type { users, usersId } from './users';

export interface user_menuAttributes {
  id: number;
  user_id: number;
  menu_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type user_menuPk = "id";
export type user_menuId = user_menu[user_menuPk];
export type user_menuOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type user_menuCreationAttributes = Optional<user_menuAttributes, user_menuOptionalAttributes>;

export class user_menu extends Model<user_menuAttributes, user_menuCreationAttributes> implements user_menuAttributes {
  id!: number;
  user_id!: number;
  menu_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // user_menu belongsTo menus via menu_id
  menu!: menus;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<menus>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<menus, menusId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<menus>;
  // user_menu belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_menu {
    return user_menu.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'menus',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_menu',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "newtable_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
