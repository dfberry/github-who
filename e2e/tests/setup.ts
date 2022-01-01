require('dotenv').config();

export const config = () => {

    const env = {
        GITHUB_USER_NAME: process.env.GITHUB_USER_NAME,
        GITHUB_USER_PASSWORD: process.env.GITHUB_USER_PASSWORD
    };

    return env;

}