import AESExample from '@/hashalgorithm/Aes'
import DESExample from '@/hashalgorithm/Des'
import ElgamalShow from '@/hashalgorithm/Elgamal'
import MD5Algorithm from '@/hashalgorithm/Md5'
import RSAExample from '@/hashalgorithm/Rsa'
import SHAExample from '@/hashalgorithm/Sha'
import React from 'react'

const HashShow = ({ params }: { params: { message: string } }) => {
    const { message } = params
    const encode = decodeURIComponent(message)

    

    return (
        <div className='w-full min-h-screen'>
            <MD5Algorithm message={encode} />
            <AESExample message={encode} />
            <DESExample message={encode} />
            <SHAExample message={encode} />
            <RSAExample message={encode} />
            <ElgamalShow message={encode}/>
        </div>
    )
}

export default HashShow

/*


*/