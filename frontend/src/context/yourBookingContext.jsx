import React from 'react'

const yourBookingContext = React.createContext({
  userBookingList: [],
  addBookingItem: () => {},
  incrementUserBookingQuantity: () => {},
  decrementUserBookingQuantity: () => {},
})

export default yourBookingContext