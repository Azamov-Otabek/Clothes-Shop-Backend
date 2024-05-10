import { Outlet } from 'react-router-dom'

function index() {
  return (
    <>
      <div>user</div>
      <Outlet/>
    </>
  )
}

export default index