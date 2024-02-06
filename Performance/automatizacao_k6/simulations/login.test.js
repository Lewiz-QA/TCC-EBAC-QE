import { group } from 'k6';
import Login from '../request/login.request';


export const options = {
  stages: [
    { duration: '20s', target: 15 },
    { duration: '20s', target: 5 },
    { duration: '20s', target: 20 },
    { duration: '20s', target: 15 },
    { duration: '20s', target: 20 },
    { duration: '20s', target: 20 }
  ],
  thresholds: {
    http_req_duration: ['p(99) < 4500']
  }
}

export default function () {

  let login = new Login()

  group('CT1 - Deve realizar Login em múltiplas instâncias', () => {
    login.login()
  })

}
