import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus, menusId } from './menus';
import type { user_menu_header, user_menu_headerId } from './user_menu_header';

export interface menus_headerAttributes {
  id: number;
  label?: string;
  icon?: string;
  to_path?: string;
  key?: string;
}

export type menus_headerPk = "id";
export type menus_headerId = menus_header[menus_headerPk];
export type menus_headerOptionalAttributes = "id" | "label" | "icon" | "to_path" | "key";
export type menus_headerCreationAttributes = Optional<menus_headerAttributes, menus_headerOptionalAttributes>;

export class menus_header extends Model<menus_headerAttributes, menus_headerCreationAttributes> implements menus_headerAttributes {
  id!: number;
  label?: string;
  icon?: string;
  to_path?: string;
  key?: string;

  // menus_header hasMany menus via header_id
  menus!: menus[];
  getMenus!: Sequelize.HasManyGetAssociationsMixin<menus>;
  setMenus!: Sequelize.HasManySetAssociationsMixin<menus, menusId>;
  addMenu!: Sequelize.HasManyAddAssociationMixin<menus, menusId>;
  addMenus!: Sequelize.HasManyAddAssociationsMixin<menus, menusId>;
  createMenu!: Sequelize.HasManyCreateAssociationMixin<menus>;
  removeMenu!: Sequelize.HasManyRemoveAssociationMixin<menus, menusId>;
  removeMenus!: Sequelize.HasManyRemoveAssociationsMixin<menus, menusId>;
  hasMenu!: Sequelize.HasManyHasAssociationMixin<menus, menusId>;
  hasMenus!: Sequelize.HasManyHasAssociationsMixin<menus, menusId>;
  countMenus!: Sequelize.HasManyCountAssociationsMixin;
  // menus_header hasMany user_menu_header via header_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof menus_header {
    return menus_header.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    to_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: "menus_header_unique"
    }
  }, {
    sequelize,
    tableName: 'menus_header',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "menus_header_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "menus_header_unique",
        unique: true,
        fields: [
          { name: "key" },
        ]
      },
    ]
  });
  }
}
