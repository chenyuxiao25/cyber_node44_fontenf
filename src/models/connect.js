import {Sequelize} from 'sequelize'
import connect_DB from '../config/connect_db.js';
const sequelize = new Sequelize(
   // 'node44_youtube',//ten database
   // "root",//ten user name
   // "123456",//password user

   connect_DB.database,
   connect_DB.user,
   connect_DB.pass,
   {
      // host:'localhost',
      // port:3307,
      // dialect:"mysql"
      host :connect_DB.host,
      port: connect_DB.port,
      dialect: connect_DB.dialect,
   }



);

export default sequelize;
