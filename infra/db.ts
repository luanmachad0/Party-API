import * as mongoose from 'mongoose';

class Database {
    private DB_URL = "mongodb://link-db:27017/dbfindrole";

    createConnection(){
        mongoose.connect(this.DB_URL);
    }
}

export default Database;