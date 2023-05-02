// importing packages
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../config/connection");

// creating the parent model
// setting up an instance method to match the form's submit with the user's password
// bcrypt compare method returns a boolean, if the string matches the encrypted string retrun is_valid

class User extends Model {

    async validatePass(providedPassword) {
        
        const isValid = await bcrypt.compare(providedPassword, this.password);

        return isValid;
    }
};

// init for the User model using sequelize
// setting email to unqiue so that only one email can be used
// validates that it is an email address
// setting password to be atleast 6 characters in length
// setting up a hook so that when the user is created
// then bycrpt will hash an encrypted string mixed with the standard password string
// and add 10 levels of salt to the encryption 

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: 6
            },
            allowNull: false
        }
    },  {
        sequelize: db,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "user",
        hooks: {
            async beforeCreate(user) {
                const encryptedPassword = await bcrypt.hash(user.password, 10);
                user.password = encryptedPassword;
            }
        }
    }
);

// exporting the User model

module.exports = User;