import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ms_mmain, ms_mmainId } from './ms_mmain';

export interface ms_mparentAttributes {
  id: number;
  label: string;
  icon?: string;
  to_path?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ms_mparentPk = "id";
export type ms_mparentId = ms_mparent[ms_mparentPk];
export type ms_mparentOptionalAttributes = "id" | "icon" | "to_path" | "createdAt" | "updatedAt" | "deletedAt";
export type ms_mparentCreationAttributes = Optional<ms_mparentAttributes, ms_mparentOptionalAttributes>;

export class ms_mparent extends Model<ms_mparentAttributes, ms_mparentCreationAttributes> implements ms_mparentAttributes {
  id!: number;
  label!: string;
  icon?: string;
  to_path?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // ms_mparent hasMany ms_mmain via header_id
  ms_mmains!: ms_mmain[];
  getMs_mmains!: Sequelize.HasManyGetAssociationsMixin<ms_mmain>;
  setMs_mmains!: Sequelize.HasManySetAssociationsMixin<ms_mmain, ms_mmainId>;
  addMs_mmain!: Sequelize.HasManyAddAssociationMixin<ms_mmain, ms_mmainId>;
  addMs_mmains!: Sequelize.HasManyAddAssociationsMixin<ms_mmain, ms_mmainId>;
  createMs_mmain!: Sequelize.HasManyCreateAssociationMixin<ms_mmain>;
  removeMs_mmain!: Sequelize.HasManyRemoveAssociationMixin<ms_mmain, ms_mmainId>;
  removeMs_mmains!: Sequelize.HasManyRemoveAssociationsMixin<ms_mmain, ms_mmainId>;
  hasMs_mmain!: Sequelize.HasManyHasAssociationMixin<ms_mmain, ms_mmainId>;
  hasMs_mmains!: Sequelize.HasManyHasAssociationsMixin<ms_mmain, ms_mmainId>;
  countMs_mmains!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ms_mparent {
    return ms_mparent.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    }
  }, {
    sequelize,
    tableName: 'ms_mparent',
    schema: 'public',
    timestamps: true,
    paranoid: true,
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
