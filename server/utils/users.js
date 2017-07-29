var _ = require('lodash');
// [{
//     id:'/#45sdsafasdfwerqwer',
//     name:'User1',
//     room:'The Chat Room1,'
// },
// {
//     id:'/#sdafasdfasdfasdf',
//     name:'User2',
//     room:'The Chat Room2,'
// },
// {
//     id:'/#dsgdfgwrwerwersdcv',
//     name:'User3',
//     room:'The Chat room1,'
// }]

class User{
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    /**
     * [return user that was removed]
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    removeUser(id) {
        var user = this.getUser(id);
        if(user) {
            //Filter array and remove user by id
            this.users = this.users.filter((user) => {
                return user.id !== id;
            })
        }
        return user;
    }
    getUser(id) {
        var user = this.users.filter((user) => {
            return user.id === id;
        });
        return user;
    }
    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });
        var namesArray = users.map((user) => {
            return user.name;
        });
        return namesArray;
    }
};

module.exports = {User}
