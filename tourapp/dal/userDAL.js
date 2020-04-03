const db = require('../bin/postgresqlStart.js');

module.exports = {

    //We have a front end userid and a userid that we use to mask the user in the db so we dont give userid's tied to specific things

    getUserId: async (userName) => { 
        var userInformation = await db.query('SELECT * FROM user WHERE username = $1', [userName] );
    },

    createNewUser: async (newUserData) => { 
        try{
            var createUser = `
            INSERT INTO users (username, email, password, first_name, last_name)
            VALUES ($1, $2, $3, $4, $5);`

            var insertIntoRoles = `
            INSERT INTO user_role (user_id, role_id, grant_date) 
            VALUES(
                    (SELECT user_id FROM users WHERE username = $1), 4, NOW()
                );`

            var returnUser = await db.query([createUser, insertIntoRoles],[[newUserData.userName, newUserData.email, newUserData.hashedPassword, newUserData.firstName, newUserData.lastName], [newUserData.userName]]);

            return returnUser;
        }
        catch(err){
            console.error(err);
            return err.code;
        }

    },

    getMapStyleForUser: async (frontEndUserId) => {
        try{
            if(frontEndUserId == undefined || null) {
                var defaultMapStyle = await db.query(['SELECT * FROM mapstyles WHERE mapstyle_id = 1'], []);
                console.log(defaultMapStyle);
                return defaultMapStyle[0].rows[0];
            }
            else{
                console.log("ADD get user user_id from correct table and then mapstyle svaed for user there.")
            }
        }
        catch(err) {
            console.error(err);
        }
    }

}

