import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface resetpasswordAttributes {
  tokenresetpassword: string;
  email?: string;
  tokenexpirytime: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type resetpasswordPk = "tokenresetpassword";
export type resetpasswordId = resetpassword[resetpasswordPk];
export type resetpasswordOptionalAttributes = "email" | "createdAt" | "updatedAt" | "deletedAt";
export type resetpasswordCreationAttributes = Optional<resetpasswordAttributes, resetpasswordOptionalAttributes>;

export class resetpassword extends Model<resetpasswordAttributes, resetpasswordCreationAttributes> implements resetpasswordAttributes {
  tokenresetpassword!: string;
  email?: string;
  tokenexpirytime!: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof resetpassword {
    return resetpassword.init({
    tokenresetpassword: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tokenexpirytime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'resetpassword',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "resetpassword_pk",
        unique: true,
        fields: [
          { name: "tokenresetpassword" },
        ]
      },
    ]
  });
  }
}
