import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css'

import { Container, Carousel } from 'react-bootstrap'

const Home = () => {
  return (
    <Container>
      <Head>
        <title>WELCOME</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <h3>Welcome to Järvenpää City</h3>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100' 
            src='/Jarvenpaa.jpg'
            alt='First slide'
          />
          <Carousel.Caption> 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/keskusta.jpg'
            alt='Second slide'
          />

          <Carousel.Caption> 
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src='/pellolla.jpg'
            alt='Third slide'
          />

          <Carousel.Caption> 
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  )
}
export default Home
