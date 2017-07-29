const expect = require('expect');
const {User} = require('./users');

describe('Users Class test cases', () => {
    var users;

    beforeEach(() => {
        users = new User();
        users.users = [{
            id: "789",
            name: "testUser1",
            room: "The Chat room1"
        },
        {
            id: "444",
            name: "testUser2",
            room: "The Chat room2"
        },
        {
            id: "456",
            name: "testUser3",
            room: "The Chat room1"
        }];
    });

    describe('Test cases for addUser()', () => {
        it('It Should add new user', () => {
            var usersObject = new User();
            var user = {
                id: "789",
                name: "test",
                room: "The Chat room1"
            };
            var result = usersObject.addUser(user.id, user.name, user.room);
            expect(usersObject.users).toEqual([user]);
        })
    });

    describe('Test cases for removeUser()', () => {
        // It should remove the user
        it('It should remove the user by valid user id', () => {
            var user = users.removeUser('444');
            expect(user.id).toNotExist('444');
        });

        // It should not remove the user
        it('It should not remove the user by invalid user id', () => {
            var user = users.removeUser('uykjhkjhkjhkjh');
            expect(user.id).toNotExist();
            expect(user).toEqual([]);
        });
    });

    describe('Test cases for getUser()', () => {
        // It should find the user by user id
        it('It should find the user by valid user id', () => {
            var user = users.getUser('444');
            expect(user).toEqual([{'id': '444', name:'testUser2', room: "The Chat room2"}]);
        });

        // It should not find the user by user id
        it('It should not find the user by invalid user id', () => {
            var user = users.getUser('555');
            expect(user).toEqual([]);
        });
    });

    describe('Test cases for getUserList()', () => {
        it('It should return names for \'The Chat room1\'', () => {
            var userList = users.getUserList('The Chat room1');
            expect(userList).toEqual(['testUser1', 'testUser3']);
        });

        it('It should return names for \'The Chat room2\'', () => {
            var userList = users.getUserList('The Chat room2');
            expect(userList).toEqual(['testUser2']);
        });
    });
});
