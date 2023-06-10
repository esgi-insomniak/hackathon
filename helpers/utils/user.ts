import { UserType } from '@/providers/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const api_Url = process.env.NEXT_POCKETBASE_URL

export const useUser = () => {
    const nextCookies = cookies()
    const pb_auth = nextCookies.get('pb_auth')
    let user = null
    if (pb_auth) {
        user = JSON.parse(pb_auth.value)
        return user
    } else return null
}

export const useUserProtected = () => {
    const nextCookies = cookies()
    const pb_auth = nextCookies.get('pb_auth')
    let user = null
    if (!pb_auth) {
        redirect('/sign-in')
    } else {
        user = JSON.parse(pb_auth.value)
    }
    return user
}

export const checkLoggedIn = () => {
    const nextCookies = cookies()
    const pb_auth = nextCookies.get('pb_auth')
    if (pb_auth) {
        redirect('/')
    } else redirect('/sign-in')
}

export const isLoggedIn = () => {
    const nextCookies = cookies()
    const pb_auth = nextCookies.get('pb_auth')
    if (pb_auth) {
        checkLoggedIn()
        return true
    } else {
        checkLoggedIn()
        return false
    }
}

export const getUSerData = async () => {
    const user = useUser()
    const id = user?.model?.id as string | null
    const userData = (await fetch(
        `${api_Url}collections/users/records/${id}`,
    ).then((res) => res.json())) as UserType
    return userData
}