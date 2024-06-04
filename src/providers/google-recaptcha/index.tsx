"use client"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function GoogleRecaptchaWrapper({ children }: {
        children: React.ReactNode
    }) {
        const recaptchaKey:string|undefined=process?.env?.NEXT_PUBLIC_RECAPTCHA_KEY
    return (
        <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey??"NOT DEFINED"}>
            {children}
        </GoogleReCaptchaProvider>
    )
}