// import React,{ useState } from "react";
// import axios from "axios"

// function Display_Inventory(){
//     const [res,setres] = useState([]);
//     const resp= async()=>{
//         const response=await axios.get("http://localhost:8000")
//         console.log(response.data)
//         setres(response.data);
//     }
//     resp();
//     return(
//         <div>
//             <h1>Inventory Management</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Product Name</th>
//                         <th>Quantity</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {res.map(inventory=>(
//                         <tr key={inventory.id} >
//                             <td>{inventory.id}</td>
//                             <td>{inventory.name}</td>
//                             <td>{inventory.qty}</td>
//                             <td>{inventory.price}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// function AddInventory(){
//     const [id,setId]=useState(0)
//     const [name,setName]=useState("")
//     const [qty,setQty]=useState(0)
//     const [price,setPrice]=useState(0)
//     const [inventory,setInventory]=useState([])
//     const SubmitEvent=()=>{
//         const fo={"id":id,"name":name,"qty":qty,"price":price}
//         console.log(fo);
//         const resp=async()=>{
//             const response=await axios.post("http://localhost:8000/add",fo);
//             console.log(response.data)
//             const getresponse=await axios.get("http://localhost:8000")
//             setInventory(getresponse.data)
//         }
//         resp();
//     }
//     return(
//         <div>
//             <h1>Inventory Management</h1>
//             <table>
//                  <tbody>
//           <tr>
//             <td>ID</td>
//             <td>
//               <input
//                 type="number"
//                 value={id}
//                 onChange={(e) => setId(e.target.value)}
//               />
//             </td>

//             <td>Product Name</td>
//             <td>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </td>

//             <td>Quantity</td>
//             <td>
//               <input
//                 type="number"
//                 value={qty}
//                 onChange={(e) => setQty(e.target.value)}
//               />
//             </td>

//             <td>Price</td>
//             <td>
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </td>
//           </tr>

//           <tr>
//             <td colSpan="8">
//               <button onClick={SubmitEvent}>Add Item</button>
//               </td></tr>
//         </tbody>
//             </table>
//         </div>
//     )
// }
// export {Display_Inventory,AddInventory}
import React, { useState } from "react";
import axios from "axios";

/* ================= DISPLAY INVENTORY ================= */

function Display_Inventory() {
    const [res, setRes] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const fetchInventory = async () => {
        try {
            const response = await axios.get("http://localhost:8000");
            setRes(response.data);
            setLoaded(true);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    // Runs only once (NO useEffect)
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
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {res.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ================= ADD INVENTORY ================= */

function AddInventory({ onAdd }) {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");

    const submitEvent = async () => {
        const data = {
            id: Number(id),
            name: name,
            qty: Number(qty),
            price: Number(price),
        };

        try {
            await axios.post("http://localhost:8000/add", data);
            alert("Item added successfully");

            // Clear inputs
            setId("");
            setName("");
            setQty("");
            setPrice("");

            // Refresh inventory list
            if (onAdd) onAdd();
        } catch (error) {
            console.error("Error adding inventory:", error);
        }
    };

    return (
        <div>
            <h2>Add Inventory</h2>
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

                        <td>Name</td>
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
                            <button onClick={submitEvent}>Add Item</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

/* ================= MAIN COMPONENT ================= */

function Inventory() {
    const [refresh, setRefresh] = useState(false);

    const reloadInventory = () => {
        setRefresh(!refresh); // trigger rerender
    };

    return (
        <div>
            <h1>Inventory Management System</h1>
            <AddInventory onAdd={reloadInventory} />
            <hr />
            <Display_Inventory key={refresh} />
        </div>
    );
}

export default Inventory;
