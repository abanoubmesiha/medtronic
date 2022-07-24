import React, { useState } from 'react'
import Welcome from './welcome'
import Attend from './attend'
import FurtherInfo from './further-info'
import './forms.css'
import BusinessInfo from './business-info'
import BasedIn from './based-in'
import EgyptInfo from './egypt-info'

function Forms() {
  const [page, setPage] = useState(7);
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
    {page === 5 && <BusinessInfo onSubmit={onSubmit} /> }
    {page === 6 && <BasedIn onSubmit={onSubmit} /> }
    {page === 7 && <EgyptInfo onSubmit={onSubmit} /> }
  </section>
}

export default Forms