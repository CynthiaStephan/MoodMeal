const userModel = require('../models/Users');

class userController {
    
    constructor(userModel){
        this.userModel = userModel;
    }

    async addUser(req, res) {
        
    }

}

module.exports = new userController(userModel)