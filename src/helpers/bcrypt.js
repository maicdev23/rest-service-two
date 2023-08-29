import bcrypt from "bcryptjs";

export const encrypt = async (password) => {
    const encrypt = await bcrypt.hash(password, 18)
    return encrypt
}

export const decrypt = async (pass, passHash) => {
    const match = await bcrypt.compare(pass, passHash)
    return match
}