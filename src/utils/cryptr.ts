import Cryptr from "cryptr"
const cryptr = new Cryptr(process.env.CRYPTR_SECRET)

export async function encrypt(password: string) {
    return cryptr.encrypt(password)
}

export async function decrypt(password: string) {
    return cryptr.decrypt(password)
}
