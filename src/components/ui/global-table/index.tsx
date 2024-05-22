import { Table } from 'antd';
import './style.css'

function index(props:any) {


  return (
   <>
      <div>
        <Table columns={props.thead} dataSource={props?.data?.map((e:any,i:number ) => {
          return {...e, key: i }
        })} pagination={false}  rowClassName={(_, index) => {
          return index % 2 === 0 ? 'even-row' : 'odd-row';
        }}/>
      </div>
    
   </>
  )
}

export default index
