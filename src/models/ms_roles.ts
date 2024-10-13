import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ms_rolesAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type ms_rolesPk = "id";
export type ms_rolesId = ms_roles[ms_rolesPk];
export type ms_rolesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type ms_rolesCreationAttributes = Optional<ms_rolesAttributes, ms_rolesOptionalAttributes>;

export class ms_roles extends Model<ms_rolesAttributes, ms_rolesCreationAttributes> implements ms_rolesAttributes {
  id!: number;
  name!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof ms_roles {
    return ms_roles.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "ms_roles_unique"
    }
  }, {
    sequelize,
    tableName: 'ms_roles',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "ms_roles_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ms_roles_unique",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
