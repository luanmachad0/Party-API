import UsersRepository from "../repositories/usersRepository";

class UsersService {

    get(){
        let result = UsersRepository.find({});
        return result;
    }

    async getById(_id){
        let result = await UsersRepository.findById({_id})
        return result;
    }

    async create(user){
        let result = await UsersRepository.create(user);
        return result;
    }

    async update(_id, user){
        let result = await UsersRepository.findByIdAndUpdate(_id, user);
        return result;
    }

    async delete(_id){
        let result = await UsersRepository.findByIdAndRemove(_id);
        return result;
    }
}

export default new UsersService();