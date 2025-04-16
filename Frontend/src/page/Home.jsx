// Home.jsx
import React from 'react'
import {Slider} from '../Components/Slider/Slider'
import Category from '../Components/Category/Category'
import { Popular } from '../Components/Popular/Popular'
import ProductType from '../Components/ProductType/ProductType'

export const Home = () => {
  return (
    <div>
      <Slider />
      <Category />
      <Popular />
      <ProductType />
    </div>
  )
}

