import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus, menusId } from './menus';

export interface menus_headerAttributes {
  id: number;
  label?: string;
  icon?: string;
  to_path?: string;
}

export type menus_headerPk = "id";
export type menus_headerId = menus_header[menus_headerPk];
export type menus_headerOptionalAttributes = "id" | "label" | "icon" | "to_path";
export type menus_headerCreationAttributes = Optional<menus_headerAttributes, menus_headerOptionalAttributes>;

export class menus_header extends Model<menus_headerAttributes, menus_headerCreationAttributes> implements menus_headerAttributes {
  id!: number;
  label?: string;
  icon?: string;
  to_path?: string;

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
    ]
  });
  }
}
