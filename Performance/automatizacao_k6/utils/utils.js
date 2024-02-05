import encoding from 'k6/encoding';

export default class Utils {
    static getBaseUrl(){
        switch(process.env.NODE_ENV){
            case 'production':
                return `http://lojaebac.ebaconline.art.br/wp-json/wc/v3`
            case 'local':
                return `http://localhost:3000/api`
        }
    }

    static getToken(user, pass){
        const username = user;
        const password = pass;
        const credentials = `${username}:${password}`;
        const encodedCredentials = encoding.b64encode(credentials);
        return encodedCredentials
    }
}