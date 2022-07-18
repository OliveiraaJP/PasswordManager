import { UserData } from "../interfaces/authInterface.js"
import * as authRepository from "../repositories/authRepository.js"
import { AppError } from "../utils/error.js"
import bcrypt from "bcrypt"

export const signup = async (userObj: UserData) => {
    const {user, password, name} = userObj
    const activeUser = await authRepository.getUser(user)
    if(activeUser) {
        throw new AppError(400, 'User already registered!')
    }
    const cryptPass = await bcrypt.hash(password, 10)
    await authRepository.createUser({user, name ,password: cryptPass})
}