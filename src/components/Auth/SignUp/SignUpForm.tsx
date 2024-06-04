"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation';
// react hook form
import { SubmitHandler, useForm } from 'react-hook-form'

// zod
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '@/schema/zodSchema/SignUpSchema';
import { SignUpDataType } from '@/types/AuthInput';

//next-auth

//component and styles
import styles from '../authstyle.module.css'
import InputErr from '../../UI/Inputs/InputErr';


//sweet alert
import swal from 'sweetalert';

//next-ui
import { Button, Spinner } from '@nextui-org/react';

//icon
import { MdOutlineEmail, MdLockOutline } from 'react-icons/md';
import { FaUser } from "react-icons/fa";

//types
import { authInput } from '../login/LoginForm';
import { useSignUp } from '@/store/useSignUp';
import signUpUser from '@/lib/signUp';
import checkUserStatus from '@/lib/checkstatus';
import signInUsers from '@/lib/signin';
import { useCheckLogin } from '@/store/useCheckLogin';




interface signupInp extends authInput {
    registerVal: "email" | "password" | "name",
    readOnly: boolean,
    value: string
}


const SignUpForm = () => {
    //hook form import 
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<SignUpDataType>({
        resolver: zodResolver(SignUpSchema)
    })
    //state


    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { signUpSaltShow, signUpEmail } = useSignUp()
    const { setCheckLogin } = useCheckLogin()



    //submit hadler
    const onSubmit: SubmitHandler<SignUpDataType> = async (e) => {
        //show user inputs
        console.log(e);
        setLoading(true)
        // place required data in one object and pass to call api function
        const signUpPostDetails = { ...e, salt: signUpSaltShow }
        console.log(signUpPostDetails);
        const req = await signUpUser(signUpPostDetails)
        //show call api function response
        console.log(req);
        //if successful signup post user email to hash end point to recieve challenge
        if (req.success) {
            const reqForReciveChallenge = await checkUserStatus({ email: req.email })
            //show receive challenge result
            console.log(reqForReciveChallenge);
            //if success to recieve challenge post required data to login api function
            if (reqForReciveChallenge) {
                const { salt, challenge } = reqForReciveChallenge
                const reqForLogin = await signInUsers({ email: e.email, password: e.password, challenge, salt })
                //show login result
                console.log(reqForLogin);
                
                //if success login show sweet alert and redirect to main page
                if (reqForLogin.success) {
                    setCheckLogin(true)
                    swal({
                        icon: "success",
                        title: 'successfull signUp and login',
                        timer: 1000,
                        buttons: [false],
                        className: styles.swal
                    });
                    setTimeout(() => {
                        router.push('/')
                    }, 1000);
                }
                //if unsuccess login show sweet alert and redirect to first page
                else {
                    swal({
                        icon: "warning",
                        title: 'unsuccessfull login after sign up please login',
                        timer: 1000,
                        buttons: [false],
                        className: styles.swal
                    });
                    setTimeout(() => {
                        router.push('/Auth')
                    }, 1000);

                }
            }
            ////if unsuccess receive challenge show sweet alert and redirect to first page
            else {
                swal({
                    icon: "warning",
                    title: 'unsuccessfull recieve challenge please go to first page',
                    timer: 1000,
                    buttons: [false],
                    className: styles.swal
                });
                setTimeout(() => {
                    router.push('/Auth')
                }, 1000);
            }
        } 
        //if unsuccess signup reload page
        else {
            swal({
                icon: "warning",
                title: 'unsuccessfull signup',
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



    const inputCreateData: signupInp[] = [
        { key: "Email", type: "email", icon: <MdOutlineEmail />, registerVal: "email", err: errors.email?.message, readOnly: true, value: signUpEmail },
        { key: "UserName", type: "text", icon: <FaUser />, registerVal: "name", err: errors.name?.message, readOnly: false, value: "" },
        { key: "Password", type: "password", icon: <MdLockOutline />, registerVal: "password", err: errors.password?.message, readOnly: false, value: "" },
    ]

    return (
        <div className="w-full flex justify-center ">
            {
                loading &&
                <div className='w-full h-screen fixed inset-0 z-40 bg-petBlue/50 flex flex-col items-center justify-center'>
                    <Spinner size='lg' />
                    <div className='text-white'>please wait ...</div>
                </div>
            }
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
                    <Button disabled={loading} isLoading={loading} type="submit" className={styles.authBtn}>Submit</Button>
                </form>
            </div>
        </div>

    )
}

export default SignUpForm;