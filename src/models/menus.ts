import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { items, itemsId } from './items';

export interface menusAttributes {
  id: number;
  label: string;
}

export type menusPk = "id";
export type menusId = menus[menusPk];
export type menusOptionalAttributes = "id";
export type menusCreationAttributes = Optional<menusAttributes, menusOptionalAttributes>;

export class menus extends Model<menusAttributes, menusCreationAttributes> implements menusAttributes {
  id!: number;
  label!: string;

  // menus hasMany items via menu_id
  items!: items[];
  getItems!: Sequelize.HasManyGetAssociationsMixin<items>;
  setItems!: Sequelize.HasManySetAssociationsMixin<items, itemsId>;
  addItem!: Sequelize.HasManyAddAssociationMixin<items, itemsId>;
  addItems!: Sequelize.HasManyAddAssociationsMixin<items, itemsId>;
  createItem!: Sequelize.HasManyCreateAssociationMixin<items>;
  removeItem!: Sequelize.HasManyRemoveAssociationMixin<items, itemsId>;
  removeItems!: Sequelize.HasManyRemoveAssociationsMixin<items, itemsId>;
  hasItem!: Sequelize.HasManyHasAssociationMixin<items, itemsId>;
  hasItems!: Sequelize.HasManyHasAssociationsMixin<items, itemsId>;
  countItems!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof menus {
    return menus.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false
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
