import React from 'react'

interface ProductPageProps {
  params: Promise<{
    category: string;
    product: string;  // product slug
  }>;
}

export default function page() {
  return (
    <div>page</div>
  )
}
