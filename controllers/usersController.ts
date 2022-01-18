import UsersService from "../services/usersService";
import * as HttpStatus from 'http-status';
import * as redis from 'redis';

import Helper from '../infra/helper';

class UsersController {
    async get(req, res) {
        try {
            let client = redis.createClient({
                socket:{
                    port: 6379,
                    host:"redis"
                },
                password:"Redis2019!"
            });
    
            client.connect();
    
           await client.get("users").then(reply => {
                if (reply){
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                }else{
                    let users = UsersService.get();
                    client.set("users", JSON.stringify(users));
                    client.expire("users", 60);
                    Helper.sendResponse(res, HttpStatus.OK, users);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getById(req, res) {
        try {
            const _id = req.params.id;
            let user = await UsersService.getById(_id);
            Helper.sendResponse(res, HttpStatus.OK, user);
        } catch (error) {
            console.error(error);
        }
    }

    async create(req, res) {
        try {
            let user = req.body;
            await UsersService.create(user);
            Helper.sendResponse(res, HttpStatus.OK, 'Usuário cadastrado com sucesso')
        } catch (error) {
            console.error(error);
        }   
    }

    async update(req, res) {
        try {
            const _id = req.params.id;
            let user = req.body;
            await UsersService.update(_id, user);
            Helper.sendResponse(res, HttpStatus.OK, ` ${user.name} foi atualizado com sucesso!`);
        } catch (error) {
            console.error(error);
        }
    }

    async delete(req, res) {
        try {
            const _id = req.params.id;
            await UsersService.delete(_id);
            Helper.sendResponse(res, HttpStatus.OK, 'Usuário foi atualizado com sucesso!');
        } catch (error) {
            console.error(error); 
        }
    }
}

export default new UsersController();