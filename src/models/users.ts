import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface usersAttributes {
  email: string;
  username?: string;
  password: string;
  token?: string;
  rememberme?: boolean;
  verify?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type usersPk = "email";
export type usersId = users[usersPk];
export type usersOptionalAttributes = "username" | "token" | "rememberme" | "verify" | "createdAt" | "updatedAt" | "deletedAt";
export type usersCreationAttributes = Optional<usersAttributes, usersOptionalAttributes>;

export class users extends Model<usersAttributes, usersCreationAttributes> implements usersAttributes {
  email!: string;
  username?: string;
  password!: string;
  token?: string;
  rememberme?: boolean;
  verify?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    return users.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rememberme: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    verify: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "users_pk",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
