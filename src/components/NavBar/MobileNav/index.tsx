"use client"
import NavItem from "@/components/UI/NavBarUi/NavItem/NavItem";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
const MobileNav = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
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
      <div
        className="md:hidden fixed z-40 w-full h-8 bg-petBlue top-0 flex items-center"
      >

          <div
            onClick={() => setOpenMenu(true)}
            className="bg-petBlue rounded-lg text-white cursor-pointer p-1 flex justify-center items-center text-xl "
          >
            <IoMenu />
          </div>
      </div>

      <AnimatePresence>
        {
          openMenu &&
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
                onClick={() => setOpenMenu(false)}
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
              <NavItem />
            </motion.div>

          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default MobileNav