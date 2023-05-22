import React from 'react'
import "./Container.css"
function Container({children}) {
  return (
    <main>
      {children}
    </main>
  )
}

export default Container