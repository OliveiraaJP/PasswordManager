import crypt from "cryptr"

export async function encrypt(password: string) {
    return crypt.encrypt(password)
}

export async function decrypt(password: string) {
    return crypt.decrypt(password)
}