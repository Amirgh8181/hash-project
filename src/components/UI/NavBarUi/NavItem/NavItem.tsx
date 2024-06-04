"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useCheckLogin } from "@/store/useCheckLogin"

const NavItem = () => {
    const pathname = usePathname()
    const { checkLogin, setCheckLogin } = useCheckLogin()

    const signOutUser = () => {
        setCheckLogin(false)
        localStorage.removeItem("LoginRequestInfo")
        window.location.reload()
    }
    return (
        <ul className="flex flex-col md:flex-row  justify-center items-center md:space-x-4 space-y-4 md:space-y-0">

            <li className="text-base xl:text-lg">
                <Link href={'/'}
                    className=
                    {
                        `link ${pathname === '/' ?
                            'text-petBlue border-b-4 border-b-petBlue cursor-pointer pb-1' :
                            'md:text-black text-white hover:text-petBlue border-b-4 border-b-transparent hover:border-b-petBlue cursor-pointer transition-all duration-300 pb-1'}`
                    }
                >
                    hashing
                </Link>
            </li>


            {checkLogin ?
                <li className="text-base xl:text-lg font-thin"
                    onClick={() => signOutUser()}
                >
                    <p
                        className="md:text-black text-white hover:text-red-500 border-b-transparent hover:border-b-red-500 cursor-pointer transition-all duration-300">
                        signout
                    </p>

                </li>
                :
                <li className="text-base xl:text-lg">
                    <Link href={'/Auth'}
                        className=
                        {
                            `link ${pathname === '/Auth' ?
                                'text-petBlue border-b-4 border-b-petBlue cursor-pointer pb-1' :
                                'md:text-black text-white hover:text-petBlue border-b-4 border-b-transparent hover:border-b-petBlue cursor-pointer transition-all duration-300 pb-1'}`
                        }
                    >
                        auth
                    </Link>
                </li>

            }

        </ul>
    )
}
export default NavItem



