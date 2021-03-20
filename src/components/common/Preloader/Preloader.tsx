import React from 'react'
import preloader from '../../../assets/images/preloader.svg'

let Preloader = () => {
  return (
    <div className="preloader">
      <p>
        <img src={preloader} alt="preloader..." />
      </p>
    </div>
  )
}

export default Preloader
