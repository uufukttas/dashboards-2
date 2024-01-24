import { Input } from '@projects/input'
import { Label } from '@projects/label'
import { Button } from '@projects/button'
import React from 'react'

interface CardProps {
  className?: string
}

const Card = ({
  className,
}: CardProps) => {
  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-100 ${className}`}>
      <div className="bg-white p-8 rounded shadow-md md:w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <Label htmlFor="username" labelText="Username" className='block text-sm font-medium text-gray-600' />
            <Input id="username" name="username" className="mt-1 p-2 w-full border rounded-md" type="text" />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" labelText="Password" className='block text-sm font-medium text-gray-600' />
            <Input id="password" name="password" className="mt-1 p-2 w-full border rounded-md" type="password" />
          </div>

          <Button className="bg-red-500 text-white p-2 rounded-md w-full" type="submit" buttonText='Submit' />
        </form>
      </div>
    </div>


  )
}

export default Card