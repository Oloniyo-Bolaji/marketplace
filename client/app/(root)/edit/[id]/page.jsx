'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductsForm from '@/components/ProductsForm'

const Edit = () => {
  const [product, setProduct] = useState({})
  const params = useParams()
  const id = params.id

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/posts/${id}`)
      const data = await res.json()
      console.log(data.data)
      setJob(data.data)
    }
    if (id) fetchProduct()
  }, [id])

  return (
    <div className="create">
      <Header />
      <main className='w-full sm:px-[50px] px-[10px] py-[20px]'>
        <h2 className='text-[20px] font-bold text-center'>Edit Job Post</h2>
        <ProductsForm product={product} />
      </main>
    </div>
  )
}

export default Edit