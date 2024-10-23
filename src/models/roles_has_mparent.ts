import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface roles_has_mparentAttributes {
  id: number;
  role_id: number;
  mparent_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type roles_has_mparentPk = "id";
export type roles_has_mparentId = roles_has_mparent[roles_has_mparentPk];
export type roles_has_mparentOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type roles_has_mparentCreationAttributes = Optional<roles_has_mparentAttributes, roles_has_mparentOptionalAttributes>;

export class roles_has_mparent extends Model<roles_has_mparentAttributes, roles_has_mparentCreationAttributes> implements roles_has_mparentAttributes {
  id!: number;
  role_id!: number;
  mparent_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof roles_has_mparent {
    return roles_has_mparent.init({
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
    }
  }, {
    sequelize,
    tableName: 'roles_has_mparent',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "roles_has_mparent_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
