import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus_header, menus_headerId } from './menus_header';
import type { users, usersId } from './users';

export interface user_menus_headerAttributes {
  id: number;
  user_id?: number;
  menus_header_id?: number;
}

export type user_menus_headerPk = "id";
export type user_menus_headerId = user_menus_header[user_menus_headerPk];
export type user_menus_headerOptionalAttributes = "id" | "user_id" | "menus_header_id";
export type user_menus_headerCreationAttributes = Optional<user_menus_headerAttributes, user_menus_headerOptionalAttributes>;

export class user_menus_header extends Model<user_menus_headerAttributes, user_menus_headerCreationAttributes> implements user_menus_headerAttributes {
  id!: number;
  user_id?: number;
  menus_header_id?: number;

  // user_menus_header belongsTo menus_header via menus_header_id
  menus_header!: menus_header;
  getMenus_header!: Sequelize.BelongsToGetAssociationMixin<menus_header>;
  setMenus_header!: Sequelize.BelongsToSetAssociationMixin<menus_header, menus_headerId>;
  createMenus_header!: Sequelize.BelongsToCreateAssociationMixin<menus_header>;
  // user_menus_header belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_menus_header {
    return user_menus_header.init({
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
    menus_header_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menus_header',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_menus_header',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_menus_header_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
