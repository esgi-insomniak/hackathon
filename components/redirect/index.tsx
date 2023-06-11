'use client'
import { useRouter } from "next/navigation"
import React from "react"

export default function Redirect(path: string) {
    const router = useRouter()
    React.useEffect(() => {
        router.push({path})
    }, [])
    return <></>
}