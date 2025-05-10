import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)
  const [loading, setLoading] = useState(false) // Track loading state

  console.log("params", params.explore)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo
        }
      })

      setData((prev) => [
        ...prev,
        ...response.data.results
      ])
      setTotalPageNo(response.data.total_pages)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (pageNo < totalPageNo) {
      setPageNo(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])

  return (
    <div className='py-16'>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Popular {params.explore} show
        </h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {data.map((exploreData) => (
            <Card data={exploreData} key={exploreData.id + "exploreSection"} media_type={params.explore} />
          ))}
        </div>

        {/* Load More Button */}
        {pageNo < totalPageNo && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleLoadMore} 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExplorePage
