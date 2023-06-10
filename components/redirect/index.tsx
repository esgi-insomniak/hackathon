'use client'
import { useRouter } from "next/navigation"
import React from "react"

export default function Redirect() {
    const router = useRouter()
    React.useEffect(() => {
        router.push("/sign-in")
    }, [])
    return <></>
}