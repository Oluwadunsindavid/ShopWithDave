import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {

  // get the products data and currency sy,bol from the context
  const {products, currency} = useContext(ShopContext)

  return (
    <div>Orders</div>
  )
}

export default Orders