import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ms_mmain, ms_mmainId } from './ms_mmain';

export interface ms_mchildAttributes {
  id: number;
  menu_id?: number;
  label?: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ms_mchildPk = "id";
export type ms_mchildId = ms_mchild[ms_mchildPk];
export type ms_mchildOptionalAttributes = "id" | "menu_id" | "label" | "icon" | "to_path" | "url" | "target" | "createdAt" | "updatedAt" | "deletedAt";
export type ms_mchildCreationAttributes = Optional<ms_mchildAttributes, ms_mchildOptionalAttributes>;

export class ms_mchild extends Model<ms_mchildAttributes, ms_mchildCreationAttributes> implements ms_mchildAttributes {
  id!: number;
  menu_id?: number;
  label?: string;
  icon?: string;
  to_path?: string;
  url?: string;
  target?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // ms_mchild belongsTo ms_mmain via menu_id
  menu!: ms_mmain;
  getMenu!: Sequelize.BelongsToGetAssociationMixin<ms_mmain>;
  setMenu!: Sequelize.BelongsToSetAssociationMixin<ms_mmain, ms_mmainId>;
  createMenu!: Sequelize.BelongsToCreateAssociationMixin<ms_mmain>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ms_mchild {
    return ms_mchild.init({
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
        model: 'ms_mmain',
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
    tableName: 'ms_mchild',
    schema: 'public',
    timestamps: true,
    paranoid: true,
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
