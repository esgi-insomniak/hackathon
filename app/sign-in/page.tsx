'use client'

import React from "react";
import { useAlert } from '@/providers/alert';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import PocketbaseHelper from '@/helpers/pocketbase/pocketbase';
import { useAuth } from "@/providers/auth";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
    const pb = PocketbaseHelper.pocketbase;
    const alert = useAlert();
    const { register, handleSubmit } = useForm<{ email: string, password: string }>()
    const { login } = useAuth()

    const onSubmit = (data: { email: string, password: string }) => {
        pb
            .collection('users')
            .authWithPassword(data.email, data.password)
            .then((res) => {
                login(res.token)
                alert?.success('Vous êtes connecté !')
                redirect('/')
            })
            .catch((error) => {
                alert?.error(error.message)
            })
    }

    return (
        <div className="flex justify-center items-center h-full">
            <form onSubmit={handleSubmit(onSubmit)} className='h-96 w-1/3 flex justify-center flex-col space-y-4 rounded-lg drop-shadow-md bg-carbon-black/10 px-5 py-10'>
                <div className='flex items-start justify-center h-full'>
                    <h2 className='text-3xl font-bold text-carbon-white'>
                        Se connecter
                    </h2>
                </div>
                <Input
                    label='Email'
                    type='email'
                    {...register('email')}
                />
                <Input
                    label='Mot de passe'
                    type='password'
                    {...register('password')}
                />
                <Button color='blue' type='submit'>Se connecter</Button>
            </form>
        </div>
    );
}