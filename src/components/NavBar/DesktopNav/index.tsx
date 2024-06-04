import NavItem from "@/components/UI/NavBarUi/NavItem/NavItem"


const DesktopNav = () => {
  return (
    <div
      className='w-full h-16 bg-slate-200/80 hidden md:fixed top-0 z-40 backdrop-blur-[12px] 
                  md:flex justify-center items-center px-[5vmin]'
    >

      <NavItem />
    </div>

  )
}

export default DesktopNav