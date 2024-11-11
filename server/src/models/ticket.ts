import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

interface TicketAttributes {
  id: number;
  name: string;
  status: string;
  description: string;
  assignedUserId?: number;
  priority?: number; // Add priority field
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public name!: string;
  public status!: string;
  public description!: string;
  public assignedUserId!: number;
  public priority!: number; // Add priority to the model

  // associated User model
  public readonly assignedUser?: User;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function TicketFactory(sequelize: Sequelize): typeof Ticket {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      priority: { // Add this block
        type: DataTypes.INTEGER,
        allowNull: true, // You can set this to false if you want to make it required
      },
    },
    {
      tableName: 'tickets',
      sequelize,
    }
  );

  return Ticket;
}
