process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import ItemsRoute from '@routes/items.route';
import AuthRoute from '@routes/auth.route';
import RoomsRoute from '@routes/rooms.route';


validateEnv();

const app = new App(
  [
    new IndexRoute(), 
    new UsersRoute(), 
    new ItemsRoute(),
    new AuthRoute(),
    new RoomsRoute()
  ]);

app.listen();
