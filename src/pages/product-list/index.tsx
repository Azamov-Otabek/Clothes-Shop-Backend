import { useEffect, useState } from 'react';
import { Space, Spin } from 'antd';
import type { TableProps } from 'antd';
import { DataType } from '../../interface/global';
import { ZusProduct, ZusCategory } from '@store';
import { useStore } from 'zustand';
import { GlobalTable } from '@ui';
import { ToastContainer } from 'react-toastify';
import {ProductModal, UploadImg} from '../../components/ui';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { setCookies } from '../../utils/cocies';

function index() {
  const navigate = useNavigate()
  const [ispage, setispage] = useState(1)
  const {data, count, getProduct, isLoader, deleteProduct, postProduct, updateProduct}:any = useStore(ZusProduct)
  const {datas, getCategory}:any = useStore(ZusCategory)
  const limit = 5
  const lastcount = Math.ceil(count/limit)
  const getData = async() => {
    const user = {
      page: ispage,
      limit: limit,
    }
    await getProduct(user)
    await getCategory({page: 1, limit: 1000})
}

const thead: TableProps<DataType>['columns'] = [
  {
    title: 'Product name',
    dataIndex: 'product_name',
    key: 'product_name',
    className: 'name-column',
  },
  {
    title: 'Country',
    dataIndex: 'made_in',
    key: 'made_in',
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'For Gender',
    dataIndex: 'for_gender',
    key: 'for_gender',
    className: 'name-column',
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    className: 'action',
    render: (__, _, i) => (
      <Space size="middle">
        <div className='w-[200px]'>
          <a><UploadImg id={data[i].product_id}/></a>
        </div>
          <a className='pl-[70px] text-[30px]' onClick={() => viewmore(data[i].product_id)}><EyeOutlined /></a>
      </Space>
    ),
  },
];
  async function deleteButton(id:any){
    await deleteProduct(id)
    getData()
  }

  async function postData(data:any){
    await postProduct(data)
    getData()
  }

  async function updateData(data:any){
    await updateProduct(data)
    getData()
  }

  function viewmore(id:string){
    setCookies('id', id)
    navigate('/admin/wiewproduct')
  }
    useEffect(() => {
      getData()
    }, [ispage])
  return (
   <>
      <ToastContainer/>
      <div className='flex justify-end  py-5'><ProductModal datas={datas} postData={postData} text={'add'} title={'Product'}/></div>
      {isLoader ?  <div className='flex justify-center mt-[200px]'> <Spin size="large" /></div> :
      <GlobalTable thead={thead} data={data} lastcount={lastcount} setispage={setispage} ispage={ispage}/>}
     </>
  )
}

export default index
