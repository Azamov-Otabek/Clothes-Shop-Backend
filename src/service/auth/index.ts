import http from "../config";
import { setCookies } from "../../utils/cocies";
import { Request } from "../../interface/auth";

export const authRequest:Request = {
    Login: async (payload) => {
        const response = await http.post('/login', payload)
        if(response.status === 200)
            setCookies('token', response.data.access_token)
        return response
    },
    Register: async (payload) => {
        const response = await http.post('/register', payload)
        return response
    },
    ForgotPassword: async (payload) => {
        const response = await http.post(`/forgot/${payload.email}`)
        return response
    },
    ResetPassword: async (payload) => {
        const response = await http.post(`/reset-password`, payload)
        return response
    },
    RefreshToken: async (payload) => {
        const response = await http.post(`/token/${payload}`)
        return response
    },
    VerifyCode: async (payload) => {
        const response = await http.post(`/verify?email=${payload.email}&otp=${payload.otp}`)
        return response
    }

}