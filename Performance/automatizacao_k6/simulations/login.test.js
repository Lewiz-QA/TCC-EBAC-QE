import { group } from 'k6';
import Login from '../request/login.request';


export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '5s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(99) < 1000']
  }
}

export default function () {

  let login = new Login()

  group('CT1 - Deve realizar Login em múltiplas instâncias', () => {
    login.login()
  })

}
