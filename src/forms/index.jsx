import React, { useState } from 'react'
import './forms.css'
import Welcome from './welcome'
import Attend from './attend'

function Forms() {
  const [page, setPage] = useState(1);

  return <section className='forms'>
    {page === 1 && <Welcome setPage={setPage} /> }
    {page === 2 && <Attend setPage={setPage} /> }
  </section>
}

export default Forms