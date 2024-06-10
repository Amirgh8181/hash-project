
"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
// react hook form
import { SubmitHandler, useForm } from 'react-hook-form'
//next auth
// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { FirstLevelAuthDataType, LoginDataType, SignUpDataType } from '@/types/AuthInput';
//component and styles
import styles from './authstyle.module.css'
import InputErr from '../UI/Inputs/InputErr';
//next-ui
import { Button, Spinner } from '@nextui-org/react';
//icons
import { MdOutlineEmail } from "react-icons/md";
//sweet alert
import swal from 'sweetalert';
import { FirstLevelAuthSchema } from '@/schema/zodSchema/FirstLevelAuthSchema';
import { authInput } from './login/LoginForm';
import checkUserStatus from '@/lib/checkstatus';
import { useSignUp } from '@/store/useSignUp';
import { useLogin } from '@/store/useLogin';
import Link from 'next/link';


interface FirstInp extends authInput {
    registerVal: "email",
}
export interface checkAuth {
    success: boolean
    exist: boolean
    salt: string
    challenge: string
}


const LoginForm = () => {

    //state
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [authCheck, setAuthCheck] = useState<checkAuth>()

    //hook form initialize 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FirstLevelAuthDataType>({
        resolver: zodResolver(FirstLevelAuthSchema)
    })

    //stores
    const { setSignUpSalt, setSignUpEmail } = useSignUp()
    const { setLoginChallenge, setLoginSalt, setLoginEmail } = useLogin()

    //submit hadler
    const onSubmit: SubmitHandler<FirstLevelAuthDataType> = async (e) => {
        //show user email
        console.log(e);

        setLoading(true)
        //send user input email to know user might sign up or login and recieve salt or salt with challenge 
        //fron hash endpoint
        const req: checkAuth = await checkUserStatus(e)
        //show response
        console.log(req);
        if (req.success) {
            //if success=true this mean is user have an acount and recive salt and challenge from api and
            //redirect user to login page and set email and salt and challenge to login store
            if (req?.exist) {
                setLoginSalt(req.salt)
                setLoginChallenge(req.challenge)
                setLoginEmail(e.email)
                setAuthCheck(req)
            }
            //if success=false this mean is user not have an acount and recive salt from api and
            //redirect user to signup page and set email and salt to signup store
            else {
                setSignUpSalt(req.salt)
                setSignUpEmail(e.email)
                setAuthCheck(req)
            }
        }
        else {
            swal({
                icon: "warning",
                title: 'can not connect to api',
                timer: 1000,
                buttons: [false],
                className: styles.swal
            });
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        setLoading(false)
        reset()
    }

    const inputCreateData: FirstInp[] = [
        { key: "Email", type: "email", icon: <MdOutlineEmail />, registerVal: "email", err: errors.email?.message },
    ]

    return (
        <div className="w-full flex flex-col items-center">
            {
                loading &&
                <div className='w-full h-screen fixed inset-0 z-40 bg-petBlue/50 flex flex-col items-center justify-center'>
                    <Spinner size='lg' />
                    <div className='text-white'>please wait ...</div>
                </div>
            }
            {!authCheck?.success &&
                <div className={styles.formContainer}>


                    <form className="space-y-8 w-full" onSubmit={handleSubmit(onSubmit)}>
                        {
                            inputCreateData.map(item =>
                                <div key={item.key} className={styles.inputContainer}>
                                    <label htmlFor={item.registerVal} className='text-2xl text-black/70'>{item.icon}</label>
                                    <input
                                        key={item.key}
                                        type={item.type}
                                        {...register(item.registerVal)}
                                        className={styles.input}
                                        placeholder={item.key}
                                        id={item.registerVal}
                                    />
                                    {item.err &&
                                        <InputErr err={item.err} />
                                    }
                                </div>
                            )
                        }
                        <Button disabled={loading} type="submit" className={styles.authBtn}>Submit</Button>
                    </form>

                </div>
            }
            {
                authCheck &&
                <>
                    <div>
                        {JSON.stringify(authCheck)}
                    </div>
                    {authCheck.exist ?
                        <Link href={'/Auth/Login'} className='bg-petBlue text-white p-2 rounded-lg'>
                            redirect to login
                        </Link>
                        :
                        <Link href={'/Auth/SignUp'} className='bg-petBlue text-white p-2 rounded-lg'>
                            redirect to signUp
                        </Link>
                    }
                </>
            }

        </div>
    )
}

export default LoginForm;



