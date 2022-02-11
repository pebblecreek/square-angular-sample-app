import { Sequelize } from 'sequelize-typescript';
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.sqlite',
	models: [__dirname + '/models'], // or [Player, Team],
	logging: false,
	dialectOptions: {
		multipleStatements: true
	}
});
export const db = { Sequelize: Sequelize, sequelize: sequelize };