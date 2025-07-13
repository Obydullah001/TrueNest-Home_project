import React from 'react';
import { Autoplay , Pagination, Navigation} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router';

const Banner = () => {
    return (
         <div >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
             <SwiperSlide>
        <div className="">

      <section className=" bg-opacity-30 py-10 sm:py-6 lg:py-10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center flex-row-reverse grid-cols-1 gap-12 lg:grid-cols-2 ">
            <div >
              <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                A social media for learners
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                Connect & learn from the experts
              </h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                Grow your career fast with right mentor.
              </p>

              <Link
                to="#"
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-primary rounded-full lg:mt-16 hover:bg-red-900 focus:bg-yellow-400"
                role="button"
              >
                Join for free
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>

              <p className="mt-5 text-gray-600">
                Already joined us?{' '}
                <Link to="#" className="text-black transition-all duration-200 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
            <div className='sm:block md:block lg:hidden '>
              <img className='rounded-xl' src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3Dhttps://cdn.pixabay.com/photo/2020/11/21/19/30/window-5764973_1280.png" alt="" />
            </div>

             {/* Image & Shapes Section */}
        <div className="relative justify-center mt-8 lg:mt-0 hidden  lg:block"> 
         <div>
          <img className='rounded-t-full rounded-b-full w-30 h-72  absolute left-60 -top-46' src="https://images.unsplash.com/photo-1565953536805-beb35e81d3c3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlYWxlc3RhdGV8ZW58MHx8MHx8fDA%3D" alt="" />
         </div>
        
         <div>
         <img className='w-30 h-50 rounded-t-full rounded-b-full absolute left-24 -top-34' src="https://media.istockphoto.com/id/2177323088/photo/midtown-manhattan-and-central-park.jpg?s=612x612&w=0&k=20&c=NnFa9vfPnmETcekvxSYkQPy_N7SWS8btKOfhjIqCWdc=" alt="" />
         </div>
         <div>
         <img className='  w-30 h-50 rounded-t-full rounded-b-full absolute left-96 -top-34' src="https://images.unsplash.com/photo-1751572670339-100d71680909?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8" alt="" />
         </div>
          
        </div>
          </div>
        </div>
      </section>
    </div>
          

          </SwiperSlide>
             <SwiperSlide>
          <div className="">
      {/* <header className="bg-[#FCF8F1] bg-opacity-30">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link to="/" title="" className="flex">
                <img
                  className="w-auto h-8"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                  alt=""
                />
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>

              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <Link to="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                Features
              </Link>
              <Link to="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                Solutions
              </Link>
              <Link to="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                Resources
              </Link>
              <Link to="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                Pricing
              </Link>
            </div>

            <Link
              to="#"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
              role="button"
            >
              Join Now
            </Link>
          </div>
        </div>
      </header> */}

      <section className=" bg-opacity-30 py-10 sm:py-6 lg:py-10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                A social media for learners
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                Connect & learn from the experts
              </h1>
              <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                Grow your career fast with right mentor.
              </p>

              <Link
                to="#"
                className="inline-flex items-center  px-6 py-4 mt-8 font-semibold  text-black transition-all duration-200 bg-primary rounded-full lg:mt-16  hover:bg-red-900 focus:bg-yellow-400"
                role="button"
              >
                Join for free
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>

              <p className="mt-5 text-gray-600">
                Already joined us?{' '}
                <Link to="#" className="text-black transition-all duration-200 hover:underline">
                  Log in
                </Link>
              </p>
            </div>

            <div className='sm:block md:block lg:hidden '>
              <img className='rounded-xl' src="https://images.unsplash.com/photo-1565402170291-8491f14678db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            </div>

             {/* Image & Shapes Section */}
        <div className="relative justify-center mt-8 lg:mt-0 hidden lg:block ">
        <div>
          <img src="https://plus.unsplash.com/premium_photo-1680721444743-2a94a309a24a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb3BlcnR5fGVufDB8fDB8fHww" className='rounded-full w-40 h-40 absolute -left-2 bottom-32 ' alt="" />
        </div>
         <div>
          <img className='rounded-l-full rounded-tr-full w-48 h-48 absolute bottom-12 left-40' src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb3BlcnR5fGVufDB8fDB8fHww" alt="" />
         </div>
         <div>
          <img className='rounded-t-full rounded-b-full w-36 h-60  absolute right-1 bottom-10' src="https://images.unsplash.com/photo-1498373419901-52eba931dc4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb3BlcnR5fGVufDB8fDB8fHww" alt="" />
         </div>
         <div>
          <img className='rounded-br-full  w-56 h-56  absolute top-2 left-0.5 right-3.5' src="https://plus.unsplash.com/premium_photo-1661964475795-f0cb85767a88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVhbGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
         </div>
         <div>
          <p className='w-28 h-28 bg-red-900 absolute right-4 top-0.5 rounded-full'></p>
         </div>
         <div>
          <p className='w-40 h-40 bg-secondary absolute left-60 -bottom-52 rounded-t-full rounded-r-full'></p>
         </div>
          
        </div>
          </div>
        </div>
      </section>
    </div>
          

          </SwiperSlide>
             <SwiperSlide>
          <div className="">
      {/* <header className="bg-[#FCF8F1] bg-opacity-30">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex-shrink-0">
              <Link to="/" title="" className="flex">
                <img
                  className="w-auto h-8"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                  alt=""
                />
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              </svg>

              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <Link to="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                Features
              </Link>
              <Link to="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                Solutions
              </Link>
              <Link to="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                Resources
              </Link>
              <Link to="#" className="text-base text-black transition-all duration-200 hover:text-opacity-80">
                Pricing
              </Link>
            </div>

            <Link
              to="#"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
              role="button"
            >
              Join Now
            </Link>
          </div>
        </div>
      </header> */}

      <section className=" bg-opacity-30 py-10 sm:py-6 lg:py-10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider uppercase">
                A social media for learners
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                Connect & learn from the experts
              </h1>
              <p className="mt-4 text-base lg:mt-8 sm:text-xl">
                Grow your career fast with right mentor.
              </p>

              <Link
                to="#"
                className="inline-flex items-center  px-6 py-4 mt-8 font-semibold  text-black transition-all duration-200 bg-primary rounded-full lg:mt-16  hover:bg-red-900 focus:bg-yellow-400"
                role="button"
              >
                Join for free
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>

              <p className="mt-5 text-gray-600">
                Already joined us?{' '}
                <Link to="#" className="text-black transition-all duration-200 hover:underline">
                  Log in
                </Link>
              </p>
            </div>

            <div className='sm:block md:block -mt-9 '>
              <img className='rounded-xl' src="https://images.unsplash.com/photo-1592595896616-c37162298647?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D" alt="" />
            </div>
       
          </div>
        </div>
      </section>
    </div>
          

          </SwiperSlide>



             {/* <SwiperSlide>
          <div class="bg-[url('https://img.freepik.com/premium-photo/fit-people-running-race-park_13339-240082.jpg?uid=R198086361&ga=GA1.1.483574112.1745928912&semt=ais_hybrid&w=740')] bg-cover bg-center  w-sm h-[550px]  lg:w-5xl mx-auto lg:h-[550px]  ">
          <div className='text-center '>
          <div className=''>
            <p className='pt-[150px] lg:pt-[330px]'> Experience the Thrill of the Run </p>
             <h1 className='text-5xl font-semibold '>
            Step Into the Race of a Lifetime
            </h1>
            <p className=''>Participate in dynamic events designed for all skill levels and ages.</p>
            <Link to='' href="#_" class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-orange-500 rounded-xl group">
    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-orange-200 rounded group-hover:-mr-4 group-hover:-mt-4">
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
    </span>
    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-orange-400 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Register Now</span>
</Link>
        </div>
         </div>
          </div>
          

          </SwiperSlide> */}
           
            
            
        </Swiper>
      </div>
    );
};

export default Banner;