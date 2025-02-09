import bcrypt from "bcrypt";

export const handleError = (code, message) => {
    const err = new Error;
    err.code = code;
    err.message = message;
    return err;
}

export const hashPassword = async (password, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}