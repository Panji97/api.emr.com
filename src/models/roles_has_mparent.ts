import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ms_mparent, ms_mparentId } from './ms_mparent';
import type { ms_roles, ms_rolesId } from './ms_roles';
import type { roles_has_mchild, roles_has_mchildId } from './roles_has_mchild';
import type { roles_has_mmain, roles_has_mmainId } from './roles_has_mmain';

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

  // roles_has_mparent belongsTo ms_mparent via mparent_id
  mparent!: ms_mparent;
  getMparent!: Sequelize.BelongsToGetAssociationMixin<ms_mparent>;
  setMparent!: Sequelize.BelongsToSetAssociationMixin<ms_mparent, ms_mparentId>;
  createMparent!: Sequelize.BelongsToCreateAssociationMixin<ms_mparent>;
  // roles_has_mparent belongsTo ms_roles via role_id
  role!: ms_roles;
  getRole!: Sequelize.BelongsToGetAssociationMixin<ms_roles>;
  setRole!: Sequelize.BelongsToSetAssociationMixin<ms_roles, ms_rolesId>;
  createRole!: Sequelize.BelongsToCreateAssociationMixin<ms_roles>;
  // roles_has_mparent hasMany roles_has_mchild via role_parent_id
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
  // roles_has_mparent hasMany roles_has_mmain via role_parent_id
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
      allowNull: false,
      references: {
        model: 'ms_roles',
        key: 'id'
      }
    },
    mparent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ms_mparent',
        key: 'id'
      }
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
