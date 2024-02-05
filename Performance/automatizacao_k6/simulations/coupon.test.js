import { group } from 'k6';
import Coupon from '../request/coupon.request';


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

  let coupon = new Coupon()

  group('CT1 - Deve listar Cupons em múltiplas instâncias', () => {
    coupon.listCoupons()
  })
}
