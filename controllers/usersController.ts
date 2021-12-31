import UsersService from "../services/usersService";
import * as HttpStatus from 'http-status';
import * as redis from 'redis';

import Helper from '../infra/helper';

class UsersController {
    get(req, res) {
        let client = redis.createClient({
            socket:{
                port: 6379,
                host:"redis"
            },
            password:"Redis2019!"
        });

        client.connect();

        client.get("users").then(reply => {
            if (reply){
                console.log("redis");
                Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
            }else{
                console.log("db");
                UsersService.get()
                .then(user => {
                    client.set("users", JSON.stringify(user))
                    client.expire("users", 60);
                    Helper.sendResponse(res, HttpStatus.OK, user)})
                .catch(error => console.error.bind(console, `Error ${error}`));
            }
        });   
    }

    async getById(req, res) {
        const _id = req.params.id;

        UsersService.getById(_id)
            .then(user => Helper.sendResponse(res, HttpStatus.OK, user))
            .catch(error => console.error.bind(console, `Error ${error}`))
    }

    async create(req, res) {
        let user = req.body;

        UsersService.create(user)
            .then(user => Helper.sendResponse(res, HttpStatus.OK, 'Usuário cadastrado com sucesso'))
            .catch(error => console.error.bind(console, `Error ${error}`))
    }

    async update(req, res) {
        const _id = req.params.id;
        let user = req.body;

        UsersService.update(_id, user)
            .then(user => Helper.sendResponse(res, HttpStatus.OK, ` ${user.name} foi atualizado com sucesso!`))
            .catch(error => console.error.bind(console, `Error ${error}`))
    }

    async delete(req, res) {
        const _id = req.params.id;

        UsersService.delete(_id)
            .then(() => Helper.sendResponse(res, HttpStatus.OK, 'Usuário foi atualizado com sucesso!'))
            .catch(error => console.error.bind(console, `Error ${error}`))
    }
}

export default new UsersController();