import { useEffect, useState } from 'react';
import { Space, Spin } from 'antd';
import type { TableProps } from 'antd';
import { DataType } from '../../interface/global';
import { ZusWorker } from '@store';
import { useStore } from 'zustand';
import { GlobalTable } from '@ui';
import { ToastContainer } from 'react-toastify';
import {Modal} from '../../components/ui';


function index() {
  const [ispage, setispage] = useState(1)
  const {data, count, getWorkers, isLoader, deleteWorkers, postWorkers}:any = useStore(ZusWorker)
  const limit = 5
  const lastcount = Math.ceil(count/limit)
  const getData = async() => {
    const user = {
      page: ispage,
      limit: limit,
    }
    await getWorkers(user)
}

const thead: TableProps<DataType>['columns'] = [
  {
    title: 'First name',
    dataIndex: 'first_name',
    key: 'first_name',
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
        <a onClick={() => updateButton(data[i])}>Update</a>
        <a onClick={() => deleteButton(data[i].id)}>Delete</a>
      </Space>
    ),
  },
];

  function updateButton(item:any){
    console.log(item);
  }
  async function deleteButton(id:any){
    console.log(id);
    await deleteWorkers(id)
  }

  async function postData(data:any){
    await postWorkers(data)
  }
    useEffect(() => {
      getData()
    }, [ispage])
  return (
   <>
      <ToastContainer/>
      <div className='flex justify-end  py-5'><Modal postData={postData}/></div>
      {isLoader ?  <div className='flex justify-center mt-[200px]'> <Spin size="large" /></div> :
      <GlobalTable thead={thead} data={data} lastcount={lastcount} setispage={setispage} ispage={ispage} updateButton={updateButton} deleteButton={deleteButton} />}
     </>
  )
}

export default index
