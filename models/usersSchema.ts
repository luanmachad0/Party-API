import * as mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    username: {type:String},
    name: {type:String},
    email: {type:String},
    password: {type:String},
    createdAt: {type:Date, "default": Date.now },
    profileImg: {type:String}
});

export default UsersSchema;