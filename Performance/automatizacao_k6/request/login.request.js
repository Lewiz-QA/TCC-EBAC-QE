import { check } from "k6"
import http from "k6/http"
import data from '../fixtures/perfis.json'

export default class Login {

  login() {
    const url = `http://lojaebac.ebaconline.art.br/wp-login.php`;

    const users = [data[2].user, data[3].user, data[4].user, data[5].user, data[6].user];
    const pwds = [data[2].pass, data[3].pass, data[4].pass, data[5].pass, data[6].pass];

    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPass = pwds[Math.floor(Math.random() * pwds.length)];

    const payload = JSON.stringify({
      log: randomUser,
      pwd: randomPass
    });

    const params = {
      headers: {
        'Accept': 'application/json'
      }
    };

    let response = http.post(url, payload, params);
    check(response, { 'O Login deve retornar 200': r => r && r.status === 200 })
  }
}