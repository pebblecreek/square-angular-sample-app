import Server from './server/app';
import config from './config/config';
import path from 'path';
const server: Server = Server.bootstrap();
global['appRoot'] = path.resolve(__dirname);
server.run(config.port, () => {
	console.log(`http://localhost:${config.port}`);
});