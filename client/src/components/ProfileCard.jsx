import React from 'react'

export default function ProfileCard({firstName,lastName,image,birthDate,email,address,phone,university,username,city}) {
   

    
         
  
  return (
   <>
   <div className='h-full w-[70%] sm:w-[55%] md:w-[40%] bg-gray-300 rounded-xl mb-2  '>
    <img src={image} alt="avatar" className='w-full md:max-w-fit h-fit mb-3 ' />

    <h1 className='text-center text-2xl font-bold shadow-md mb-2 '> {`${firstName}  ${lastName}` }   Profile</h1>

   <div className='w-full h-full flex flex-col md:flex-row items-start justify-around p-2'>

   <div className=' rounded-md border shadow-md m-2 p-1'>
            <h2 className='text-lg font-bold mb-2 text-green-500'>Personal Information</h2>
            <p className='mb-2'>
              <strong>Username:</strong> {username}
            </p>
            <p className='mb-2'>
              <strong>Birth Date:</strong> {birthDate}
            </p>
            <p className='mb-2'>
              <strong>University:</strong> {university}
            </p>
          </div>

          <div className='rounded-md border shadow-md m-2 p-1'>
            <h2 className='text-lg font-bold mb-2'>Contact Information</h2>
            <p className='mb-2'>
              <strong>Email:</strong> {email}
            </p>
            <p className='mb-2'>
              <strong>Address:</strong> {address}
            </p>
            <p className='mb-2'>
              <strong>Contact:</strong> {phone}
            </p>
            <p className='mb-2'>
              <strong>City:</strong> {city}
            </p>
          </div>

   </div>
   </div>
   </>
  )
}
