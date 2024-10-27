import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { roles_has_mchild, roles_has_mchildId } from './roles_has_mchild';
import type { roles_has_mmain, roles_has_mmainId } from './roles_has_mmain';
import type { roles_has_mparent, roles_has_mparentId } from './roles_has_mparent';
import type { user_has_roles, user_has_rolesId } from './user_has_roles';

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

  // ms_roles hasMany roles_has_mchild via role_id
  roles_has_mchildren!: roles_has_mchild[];
  getRoles_has_mchildren!: Sequelize.HasManyGetAssociationsMixin<roles_has_mchild>;
  setRoles_has_mchildren!: Sequelize.HasManySetAssociationsMixin<roles_has_mchild, roles_has_mchildId>;
  addRoles_has_mchild!: Sequelize.HasManyAddAssociationMixin<roles_has_mchild, roles_has_mchildId>;
  addRoles_has_mchildren!: Sequelize.HasManyAddAssociationsMixin<roles_has_mchild, roles_has_mchildId>;
  createRoles_has_mchild!: Sequelize.HasManyCreateAssociationMixin<roles_has_mchild>;
  removeRoles_has_mchild!: Sequelize.HasManyRemoveAssociationMixin<roles_has_mchild, roles_has_mchildId>;
  removeRoles_has_mchildren!: Sequelize.HasManyRemoveAssociationsMixin<roles_has_mchild, roles_has_mchildId>;
  hasRoles_has_mchild!: Sequelize.HasManyHasAssociationMixin<roles_has_mchild, roles_has_mchildId>;
  hasRoles_has_mchildren!: Sequelize.HasManyHasAssociationsMixin<roles_has_mchild, roles_has_mchildId>;
  countRoles_has_mchildren!: Sequelize.HasManyCountAssociationsMixin;
  // ms_roles hasMany roles_has_mmain via role_id
  roles_has_mmains!: roles_has_mmain[];
  getRoles_has_mmains!: Sequelize.HasManyGetAssociationsMixin<roles_has_mmain>;
  setRoles_has_mmains!: Sequelize.HasManySetAssociationsMixin<roles_has_mmain, roles_has_mmainId>;
  addRoles_has_mmain!: Sequelize.HasManyAddAssociationMixin<roles_has_mmain, roles_has_mmainId>;
  addRoles_has_mmains!: Sequelize.HasManyAddAssociationsMixin<roles_has_mmain, roles_has_mmainId>;
  createRoles_has_mmain!: Sequelize.HasManyCreateAssociationMixin<roles_has_mmain>;
  removeRoles_has_mmain!: Sequelize.HasManyRemoveAssociationMixin<roles_has_mmain, roles_has_mmainId>;
  removeRoles_has_mmains!: Sequelize.HasManyRemoveAssociationsMixin<roles_has_mmain, roles_has_mmainId>;
  hasRoles_has_mmain!: Sequelize.HasManyHasAssociationMixin<roles_has_mmain, roles_has_mmainId>;
  hasRoles_has_mmains!: Sequelize.HasManyHasAssociationsMixin<roles_has_mmain, roles_has_mmainId>;
  countRoles_has_mmains!: Sequelize.HasManyCountAssociationsMixin;
  // ms_roles hasMany roles_has_mparent via role_id
  roles_has_mparents!: roles_has_mparent[];
  getRoles_has_mparents!: Sequelize.HasManyGetAssociationsMixin<roles_has_mparent>;
  setRoles_has_mparents!: Sequelize.HasManySetAssociationsMixin<roles_has_mparent, roles_has_mparentId>;
  addRoles_has_mparent!: Sequelize.HasManyAddAssociationMixin<roles_has_mparent, roles_has_mparentId>;
  addRoles_has_mparents!: Sequelize.HasManyAddAssociationsMixin<roles_has_mparent, roles_has_mparentId>;
  createRoles_has_mparent!: Sequelize.HasManyCreateAssociationMixin<roles_has_mparent>;
  removeRoles_has_mparent!: Sequelize.HasManyRemoveAssociationMixin<roles_has_mparent, roles_has_mparentId>;
  removeRoles_has_mparents!: Sequelize.HasManyRemoveAssociationsMixin<roles_has_mparent, roles_has_mparentId>;
  hasRoles_has_mparent!: Sequelize.HasManyHasAssociationMixin<roles_has_mparent, roles_has_mparentId>;
  hasRoles_has_mparents!: Sequelize.HasManyHasAssociationsMixin<roles_has_mparent, roles_has_mparentId>;
  countRoles_has_mparents!: Sequelize.HasManyCountAssociationsMixin;
  // ms_roles hasMany user_has_roles via role_id
  user_has_roles!: user_has_roles[];
  getUser_has_roles!: Sequelize.HasManyGetAssociationsMixin<user_has_roles>;
  setUser_has_roles!: Sequelize.HasManySetAssociationsMixin<user_has_roles, user_has_rolesId>;
  addUser_has_role!: Sequelize.HasManyAddAssociationMixin<user_has_roles, user_has_rolesId>;
  addUser_has_roles!: Sequelize.HasManyAddAssociationsMixin<user_has_roles, user_has_rolesId>;
  createUser_has_role!: Sequelize.HasManyCreateAssociationMixin<user_has_roles>;
  removeUser_has_role!: Sequelize.HasManyRemoveAssociationMixin<user_has_roles, user_has_rolesId>;
  removeUser_has_roles!: Sequelize.HasManyRemoveAssociationsMixin<user_has_roles, user_has_rolesId>;
  hasUser_has_role!: Sequelize.HasManyHasAssociationMixin<user_has_roles, user_has_rolesId>;
  hasUser_has_roles!: Sequelize.HasManyHasAssociationsMixin<user_has_roles, user_has_rolesId>;
  countUser_has_roles!: Sequelize.HasManyCountAssociationsMixin;

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
