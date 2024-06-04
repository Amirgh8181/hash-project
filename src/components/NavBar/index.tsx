"use client"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import { useState } from "react"

const NavBar = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const MOBILE_THRESHOLD: number = 768
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateSize);
    }
    function updateSize(): void {
        setIsMobile(window.innerWidth < MOBILE_THRESHOLD);
    }

    return (
        <>
            {isMobile ? <MobileNav /> : <DesktopNav />}
        </>
    )
}


export default NavBar