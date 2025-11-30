import UserValidator from "../middlewares/user.validator.js";
import moment from "moment";
import {CheckPassword, createUser, findUserByEmailOrUsername, findUserByID} from "../models/users.js";
import {encrypt} from "../services/auth.service.js";

const AUTH_SECRET = process.env.AUTH_SECRET;

export default {
     async register(req, res, next) {
        try {
            const { name, email, username, password, confirmPassword } = req.body;

            const errors = UserValidator.validatorRegistration({name, email, username, password, confirmPassword});

            if(Object.keys(errors).length) {
                 res.status(400).send({
                    success: false,
                    errors: errors,
                })

                return
            }

            const newUser = await createUser({name, email, username, password});

            res.status(201).send({
                success: true,
                message: "User registered successfully",
                user: newUser,
            })
        }catch(e) {
            next(e)
        }
    },

    async login(req, res, next) {
         try {
             const {email, password} = req.body;

             const errors = UserValidator.validateLogin({email, password});

             if(Object.keys(errors).length) {
                  res.status(400).send({
                     success: false,
                     errors: errors,
                 })
                 return
             }

             const user = await findUserByEmailOrUsername(email);

             if(!user) {
                   res.status(404).send({
                      success: false,
                      message: "User does not exist",
                  });

                  return;
             }

             if (!CheckPassword(user.password, password)) {
                 return res.status(422).json({
                     status: 'error',
                     message: 'email or password are invalid',
                 });
             }

             const payload = JSON.stringify({
                 userId: user.id,
                 expiresIn: moment().add(30, "minutes").toISOString(),
             });

             const token = encrypt(payload, AUTH_SECRET);

             res.status(200).send({
                 success: true,
                 message: "User logged successfully",
                 token,
             })
         }catch(e) {
             next(e)
         }
    },

    async profile(req, res) {
        const user = await findUserByID(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    },

    async findUserById(req, res, next) {
         try {
             const {id} = req.query;

             if (!id) {
                 res.status(400).json({
                     success: false,
                     message: "ID is required"
                 })
             }

             const user = await findUserByID(id);

             if(!user) {
                 res.status(404).json({
                     success: false,
                     message: "User not found"
                 })
             }

             res.json({
                 success: true,
                 user
             })
         }catch (e) {
             next(e)
         }
    }
}

