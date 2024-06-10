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
import { authInput, hashingPass } from '../login/LoginForm';
import { useSignUp } from '@/store/useSignUp';
import signUpUser from '@/lib/signUp';
import checkUserStatus from '@/lib/checkstatus';
import signInUsers from '@/lib/signin';
import { useCheckLogin } from '@/store/useCheckLogin';
import { checkAuth } from '..';
import Link from 'next/link';




interface signupInp extends authInput {
    registerVal: "email" | "password" | "name",
    readOnly: boolean,
    value: string
}

interface postData extends SignUpDataType {
    salt: string
}
interface signUpResp {
    email: string
    success: boolean
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

    const md5 = require("blueimp-md5");

    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState<postData>()
    const [giveChallenge, setGiveChallenge] = useState<checkAuth>()
    const [signUpResponse, setSignUpResponse] = useState<signUpResp | { success: boolean }>()
    const [successLogin, setSuccessLogin] = useState<boolean>()
    const [hahing, setHashing] = useState<hashingPass>()
    const [hahingSignUpPass, setHashingSignUpPass] = useState<{ salt: string }>()

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
        setPostData(signUpPostDetails)
        const req: signUpResp = await signUpUser(signUpPostDetails)
        setSignUpResponse(req)
        //show call api function response
        console.log(req);
        //if successful signup post user email to hash end point to recieve challenge
        if (req.success) {
            setHashingSignUpPass({ salt: md5(`${e.password} ${signUpSaltShow}`) })
            const reqForReciveChallenge = await checkUserStatus({ email: req?.email })
            setGiveChallenge(reqForReciveChallenge)
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
                    setSuccessLogin(true)

                    const hashWithSalt = md5(`${e.password} ${salt}`)
                    setHashing({
                        salt: hashWithSalt, challenge: md5(`${challenge} ${hashWithSalt}`)
                    })
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
        <div className="w-full flex flex-col items-center space-y-6">
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
            {
                postData &&
                <div>user data to signup:{JSON.stringify(postData)}</div>
            }
            {
                signUpResponse &&
                <>

                    <div>signup response:{JSON.stringify(signUpResponse)}</div>
                </>
            }
            {
                giveChallenge &&
                <>
                    <p>hash user pass with salt and store on db:{hahingSignUpPass?.salt}</p>
                    <div>post success sign up user email for give challenge and login:{JSON.stringify(giveChallenge)}</div>
                </>
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

export default SignUpForm;