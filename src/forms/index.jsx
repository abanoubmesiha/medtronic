import React, { useState } from 'react'
import Welcome from './welcome'
import Attend from './attend'
import FurtherInfo from './further-info'
import './forms.css'

function Forms() {
  const [page, setPage] = useState(4);
  const [data, setData] = useState({})

  const onSubmit = (moreData, nextPage) => {
    setPage(nextPage)
    setData({...data, ...moreData})
  }
  return <section className='forms'>
    <h1>Welcome EA Annual Meeting</h1>
    {page === 1 && <Welcome onSubmit={onSubmit} /> }
    {page === 2 && <Attend onSubmit={onSubmit} /> }
    {page === 3 && <>Thank You!</> }
    {page === 4 && <FurtherInfo onSubmit={onSubmit} /> }
  </section>
}

export default Forms