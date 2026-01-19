// // import React,{ useState } from "react";
// // import axios from "axios"

// // function Display_Inventory(){
// //     const [res,setres] = useState([]);
// //     const resp= async()=>{
// //         const response=await axios.get("http://localhost:8000")
// //         console.log(response.data)
// //         setres(response.data);
// //     }
// //     resp();
// //     return(
// //         <div>
// //             <h1>Inventory Management</h1>
// //             <table>
// //                 <thead>
// //                     <tr>
// //                         <th>ID</th>
// //                         <th>Product Name</th>
// //                         <th>Quantity</th>
// //                         <th>Price</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {res.map(inventory=>(
// //                         <tr key={inventory.id} >
// //                             <td>{inventory.id}</td>
// //                             <td>{inventory.name}</td>
// //                             <td>{inventory.qty}</td>
// //                             <td>{inventory.price}</td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // }

// // function AddInventory(){
// //     const [id,setId]=useState(0)
// //     const [name,setName]=useState("")
// //     const [qty,setQty]=useState(0)
// //     const [price,setPrice]=useState(0)
// //     const [inventory,setInventory]=useState([])
// //     const SubmitEvent=()=>{
// //         const fo={"id":id,"name":name,"qty":qty,"price":price}
// //         console.log(fo);
// //         const resp=async()=>{
// //             const response=await axios.post("http://localhost:8000/add",fo);
// //             console.log(response.data)
// //             const getresponse=await axios.get("http://localhost:8000")
// //             setInventory(getresponse.data)
// //         }
// //         resp();
// //     }
// //     return(
// //         <div>
// //             <h1>Inventory Management</h1>
// //             <table>
// //                  <tbody>
// //           <tr>
// //             <td>ID</td>
// //             <td>
// //               <input
// //                 type="number"
// //                 value={id}
// //                 onChange={(e) => setId(e.target.value)}
// //               />
// //             </td>

// //             <td>Product Name</td>
// //             <td>
// //               <input
// //                 type="text"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //               />
// //             </td>

// //             <td>Quantity</td>
// //             <td>
// //               <input
// //                 type="number"
// //                 value={qty}
// //                 onChange={(e) => setQty(e.target.value)}
// //               />
// //             </td>

// //             <td>Price</td>
// //             <td>
// //               <input
// //                 type="number"
// //                 value={price}
// //                 onChange={(e) => setPrice(e.target.value)}
// //               />
// //             </td>
// //           </tr>

// //           <tr>
// //             <td colSpan="8">
// //               <button onClick={SubmitEvent}>Add Item</button>
// //               </td></tr>
// //         </tbody>
// //             </table>
// //         </div>
// //     )
// // }
// // export {Display_Inventory,AddInventory}



import React, { useState } from "react";
import axios from "axios";


function Display_Inventory() {
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const fetchInventory = async () => {
        const res = await axios.get("http://localhost:8000");
        setData(res.data);
        setLoaded(true);
    };

    if (!loaded) {
        fetchInventory();
    }

    return (
        <div>
            <h2>Inventory List</h2>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr />

           
            <AddInventory refresh={fetchInventory} />
        </div>
    );
}


function AddInventory({ refresh }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");

    const submitEvent = async () => {
        await axios.post("http://localhost:8000/add", {
            id: Number(id),
            name,
            qty: Number(qty),
            price: Number(price),
        });

        refresh(); 

        setId("");
        setName("");
        setQty("");
        setPrice("");
    };

    return (
        <div>
            <h2>Add Inventory</h2>

            <input
                placeholder="ID"
                value={id}
                onChange={e => setId(e.target.value)}
            />
            <input
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                placeholder="Qty"
                value={qty}
                onChange={e => setQty(e.target.value)}
            />
            <input
                placeholder="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <button onClick={submitEvent}>Add</button>
        </div>
    );
}

export { Display_Inventory, AddInventory };
