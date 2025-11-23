import React,{ useState } from "react";
import axios from "axios"

function Display_Inventory(){
    const [res,setres] = useState([]);
    const resp= async()=>{
        const response=await axios.get("http://localhost:8000")
        console.log(response.data)
        setres(response.data);
    }
    resp();
    return(
        <div>
            <h1>Inventory Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {res.map(inventory=>(
                        <tr key={inventory.id} >
                            <td>{inventory.id}</td>
                            <td>{inventory.name}</td>
                            <td>{inventory.qty}</td>
                            <td>{inventory.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function AddInventory(){
    const [id,setId]=useState(0)
    const [name,setName]=useState("")
    const [qty,setQty]=useState(0)
    const [price,setPrice]=useState(0)
    const [inventory,setInventory]=useState([])
    const SubmitEvent=()=>{
        const fo={"id":id,"name":name,"qty":qty,"price":price}
        console.log(fo);
        const resp=async()=>{
            const response=await axios.post("http://localhost:8000/add",fo);
            console.log(response.data)
            const getresponse=await axios.get("http://localhost:8000")
            setInventory(getresponse.data)
        }
        resp();
    }
    return(
        <div>
            <h1>Inventory Management</h1>
            <table>
                 <tbody>
          <tr>
            <td>ID</td>
            <td>
              <input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </td>

            <td>Product Name</td>
            <td>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>

            <td>Quantity</td>
            <td>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </td>

            <td>Price</td>
            <td>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="8">
              <button onClick={SubmitEvent}>Add Item</button>
              </td></tr>
        </tbody>
            </table>
        </div>
    )
}
export {Display_Inventory,AddInventory}