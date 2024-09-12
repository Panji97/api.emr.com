import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { menus_header, menus_headerId } from './menus_header';
import type { menus_item, menus_itemId } from './menus_item';

export interface menusAttributes {
  id: number;
  header_id?: number;
  label?: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
  badge?: string;
  class?: string;
  preventexact?: boolean;
}

export type menusPk = "id";
export type menusId = menus[menusPk];
export type menusOptionalAttributes = "id" | "header_id" | "label" | "icon" | "to_path" | "url" | "target" | "badge" | "class" | "preventexact";
export type menusCreationAttributes = Optional<menusAttributes, menusOptionalAttributes>;

export class menus extends Model<menusAttributes, menusCreationAttributes> implements menusAttributes {
  id!: number;
  header_id?: number;
  label?: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
  badge?: string;
  class?: string;
  preventexact?: boolean;

  // menus hasMany menus_item via menu_id
  menus_items!: menus_item[];
  getMenus_items!: Sequelize.HasManyGetAssociationsMixin<menus_item>;
  setMenus_items!: Sequelize.HasManySetAssociationsMixin<menus_item, menus_itemId>;
  addMenus_item!: Sequelize.HasManyAddAssociationMixin<menus_item, menus_itemId>;
  addMenus_items!: Sequelize.HasManyAddAssociationsMixin<menus_item, menus_itemId>;
  createMenus_item!: Sequelize.HasManyCreateAssociationMixin<menus_item>;
  removeMenus_item!: Sequelize.HasManyRemoveAssociationMixin<menus_item, menus_itemId>;
  removeMenus_items!: Sequelize.HasManyRemoveAssociationsMixin<menus_item, menus_itemId>;
  hasMenus_item!: Sequelize.HasManyHasAssociationMixin<menus_item, menus_itemId>;
  hasMenus_items!: Sequelize.HasManyHasAssociationsMixin<menus_item, menus_itemId>;
  countMenus_items!: Sequelize.HasManyCountAssociationsMixin;
  // menus belongsTo menus_header via header_id
  header!: menus_header;
  getHeader!: Sequelize.BelongsToGetAssociationMixin<menus_header>;
  setHeader!: Sequelize.BelongsToSetAssociationMixin<menus_header, menus_headerId>;
  createHeader!: Sequelize.BelongsToCreateAssociationMixin<menus_header>;

  static initModel(sequelize: Sequelize.Sequelize): typeof menus {
    return menus.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    header_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menus_header',
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
    },
    badge: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    preventexact: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'menus',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "menus_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
