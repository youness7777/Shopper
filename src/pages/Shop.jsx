import React from 'react'
import { Hero } from '../components/Hero/Hero'
import { Popular } from '../components/Popular/Popular'
import { Offers } from '../components/Offers/Offers'
import { Collections } from '../components/New Collections/Collections'
import { NewLetter } from '../components/Newsletters/NewLetter'

export const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <Collections/>
      <NewLetter/>
    </div>
  )
}
