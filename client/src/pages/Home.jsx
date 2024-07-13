import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Navbar from '../components/user/Navbar'
import { FaSearch } from 'react-icons/fa'
import debounce from "lodash.debounce";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const [searchedData, setSearchedData] = useState([])
  const [deleted, setDeleted] = useState(false)
  const [crypto, setCrptyo] = useState({
    name: "",
    prices: ""
  })


  const debouceFetchData = debounce(async (value) => {

    const response = await axiosPrivate.get("/user/search", {
      params: {
        search: value
      }
    })

    setResults(response?.data?.result)
  }, 1000)

  useEffect(() => {
    if (search !== "") debouceFetchData(search)
    return () => debouceFetchData.cancel();
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value.trim())
  }

  const fetchCrypto = async (value) => {
    const response = await axiosPrivate.get("/user/getCrypto", {
      params: {
        value,
      }
    })
    setCrptyo({name: response?.data?.name, prices: response?.data?.prices})
  }

  const fetchSearch = async () =>{
    const response = await axiosPrivate.get("/user/searchData")
    console.log(response?.data?.searchData);
    setSearchedData(response?.data?.searchData)
  }

  useEffect(() => {
    if(search === "") fetchSearch()
    
    return ()=>{
      setDeleted(false)
    }
  }, [search, deleted])
  
  const handleDeleteSearch = async (value) =>{
    const response = await axiosPrivate.delete("/user/searchData",{
      params: {
        searchId: value._id
      }
    })

    setDeleted(response?.data?.deleted)
  }

  const handleCryptoDetails = () =>{
    navigate('/graph', {state: {name: crypto.name}})
  }


  return (
    <>
      <div className='h-screen overflow-y-hidden'>
        <Navbar />
        <div className='w-full flex justify-center items-centern mt-5'>
          <div className="w-2/4 input-wrapper h-12 border-none rounded-lg py-4 bg-gray-200 flex items-center shadow-md">
            <FaSearch className="ml-1" />
            <input
              className="bg-transparent border-none h-12 w-full text-lg ml-1 focus:outline-none"
              placeholder="Type to search..."
              onFocus={() => setIsFocused(true)}
              value={search}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='w-full h-full flex gap-10' onClick={() => setIsFocused(false)}>

          {isFocused && results && results.length > 0 && search !== "" && <div className='w-full flex justify-center mt-3 absolute'>
            <div className="w-2/4  bg-gray-300 flex flex-col items-center gap-2 shadow-lg rounded-lg mt-2 max-h-[300px] overflow-y-auto ">
              {results?.map((result, id) => {
                return (
                  <div key={id} className="w-full px-5 py-2 border-b-2 border-gray-400 cursor-pointer" onClick={() => fetchCrypto(result)}>
                    {result}
                  </div>
                )
              })}
            </div>
          </div>}

          {isFocused && searchedData && searchedData.length > 0 && search === "" && <div className='w-full flex justify-center mt-3 absolute'>
            <div className="w-2/4  bg-gray-300 flex flex-col items-center gap-2 shadow-lg rounded-lg mt-2 max-h-[300px] overflow-y-auto ">
              {searchedData?.map((result, id) => {
                return (
                  <div key={id} className="w-full px-5 py-2 border-b-2 border-gray-400 cursor-pointer flex justify-between" onClick={() => fetchCrypto(result)}>
                    {result.content}
                    <span className='cursor-pointer font-bold' onClick={ ()=> handleDeleteSearch(result)}>X</span>
                  </div>
                )
              })}
            </div>
          </div>}


          {crypto.name && crypto.prices && <div className='h-56 w-full flex justify-center mt-5 cursor-pointer' onClick={handleCryptoDetails}>
            <div className='bg-gray-400 rounded-lg h-full w-2/4 text-3xl font-semibold flex flex-col justify-center items-center'>
              <div>Name: {crypto?.name} </div>
              <div>usd: {crypto?.prices?.usdt}</div>
            </div>
          </div>}
        </div>

      </div>
    </>
  )
}

export default Home