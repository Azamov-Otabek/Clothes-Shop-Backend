import { Table } from 'antd';


function index(props:any) {
  return (
   <>
      <div>
        <Table columns={props.thead} dataSource={props.data.map((e:any,i:number ) => {
          return {...e, key: i }
        })} pagination={false} />
      </div>
      
      
      <div className='flex justify-center items-center gap-3 mt-[30px]'>
        <button onClick={() => props.setispage(props.ispage - 1)} disabled={props.ispage == 1 ? true : false} className='bg-[#3D94FF] py-[6px] px-[8px] rounded-xl text-[white] font-bold'>back</button>
        <button className='cursor-auto font-bold '>{props.ispage}</button>
        <button onClick={() => props.setispage(props.ispage + 1) } disabled={props.ispage == props.lastcount && true} className='bg-[#3D94FF] py-[6px] px-[8px] rounded-xl text-[white] font-bold'>next</button>
      </div> 
   </>
  )
}

export default index
