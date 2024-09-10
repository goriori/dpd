import {Service} from "@/services";

export type TABLE_FORM = {
    fullname: string
    phone: string
    email: string
}


class GoogleSheetService extends Service {
    authNewUser: string
    authOldUser: string

    constructor() {
        super();
        this.authNewUser = 'AKfycbxM7fS23yPiJfG9xHUutyTqXRHCIoxDZdX64KrbNalKLBvDnY3vB9b96uWCjK3mZZbeyw'
        this.authOldUser = 'AKfycbzHTWyIQpY6pXNRa4oWlA-fLO7XOjK-A0-8R7OvbXTixQMOra7BZo60yNJFxVhE-OY0dg'
    }

    async sendFormToTableNewUser(form: TABLE_FORM) {
        try {
            const res = await this.request({
                baseURL: `https://script.google.com/macros/s/${this.authNewUser}/exec?p1=${form.fullname}&p2=${form.phone}&p3=${form.email}`,
                method: 'post'
            })
            return res
        } catch (e) {
            throw e
        }
    }

    async sendFormToTableOldUser(form: TABLE_FORM) {
        try {
            const res = await this.request({
                baseURL: `https://script.google.com/macros/s/${this.authOldUser}/exec?p1=${form.fullname}&p2=${form.phone}&p3=${form.email}`,
                method: 'post'
            })
            return res
        } catch (e) {
            throw e
        }
    }
}

export default new GoogleSheetService()