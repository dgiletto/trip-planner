import Header from '@/_components/Header';
import React from 'react'

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default Provider;
