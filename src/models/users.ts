import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { user_menus, user_menusId } from './user_menus';
import type { user_menus_header, user_menus_headerId } from './user_menus_header';

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

  // users hasMany user_menus via user_id
  user_menus!: user_menus[];
  getUser_menus!: Sequelize.HasManyGetAssociationsMixin<user_menus>;
  setUser_menus!: Sequelize.HasManySetAssociationsMixin<user_menus, user_menusId>;
  addUser_menu!: Sequelize.HasManyAddAssociationMixin<user_menus, user_menusId>;
  addUser_menus!: Sequelize.HasManyAddAssociationsMixin<user_menus, user_menusId>;
  createUser_menu!: Sequelize.HasManyCreateAssociationMixin<user_menus>;
  removeUser_menu!: Sequelize.HasManyRemoveAssociationMixin<user_menus, user_menusId>;
  removeUser_menus!: Sequelize.HasManyRemoveAssociationsMixin<user_menus, user_menusId>;
  hasUser_menu!: Sequelize.HasManyHasAssociationMixin<user_menus, user_menusId>;
  hasUser_menus!: Sequelize.HasManyHasAssociationsMixin<user_menus, user_menusId>;
  countUser_menus!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany user_menus_header via user_id
  user_menus_headers!: user_menus_header[];
  getUser_menus_headers!: Sequelize.HasManyGetAssociationsMixin<user_menus_header>;
  setUser_menus_headers!: Sequelize.HasManySetAssociationsMixin<user_menus_header, user_menus_headerId>;
  addUser_menus_header!: Sequelize.HasManyAddAssociationMixin<user_menus_header, user_menus_headerId>;
  addUser_menus_headers!: Sequelize.HasManyAddAssociationsMixin<user_menus_header, user_menus_headerId>;
  createUser_menus_header!: Sequelize.HasManyCreateAssociationMixin<user_menus_header>;
  removeUser_menus_header!: Sequelize.HasManyRemoveAssociationMixin<user_menus_header, user_menus_headerId>;
  removeUser_menus_headers!: Sequelize.HasManyRemoveAssociationsMixin<user_menus_header, user_menus_headerId>;
  hasUser_menus_header!: Sequelize.HasManyHasAssociationMixin<user_menus_header, user_menus_headerId>;
  hasUser_menus_headers!: Sequelize.HasManyHasAssociationsMixin<user_menus_header, user_menus_headerId>;
  countUser_menus_headers!: Sequelize.HasManyCountAssociationsMixin;

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
