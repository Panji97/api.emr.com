import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus, menusId } from './menus';

export interface menus_itemAttributes {
  id: number;
  menu_id?: number;
  label?: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
}

export type menus_itemPk = "id";
export type menus_itemId = menus_item[menus_itemPk];
export type menus_itemOptionalAttributes = "id" | "menu_id" | "label" | "icon" | "to_path" | "url" | "target";
export type menus_itemCreationAttributes = Optional<menus_itemAttributes, menus_itemOptionalAttributes>;

export class menus_item extends Model<menus_itemAttributes, menus_itemCreationAttributes> implements menus_itemAttributes {
  id!: number;
  menu_id?: number;
  label?: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;

  // menus_item belongsTo menus via menu_id
  menu!: menus;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<menus>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<menus, menusId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<menus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof menus_item {
    return menus_item.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menus',
        key: 'id'
      }
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
    url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    target: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'menus_item',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "menus_item_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
