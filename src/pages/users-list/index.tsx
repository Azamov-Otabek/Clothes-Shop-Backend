import { useEffect, useState } from 'react';
import { Space, Spin } from 'antd';
import type { TableProps } from 'antd';
import { DataType } from '../../interface/global';
import { ZusUser } from '@store';
import { useStore } from 'zustand';
import { GlobalTable } from '@ui';
import { ToastContainer } from 'react-toastify';
import {Modal} from '../../components/ui';


function index() {
  const [ispage, setispage] = useState(1)
  const {data, count, getUsers, isLoader, deleteUsers, postUsers, updateUsers} = useStore(ZusUser)
  const limit = 5
  const lastcount = Math.ceil(count/limit)
  const getData = async() => {
    const user = {
      page: ispage,
      limit: limit,
    }
    await getUsers(user)
}

const thead: TableProps<DataType>['columns'] = [
  {
    title: 'First name',
    dataIndex: 'first_name',
    key: 'first_name',
    className: 'name-column',
  },
  {
    title: 'Last name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    className: 'name-column',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (__, _, i) => (
      <Space size="middle">
        <a><Modal postData={updateData} text={updateData}/></a>
        <a className='bg-[#151341] py-[7px] px-[15px] rounded-md text-white font-bold ' onClick={() => deleteButton(data[i].id)}>Delete</a>
      </Space>
    ),
  },
];
  async function deleteButton(id:any){
    await deleteUsers(id)
    getData()
  }

  async function postData(data:any){
    await postUsers(data)
    getData()
  }

  async function updateData(data:any){
    await updateUsers(data)
    getData()
  }
    useEffect(() => {
      getData()
    }, [ispage])
  return (
   <>
      <ToastContainer/>
      <div className='flex justify-end  py-5'><Modal postData={postData} text={'add'} title={'User'}/></div>
      {isLoader ?  <div className='flex justify-center mt-[200px]'> <Spin size="large" /></div> :
      <GlobalTable thead={thead} data={data} lastcount={lastcount} setispage={setispage} ispage={ispage}/>}
     </>
  )
}

export default index
