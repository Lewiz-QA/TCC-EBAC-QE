import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"
import data from '../fixtures/perfis.json'

export default class Coupon {

    listCoupons() {

      const auths = [`${Utils.getToken(data[0].user, data[0].pass)}`, `${Utils.getToken(data[1].user, data[1].pass)}`];

      const randomAuth = auths[Math.floor(Math.random() * auths.length)];

        let response = http.get(`${Utils.getBaseUrl()}/coupons`, {
            headers: {
                Authorization: `Basic ${randomAuth}`
            }
        })
        check(response, { 'A listagem de Cupons deve retornar 200': r => r && r.status === 200 })
    }
}