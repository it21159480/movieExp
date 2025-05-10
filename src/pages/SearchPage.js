import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false) // Track loading state
  const [totalPage, setTotalPage] = useState(0) // Total pages for search results
  const navigate = useNavigate()

  const query = location?.search?.slice(3)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get('search/multi', {
        params: {
          query: location?.search?.slice(3),
          page: page,
        }
      })
      setData(prev => [
        ...prev,
        ...response.data.results
      ])
      setTotalPage(response.data.total_pages) // Update total pages
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query) {
      setPage(1)
      setData([])
      fetchData()
    }
  }, [location?.search])

  const handleLoadMore = () => {
    if (page < totalPage) {
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (page > 1) {
      fetchData() // Fetch new data when the page number increases
    }
  }, [page])

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query?.split("%20")?.join(" ")}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>
          Search Results
        </h3>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {data.map((searchData) => {
            return (
              <Card data={searchData} key={searchData.id + "search"} media_type={searchData.media_type} />
            )
          })}
        </div>

        {/* Load More Button */}
        {page < totalPage && (
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

export default SearchPage
