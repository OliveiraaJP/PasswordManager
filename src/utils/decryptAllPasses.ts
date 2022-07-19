import * as cryptr from "./cryptr.js"

export async function decryptAll(password: string) {
    try {
        const porra = await cryptr.decrypt(password)
        return porra
        
    } catch (error) {
        console.log('não é possível kkkkkkkkkkk');
        return false
    }
   
}

export async function mapToDecrypt(credentials:any) {
    const res = await credentials.map((credential: any) =>{
        const { password} = credential
        console.log(password);
        const decryptPass = decryptAll(password)
        console.log(decryptPass);
        return {...credential, password: decryptPass}
    })
    return res
}

export async function decrypt(password:string) {
    return await cryptr.decrypt(password)
}