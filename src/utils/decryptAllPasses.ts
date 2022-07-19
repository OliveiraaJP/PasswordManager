import * as cryptr from "./cryptr.js"

export async function mapToDecrypt(credentials:any) {
    const res = await credentials.map((credential: any) =>{
        const { password} = credential
        console.log(password);
        const decryptPass = cryptr.decrypt(password)
        console.log(decryptPass);
        return {...credential, password: decryptPass}
    })
    return res
}

export async function mapToDecryptCard(cards:any) {
    const res = await cards.map((card: any) =>{
        const { password, securityCode} = card
        const decryptPass = cryptr.decrypt(password)
        const decryptCode = cryptr.decrypt(securityCode)
        return {...card, password: decryptPass, securityCode: decryptCode}
    })
    return res
}

export async function decrypt(password:string) {
    return await cryptr.decrypt(password)
}