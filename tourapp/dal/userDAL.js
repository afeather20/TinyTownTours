'use strict';
var crypto = require('crypto');

const db = require('../bin/postgresqlStart.js');

module.exports = {

    //We have a front end userid and a userid that we use to mask the user in the db so we dont give userid's tied to specific things

    getUserId: async (userName) => { 
        var userInformation = await db.queryAsynchronous('SELECT * FROM user WHERE username = $1', [userName] );
        return userInformation;
    },

    loginUser: async (userCredentials) => { 
        try { 
            var selectUserSalt = 'SELECT salt FROM users WHERE username = $1';

            var userCredentialsDAL = await db.queryAsynchronous([selectUserSalt],[[userCredentials.userName]] );

            if(userCredentialsDAL[0].rows.length == 0 ) { 
                var error = { 
                    code: '001',
                    error: 'There is a not a user with that account name'
                }
                return error;
            }

            var checkSaltedPass = sha512(userCredentials.userPass, userCredentialsDAL[0].rows[0].salt);

            var selectUser = 'SELECT user_id, username, first_name, last_name FROM users WHERE password = $1 AND username = $2';
 
            var loggedInUser = await db.queryAsynchronous([selectUser], [[checkSaltedPass.passwordHash, userCredentials.userName]]);

            if(loggedInUser[0].rows.length == 0 ) { 
                 var error = { 
                     code: '002',
                    error: 'Your password is incorrect please try again'
                }
                return error;
            }
            return loggedInUser;
        }
        catch(err){ 

            console.log(err);
        }
    },

    createNewUser: async (newUserData) => { 
        try{

            var hashedPassword = saltHashPassword(newUserData.hashedPassword);

            var createUser = `
            INSERT INTO users (username, email, password, first_name, last_name, salt)
            VALUES ($1, $2, $3, $4, $5, $6);`

            var insertIntoRoles = `
            INSERT INTO user_role (user_id, role_id, grant_date) 
            VALUES(
                    (SELECT user_id FROM users WHERE username = $1), 4, NOW()
                );`

            var returnUser = await db.queryAsynchronous([createUser, insertIntoRoles],[[newUserData.userName, newUserData.email, hashedPassword.passwordHash, newUserData.firstName, newUserData.lastName, hashedPassword.salt], [newUserData.userName]]);

            return returnUser;
        }
        catch(err){
            console.log(err);
            if(err.code == '23505'){ 
                if(err.constraint == 'users_username_key'){ 
                    var errorMessage = "This username is already in use"
                }
                else if(err.constraint == 'users_email_key') { 
                    var errorMessage = "This email is already in use"
                }
                else { 
                    var errorMessage = "Server Error Please contact server administrator"
                }
            }
            else { 
                var errorMessage = "Server Error Please contact server administrator"
            }
            console.log(errorMessage)
            var error = { 
                code: err.code, 
                message: errorMessage
            }
            return error;
        }

    },

    getMapStyleForUser: async (frontEndUserId) => {
        try{
      
            if(frontEndUserId == undefined || null) {
                var defaultMapStyle = await db.querySynchronous(['SELECT * FROM mapstyles WHERE mapstyle_id = 1'], []);
                return defaultMapStyle[0].rows[0];
            }
            else{
                var defaultMapStyle = await db.querySynchronous(['SELECT * FROM mapstyles WHERE mapstyle_id = 1'], []);
                return defaultMapStyle[0].rows[0];
            }
        }
        catch(err) {
            console.error(err);
        }
    }

}

function saltHashPassword(userpassword) {

    /**
    * generates random string of characters i.e salt
     * @function
    * @param {number} length - Length of the random string.
    */
    var genRandomString = function(length){
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex') /** convert to hexadecimal format */
                .slice(0,length);   /** return required number of characters */
    };

    var salt = genRandomString(16); /** Gives us salt of length 16 */

    var passwordData = sha512(userpassword, salt);

    return passwordData
}
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};
