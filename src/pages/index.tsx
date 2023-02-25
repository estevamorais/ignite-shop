import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { HomeContainer, HomeSlider, ProductItem } from '../styles/pages/home'

import tshirt from '../assets/tshirt.png'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer>
      <HomeSlider ref={sliderRef} className="keen-slider">
        {[1, 2, 3, 4].map((item) => {
          return (
            <ProductItem href="#" key={item} className="keen-slider__slide">
              <Image src={tshirt} width={520} height={480} alt="" />

              <footer>
                <strong>T-shit X</strong>
                <span>$ 79.90</span>
              </footer>
            </ProductItem>
          )
        })}
      </HomeSlider>
    </HomeContainer>
  )
}
