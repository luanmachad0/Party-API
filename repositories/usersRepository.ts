import * as mongoose from 'mongoose';
import UsersSchema from '../models/usersSchema';

export default mongoose.model('users', UsersSchema);