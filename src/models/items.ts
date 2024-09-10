import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus, menusId } from './menus';

export interface itemsAttributes {
  id: number;
  menu_id?: number;
  label: string;
  icon?: string;
  to?: string;
  url?: string;
  target?: string;
  badge?: string;
  class?: string;
  preventExact?: boolean;
}

export type itemsPk = "id";
export type itemsId = items[itemsPk];
export type itemsOptionalAttributes = "id" | "menu_id" | "icon" | "to" | "url" | "target" | "badge" | "class" | "preventExact";
export type itemsCreationAttributes = Optional<itemsAttributes, itemsOptionalAttributes>;

export class items extends Model<itemsAttributes, itemsCreationAttributes> implements itemsAttributes {
  id!: number;
  menu_id?: number;
  label!: string;
  icon?: string;
  to?: string;
  url?: string;
  target?: string;
  badge?: string;
  class?: string;
  preventExact?: boolean;

  // items belongsTo menus via menu_id
  menu!: menus;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<menus>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<menus, menusId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<menus>;

  static initModel(sequelize: Sequelize.Sequelize): typeof items {
    return items.init({
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
    to: {
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
    preventExact: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'items',
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
