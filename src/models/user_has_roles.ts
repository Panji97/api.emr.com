import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ms_roles, ms_rolesId } from './ms_roles';
import type { users, usersId } from './users';

export interface user_has_rolesAttributes {
  id: number;
  user_id: number;
  role_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type user_has_rolesPk = "id";
export type user_has_rolesId = user_has_roles[user_has_rolesPk];
export type user_has_rolesOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type user_has_rolesCreationAttributes = Optional<user_has_rolesAttributes, user_has_rolesOptionalAttributes>;

export class user_has_roles extends Model<user_has_rolesAttributes, user_has_rolesCreationAttributes> implements user_has_rolesAttributes {
  id!: number;
  user_id!: number;
  role_id!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // user_has_roles belongsTo ms_roles via role_id
  role!: ms_roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<ms_roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<ms_roles, ms_rolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<ms_roles>;
  // user_has_roles belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user_has_roles {
    return user_has_roles.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "user_has_roles_unique"
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ms_roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_has_roles',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "user_has_roles_unique",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
