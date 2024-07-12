import LineChart from '../components/user/LineChart'
import Navbar from '../components/user/Navbar'



const CryptoDetailedPage = () => {
    return (
        <>
            <div className='w-screen h-screen'>
                <Navbar />
                <div className='w-full px-10 flex justify-center mt-8 '>
                    <LineChart />
                </div>
            </div>
        </>
    )
}

export default CryptoDetailedPage