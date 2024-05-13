import { Outlet } from 'react-router-dom'

function index() {
  return (
    <>
      Welcome to ASTORIYA WebSite
      <Outlet/>
    </>
  )
}

export default index