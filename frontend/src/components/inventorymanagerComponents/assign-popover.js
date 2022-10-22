import React,{ useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

import "../../res/css/inv-pages.css"

export default function AssignPopover(props) {
    const product = props.name.product;
    const closeFunc = props.name.popFunc;
    let addedInv = props.name.addedInv;
    const [inventory, setInventory] = useState([]);
    const [selectedInv, setSelectedInv] = useState([]);
    const [assingQty, setAssignQty] = useState(0);

    async function getInventory() {
        axios.get("http://localhost:9000/api/invManager/getAllInventory").then((res) => {
            setInventory(res.data);
        }).catch((err)=>{
            alert((err.message));
        })
    }

    function createAssign() {
        axios.post(`http://localhost:9000/api/invManager/updateToAssigned/${selectedInv._id}`).then(() => {
            // alert("Item assigned to request successfully");
            swal({
                title: "Added successfully",
                icon: "success",
                buttons: true,
              }).then(() => {
                addedInv.push(selectedInv)
                closePopup();
              })
            
        }).catch((err) => {
            // alert(err);
            closePopup();
        })
    }

    function closePopup() {
        return closeFunc(false);
    }

    useEffect(() => {
        getInventory();
    }, [])

    return (
        <>
            <div className="pop">
                <div class="table-wrapper-scroll-y my-custom-scrollbar mx-5 w-100">
                <table className="table table-striped">
                    <thead>
                        <tr className="table-dark fs-6">
                            <th><center>OWNER NAME</center></th>
                            <th><center>INVENTORY DATE</center></th>
                            <th><center>TYPE OF FISH</center></th>
                            <th><center>QTY AVAILABLE</center></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="fs-6">
                            {
                                inventory.filter(val => {
                                    return val.fishType.toLowerCase().includes(product.toLowerCase()) &&
                                        !val.assign
                                }).map(function(f) {
                                    return <tr>
                                        <td ><center> {f.owner} </center></td>
                                        <td ><center> {f.inventoryDate} </center></td>
                                        <td ><center> {f.fishType} </center></td>
                                        <td ><center> {f.qty} </center></td>
                                        <td><center>
                                            <button className="btn btn-success rounded-pill" 
                                                onClick={() => {setSelectedInv(f)}}>SELECT</button>
                                            </center>
                                        </td>
                                    </tr>
                                })
                            }
                    </tbody>
                </table>
                </div>
                <div className="row ms-5 mt-5">
                    <div className="col-5" >
                        Enter assigning quantity
                    </div>
                    <div className="col-5">
                        <input type="Number" onChange={(e) => {setAssignQty(e.target.value)}}></input>kg
                    </div>
                </div>
                <div className="text-center mt-4">
                    <div className="row">
                        <div className="text-center">
                            <button className="btn btn-success rounded-pill col-3" onClick={createAssign}>ADD</button>
                            <button className="btn btn-danger rounded-pill col-3" onClick={closePopup}>CLOSE</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}