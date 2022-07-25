import React, { useState } from 'react'
import Welcome from './welcome'
import Attend from './attend'
import FurtherInfo from './further-info'
import './forms.css'
import BusinessInfo from './business-info'
import BasedIn from './based-in'
import EgyptInfo from './egypt-info'
import FlyInfo from './fly-info'
import { PAGES } from './utils'

function Forms() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({})

  const onSubmit = async (moreData, nextPage) => {
    const allData = {...data, ...moreData};
    setPage(nextPage)
    setData(allData);
    if (nextPage === PAGES.THANKYOU) {
        await fetch(process.env.REACT_APP_API_SEND_DATA, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(allData)
        });
    }
  }
  return <section className='forms'>
    <h1>Welcome EA Annual Meeting</h1>
    {page === PAGES.WELCOME && <Welcome onSubmit={onSubmit} allData={data} /> }
    {page === PAGES.ATTEND && <Attend onSubmit={onSubmit} setPage={setPage} allData={data} /> }
    {page === PAGES.THANKYOU && <><h3>Thank You!</h3>Registration have beeen submitted</> }
    {page === PAGES.FURTHER && <FurtherInfo onSubmit={onSubmit} setPage={setPage} allData={data} /> }
    {page === PAGES.BUSINESS && <BusinessInfo onSubmit={onSubmit} setPage={setPage} allData={data} /> }
    {page === PAGES.BASED && <BasedIn onSubmit={onSubmit} setPage={setPage} allData={data} /> }
    {page === PAGES.EGYPT && <EgyptInfo onSubmit={onSubmit} setPage={setPage} allData={data} /> }
    {page === PAGES.FLY && <FlyInfo onSubmit={onSubmit} setPage={setPage} /> }
  </section>
}

export default Forms