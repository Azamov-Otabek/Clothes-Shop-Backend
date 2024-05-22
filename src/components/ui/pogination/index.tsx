import { Pagination } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

function index(props:any) {
    const navigate = useNavigate()
    const location = useLocation()
    function handlechange(e:any){
        props.setpage(e)
        const searchparams = new URLSearchParams(location.search)
        searchparams.set('page', e)
        navigate(`?${searchparams}`)
    }
  return (
    <Pagination className='flex justify-center mt-8' defaultCurrent={props.page} total={props.totall} pageSize={5} onChange={(e) => handlechange(e)} />
  )
}

export default index