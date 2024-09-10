import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus, menusId } from './menus';

export interface menu_itemsAttributes {
  id: number;
  menu_id?: number;
  label: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
  badge?: string;
  class?: string;
  prevent_exact?: boolean;
}

export type menu_itemsPk = "id";
export type menu_itemsId = menu_items[menu_itemsPk];
export type menu_itemsOptionalAttributes = "id" | "menu_id" | "icon" | "to_path" | "url" | "target" | "badge" | "class" | "prevent_exact";
export type menu_itemsCreationAttributes = Optional<menu_itemsAttributes, menu_itemsOptionalAttributes>;

export class menu_items extends Model<menu_itemsAttributes, menu_itemsCreationAttributes> implements menu_itemsAttributes {
  id!: number;
  menu_id?: number;
  label!: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
  badge?: string;
  class?: string;
  prevent_exact?: boolean;

  // menu_items belongsTo menus via menu_id
  menu!: menus;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<menus>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<menus, menusId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<menus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof menu_items {
    return menu_items.init({
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
      allowNull: false
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
    },
    badge: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prevent_exact: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'menu_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "menu_items_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
