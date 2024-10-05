import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus_header, menus_headerId } from './menus_header';
import type { users, usersId } from './users';

export interface user_menu_headerAttributes {
  user_id: number;
  header_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  id: number;
}

export type user_menu_headerPk = "id";
export type user_menu_headerId = user_menu_header[user_menu_headerPk];
export type user_menu_headerOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt" | "id";
export type user_menu_headerCreationAttributes = Optional<user_menu_headerAttributes, user_menu_headerOptionalAttributes>;

export class user_menu_header extends Model<user_menu_headerAttributes, user_menu_headerCreationAttributes> implements user_menu_headerAttributes {
  user_id!: number;
  header_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  id!: number;

  // user_menu_header belongsTo menus_header via header_id
  header!: menus_header;
  getHeader!: Sequelize.BelongsToGetAssociationMixin<menus_header>;
  setHeader!: Sequelize.BelongsToSetAssociationMixin<menus_header, menus_headerId>;
  createHeader!: Sequelize.BelongsToCreateAssociationMixin<menus_header>;
  // user_menu_header belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_menu_header {
    return user_menu_header.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    header_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'menus_header',
        key: 'id'
      }
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'user_menu_header',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "user_menu_header_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
