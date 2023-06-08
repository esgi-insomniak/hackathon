'use client'
import { UserProfile } from "@clerk/nextjs";

export default function Page() {
    return (
        <UserProfile appearance={{
            elements: {
                card: "w-[78vw]",
                rootBox: "p-10"
            }
        }} />
    );

}