import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user_menu, user_menuId } from './user_menu';
import type { user_menu_header, user_menu_headerId } from './user_menu_header';

export interface usersAttributes {
  email: string;
  username?: string;
  password: string;
  token?: string;
  rememberme?: boolean;
  verify?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  id: number;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "username" | "token" | "rememberme" | "verify" | "createdAt" | "updatedAt" | "deletedAt" | "id";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  email!: string;
  username?: string;
  password!: string;
  token?: string;
  rememberme?: boolean;
  verify?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  id!: number;

  // users hasMany user_menu via user_id
  user_menus!: user_menu[];
  getUser_menus!: Sequelize.HasManyGetAssociationsMixin<user_menu>;
  setUser_menus!: Sequelize.HasManySetAssociationsMixin<user_menu, user_menuId>;
  addUser_menu!: Sequelize.HasManyAddAssociationMixin<user_menu, user_menuId>;
  addUser_menus!: Sequelize.HasManyAddAssociationsMixin<user_menu, user_menuId>;
  createUser_menu!: Sequelize.HasManyCreateAssociationMixin<user_menu>;
  removeUser_menu!: Sequelize.HasManyRemoveAssociationMixin<user_menu, user_menuId>;
  removeUser_menus!: Sequelize.HasManyRemoveAssociationsMixin<user_menu, user_menuId>;
  hasUser_menu!: Sequelize.HasManyHasAssociationMixin<user_menu, user_menuId>;
  hasUser_menus!: Sequelize.HasManyHasAssociationsMixin<user_menu, user_menuId>;
  countUser_menus!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany user_menu_header via user_id
  user_menu_headers!: user_menu_header[];
  getUser_menu_headers!: Sequelize.HasManyGetAssociationsMixin<user_menu_header>;
  setUser_menu_headers!: Sequelize.HasManySetAssociationsMixin<user_menu_header, user_menu_headerId>;
  addUser_menu_header!: Sequelize.HasManyAddAssociationMixin<user_menu_header, user_menu_headerId>;
  addUser_menu_headers!: Sequelize.HasManyAddAssociationsMixin<user_menu_header, user_menu_headerId>;
  createUser_menu_header!: Sequelize.HasManyCreateAssociationMixin<user_menu_header>;
  removeUser_menu_header!: Sequelize.HasManyRemoveAssociationMixin<user_menu_header, user_menu_headerId>;
  removeUser_menu_headers!: Sequelize.HasManyRemoveAssociationsMixin<user_menu_header, user_menu_headerId>;
  hasUser_menu_header!: Sequelize.HasManyHasAssociationMixin<user_menu_header, user_menu_headerId>;
  hasUser_menu_headers!: Sequelize.HasManyHasAssociationsMixin<user_menu_header, user_menu_headerId>;
  countUser_menu_headers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rememberme: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    verify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
