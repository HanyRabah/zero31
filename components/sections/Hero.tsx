'use client'
import { useEffect, useRef } from 'react'

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  return (
    <div className="relative h-screen w-full">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/zero31.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white">
          <h1 className="font-title font-normal text-4xl mb-4">Made by Architects</h1>
          {/* <p className="text-xl max-w-2xl mx-auto">
            We think of design is a human instinct to make things better, 
            and enjoy the good things in life.
          </p> */}
        </div>
      </div>
    </div>
  )
}

export default Hero