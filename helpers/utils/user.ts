import { UserType, useAuth } from "@/providers/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import PocketbaseHelper from "../pocketbase/pocketbase";

const api_Url = process.env.NEXT_POCKETBASE_URL;
const pb = PocketbaseHelper.pocketbase;

export const useUser = () => {
    const nextCookies = cookies()
    const pb_auth = nextCookies.get('userId')
    let user = null
    if (pb_auth) {
        user = pb_auth.value
        return user
    } else return null
}

export const useUserProtected = () => {
    const nextCookies = cookies()
    const pb_auth = nextCookies.get('userId')
    let user = null
    if (!pb_auth) {
        redirect('/sign-in')
    } else {
        user = pb_auth.value
    }
    return user
}

export const checkLoggedIn = () => {
    const nextCookies = cookies()
    const pb_auth = nextCookies.get('userId')
    if (pb_auth) {
        return true
    } else return false
}

export const isLoggedIn = () => {
    const nextCookies = cookies()
    const pb_auth = nextCookies.get('userId')
    if (pb_auth) {
        checkLoggedIn()
        return true
    } else {
        checkLoggedIn()
        return false
    }
}

export const getUSerData = async () => {
  const nextCookies = cookies();
  const pb_auth = nextCookies.get("userId");
  try {
    const res = await pb.collection("users").getOne(pb_auth?.value, {
        $autoCancel: false,
    });
    const userData = res;
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
