import {Sequelize} from 'sequelize'

const sequelize = new sequelize(
   'node444',//ten database
   "root",//ten user name
   "123456",//password user
   {
      host:'localhost',
      port:3307,
      dialect:"mysql;"
   }



);

export default sequelize;
