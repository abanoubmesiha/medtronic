import React, { useState } from 'react'
import Welcome from './welcome'
import Attend from './attend'
import './forms.css'

function Forms() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({})

  const onSubmit = (moreData) => {
    setPage(page +1)
    setData({...data, ...moreData})
  }
  return <section className='forms'>
    <h1>Welcome EA Annual Meeting</h1>
    {page === 1 && <Welcome onSubmit={onSubmit} /> }
    {page === 2 && <Attend onSubmit={onSubmit} /> }
  </section>
}

export default Forms