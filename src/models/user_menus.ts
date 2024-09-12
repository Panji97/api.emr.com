import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus, menusId } from './menus';
import type { users, usersId } from './users';

export interface user_menusAttributes {
  id: number;
  user_id?: number;
  menus_id?: number;
}

export type user_menusPk = "id";
export type user_menusId = user_menus[user_menusPk];
export type user_menusOptionalAttributes = "id" | "user_id" | "menus_id";
export type user_menusCreationAttributes = Optional<user_menusAttributes, user_menusOptionalAttributes>;

export class user_menus extends Model<user_menusAttributes, user_menusCreationAttributes> implements user_menusAttributes {
  id!: number;
  user_id?: number;
  menus_id?: number;

  // user_menus belongsTo menus via menus_id
  menu!: menus;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<menus>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<menus, menusId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<menus>;
  // user_menus belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_menus {
    return user_menus.init({
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
    menus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menus',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_menus',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_menus_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
