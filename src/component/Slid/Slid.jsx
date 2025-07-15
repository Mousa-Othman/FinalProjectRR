import React from 'react'
import Slider from "react-slick";
import imgSlider1 from '../../assets/images/1678302803089-cover.jpeg'
import imgSlider2 from '../../assets/images/1680394593396-cover.jpeg'
import imgSlider3 from '../../assets/images/1680401528864-cover.jpeg'
import imgSlider4 from '../../assets/images/1681511179514.png'
import imgSlider5 from '../../assets/images/1681511452254.png'

export default function Slid() {

   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:3000,
    cssEase: "linear",


  };
  return (
    <div className='row g-0'>
      <div className="col-md-8">
         <Slider {...settings}>
          <img src={imgSlider4} style={{width: '100%'}} alt='imgSlider1' height={500} />
          <img src={imgSlider5} class='w-100' alt='imgSlider1' height={500} />
          <img src={imgSlider3} class='w-100' alt='imgSlider1' height={500} />
          <img src={imgSlider2} class='w-100' alt='imgSlider1' height={500} />
          <img src={imgSlider1} class='w-100' alt='imgSlider1' height={500} />
      
        </Slider>

      </div>
      <div className="col-md-4">
        <img src={imgSlider4} className='w-100' alt='imgSlider1' height={250} />
        <img src={imgSlider5} className='w-100' alt='imgSlider1' height={250} />

      </div>
      
    </div>
  )
}
