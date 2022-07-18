import { UserData, UserDataLogin } from "../interfaces/authInterface.js"
import * as authRepository from "../repositories/authRepository.js"
import { AppError } from "../utils/error.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { chalkLogger } from "../utils/chalkLog.js"

export const signup = async (userObj: UserData) => {
    const {user, password, name} = userObj
    const activeUser = await authRepository.getUser(user)
    if(activeUser) {
        throw new AppError(400, 'User already registered!')
    }
    const cryptPass = await bcrypt.hash(password, 10)
    await authRepository.createUser({user, name ,password: cryptPass})
}

export const signin = async (loginObj: UserDataLogin) => {
    const {user, password} = loginObj
    const activeUser = await authRepository.getUser(user)
    if(!activeUser) {
        throw new AppError(404, 'Invalid user!')
    }
    const confirmPassword = bcrypt.compareSync(password, activeUser.password)
    if(!confirmPassword){
        throw new AppError(404, 'Invalid password!')
    }
    const [jwtUser, jwtId] = [activeUser.user, activeUser.id]
    const token = jwt.sign({jwtUser, jwtId}, process.env.JWT_SECRET, {expiresIn:'24h'})
    chalkLogger.log('service', token)
    return token
}