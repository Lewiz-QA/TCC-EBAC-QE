import { group } from 'k6';
import Coupon from '../request/coupon.request';


export const options = {
  stages: [
    { duration: '20s', target: 10 },
    { duration: '20s', target: 5 },
    { duration: '20s', target: 20 },
    { duration: '20s', target: 15 },
    { duration: '20s', target: 10 },
    { duration: '20s', target: 20 }
  ],
  thresholds: {
    http_req_duration: ['p(99) < 10000']
  }
}

export default function () {

  let coupon = new Coupon()

  group('CT1 - Deve listar Cupons em múltiplas instâncias', () => {
    coupon.listCoupons()
  })
}
