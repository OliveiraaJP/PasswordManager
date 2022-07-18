import { UserData } from "../interfaces/authInterface.js";
import prisma from "../config/database.js"


export async function getUser(user: string) {
    return await prisma.user.findFirst({where:{user}})
}

export async function createUser(userObj:UserData) {
    console.log(userObj);
    return await prisma.user.create({data:userObj})
}
