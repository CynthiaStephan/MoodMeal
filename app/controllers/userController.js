const userModel = require('../models/Users');

class userController {
    constructor(userModel){
        this.userModel = userModel;
    }

    async addUser(req, res) {
        console.log("fzefez")
    }

}

module.exports = new userController(require(userModel))