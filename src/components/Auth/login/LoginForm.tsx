"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
// react hook form
import { SubmitHandler, useForm } from 'react-hook-form'
//next auth
// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schema/zodSchema/LoginSchema';
import { LoginDataType, SignUpDataType } from '@/types/AuthInput';
//component and styles
import styles from '../authstyle.module.css'
import InputErr from '../../UI/Inputs/InputErr';
//next-ui
import { Button, Spinner } from '@nextui-org/react';
//icons
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
//sweet alert
import swal from 'sweetalert';
import signInUsers from '@/lib/signin';
import { useLogin } from '@/store/useLogin';
import { useSignUp } from '@/store/useSignUp';
import { useCheckLogin } from '@/store/useCheckLogin';


export interface authInput {
    key: "Email" | "Password" | "UserName",
    type: "email" | "password" | "text",
    icon: JSX.Element,

    err: string | undefined
}

interface loginInp extends authInput {
    registerVal: "email" | "password",
    readOnly: boolean,
    value: string
}

interface postDataForLogin {
    email: string
    password: string
    challenge: string
    salt: string
}
export interface hashingPass {
    challenge: string
    salt: string
}
const LoginForm = () => {
    //hook form initialize 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginDataType>({
        resolver: zodResolver(LoginSchema)
    })
    //state
    const [loading, setLoading] = useState(false)
    const [postDataForLogin, setPostDataForLogin] = useState<postDataForLogin>()
    const [successLogin, setSuccessLogin] = useState<boolean>()
    const [hahing, setHashing] = useState<hashingPass>()
    const router = useRouter()
    const { loginSaltShow, loginChallengeShow, loginEmailShow } = useLogin()
    const { setCheckLogin } = useCheckLogin()

    const md5 = require("blueimp-md5");

    //submit hadler
    const onSubmit: SubmitHandler<LoginDataType> = async (e) => {

        console.log(e);

        setLoading(true)
        setPostDataForLogin({ ...e, challenge: loginChallengeShow, salt: loginSaltShow })
        const req = await signInUsers({ ...e, challenge: loginChallengeShow, salt: loginSaltShow })

        if (req.success) {
            setCheckLogin(true)
            setSuccessLogin(true)
            const hashWithSalt = md5(`${e.password} ${loginSaltShow}`)
            setHashing({
                salt: hashWithSalt, challenge: md5(`${loginChallengeShow} ${hashWithSalt}`)
            })
            localStorage.removeItem("Login")
            swal({
                icon: "success",
                title: 'successfull login',
                timer: 1000,
                buttons: [false],
                className: styles.swal
            });
        } else {
            swal({
                icon: "warning",
                title: 'unsuccessfull login',
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

    const inputCreateData: loginInp[] = [
        { key: "Email", type: "email", icon: <MdOutlineEmail />, registerVal: "email", err: errors.email?.message, readOnly: true, value: loginEmailShow },
        { key: "Password", type: "password", icon: <MdLockOutline />, registerVal: "password", err: errors.password?.message, readOnly: false, value: "" },
    ]

    return (
        <div className="w-full flex flex-col items-center space-y-6">
            {
                loading &&
                <div className='w-full h-screen fixed inset-0 z-40 bg-petBlue/50 flex flex-col items-center justify-center'>
                    <Spinner size='lg' />
                    <div className='text-white'>please wait ...</div>
                </div>
            }
            {
                !successLogin &&
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
                                        readOnly={item.readOnly}
                                        defaultValue={item.value}
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

            {postDataForLogin &&
                <div>post data for login {JSON.stringify(postDataForLogin)}</div>
            }
            {
                successLogin &&
                <>
                    <div>
                        <p>hash password with salt</p>
                        <p>{hahing?.salt}</p>
                        <p>hashed password hash with challenge</p>
                        <p>{hahing?.challenge}</p>
                    </div>
                    <Link href={"/"} className='bg-petBlue text-white p-2 rounded-lg'>back to home</Link>
                </>
            }
        </div>
    )
}

export default LoginForm;


/*
        if (req?.ok) {
            swal({
                icon: "success",
                title: 'successfull login',
                timer: 2000,
                buttons: [false],
                className: styles.swal
            });
            setTimeout(() => {
                router.push('/')
            }, 3000);
        } else {
            swal({
                icon: "warning",
                title: 'unsuccessfull login',
                timer: 2000,
                buttons: [false],
                className: styles.swal
            });
            setTimeout(() => {
                window.location.reload()
            }, 3000);
        }
*/