import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface roles_has_mmainAttributes {
  id: number;
  role_id: number;
  mparent_id: number;
  mmain_id: number;
  role_parent_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type roles_has_mmainPk = "id";
export type roles_has_mmainId = roles_has_mmain[roles_has_mmainPk];
export type roles_has_mmainOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type roles_has_mmainCreationAttributes = Optional<roles_has_mmainAttributes, roles_has_mmainOptionalAttributes>;

export class roles_has_mmain extends Model<roles_has_mmainAttributes, roles_has_mmainCreationAttributes> implements roles_has_mmainAttributes {
  id!: number;
  role_id!: number;
  mparent_id!: number;
  mmain_id!: number;
  role_parent_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof roles_has_mmain {
    return roles_has_mmain.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mparent_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mmain_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role_parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roles_has_mmain',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "roles_has_mparent_pk_1",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
