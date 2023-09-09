import { Link } from "react-router-dom"
import { useGetEmployeesQuery } from "./employeeSlice"


const Employees = () => {
const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
} = useGetEmployeesQuery();

const datas = data?.employees;


let content;
if(isLoading){
    content = <p>Looading...</p>
}else if(isSuccess){
    content =(
        <section>
            <h1>Employees List...</h1>
               <ul>
                {datas.map((data) => <li key={data._id}>{data?.firstname}</li>)}
               </ul>
            <Link to={'/welcome'}>Go back to welcome page</Link>
        </section>
    )
}
  return content;
}

export default Employees
