'use client'

import PocketbaseHelper from "../pocketbase/pocketbase";
const pb = PocketbaseHelper.pocketbase;

export const getUserData = async (userId: string) => {
    console.log(userId)
    const records = await pb.collection('users').getOne(userId, {
        $autoCancel: false,
    });
    return records.value;
};