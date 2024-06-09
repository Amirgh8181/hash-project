"use client"
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import {motion} from 'framer-motion'
import NavBar from "@/components/NavBar";
import { AiOutlineClose } from "react-icons/ai";

const HamburgurMenu = ({mobileMenu,setOpenHamMenu}:{mobileMenu:boolean,setOpenHamMenu:()=>void}) => {


    const menuVar = {
        initial: {
            scaleY: 0
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren"
            }
        },
        exit: {
            scaleY: 0,
            transition: {
                duration: 0.5,
                when: 'afterChildren'
            }
        }
    }

    const childVariant = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.5,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5,
            }
        }
    }
    return (
        <>


            <AnimatePresence>
                {mobileMenu &&
                    <motion.div
                        className="w-full h-screen fixed inset-0 bg-blue-900 origin-top z-40"
                        variants={menuVar}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                    >
                        {/* header for hamburgur menu */}
                        <motion.div
                            className="bg-blue-800 flex justify-between items-center px-4 mt-4"
                            variants={childVariant}
                        >


                            {/* btn for close hamburgur menu */}

                            <motion.div
                                className='
                              aspect-square  h-7 flex justify-center items-center text-2xl
                            bg-petBlue text-white rounded-lg cursor-pointer'
                                onClick={() => setOpenHamMenu()}
                            >
                                {/* close Icon*/}

                                <AiOutlineClose />

                            </motion.div>
                        </motion.div>

                        {/* navItem for hamburgur menu */}
                        <motion.div
                            className='w-full h-screen mt-20 text-2xl'
                            variants={childVariant}
                        >
                            <NavBar />
                        </motion.div>

                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}


export default HamburgurMenu



