import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [filter, setFilter] = useState('')
  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])

  // Fetch the data from API
  useEffect(() => {
    let mounted = true

    fetch('https://api.publicapis.org/categories')
      .then((res) => res.json())
      .then((result) => {
        if (mounted) {
          setCategories(result.categories)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  // Filter by text
  useEffect(() => {
    if (filter) {
      const filtered = categories.filter((cat) =>
        cat.toLowerCase().includes(filter.toLocaleLowerCase())
      )
      setFilteredCategories(filtered)
    } else {
      setFilteredCategories([])
    }
  }, [filter, categories])

  function handleChange(e) {
    setFilter(e.target.value)
  }

  return (
    <div className='App'>
      <input type='text' name='filter' value={filter} onChange={handleChange} />
      <table className='table'>
        {filteredCategories.length > 0
          ? filteredCategories.map((cat) => <tr key={cat}>{cat}</tr>)
          : categories.length > 0 &&
            categories.map((cat) => <tr key={cat}>{cat}</tr>)}
      </table>
    </div>
  )
}

export default App
