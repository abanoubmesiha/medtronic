import React, { useState } from 'react'
import Welcome from './welcome'
import Attend from './attend'
import './forms.css'

function Forms() {
  const [page, setPage] = useState(2);

  return <section className='forms'>
    <h1>Welcome EA Annual Meeting</h1>
    {/* {page === 1 && <Welcome setPage={setPage} /> } */}
    {page === 2 && <Attend setPage={setPage} /> }
  </section>
}

export default Forms