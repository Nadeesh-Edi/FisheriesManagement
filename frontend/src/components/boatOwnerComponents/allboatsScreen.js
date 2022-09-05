import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../res/css/regboat.css'
import { Button } from "@material-ui/core";
import { Link} from 'react-router-dom'
import swal from 'sweetalert';
import jspdf from 'jspdf'
import 'jspdf-autotable'
import BOwnerNav from "../navbars/b.owner.nav";

export default function AllBoats(){

    const [boats, setBoats] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");


    const deleteBoat=(id) =>{
        swal({
            title: "Are you sure?",
            text: "The Boat Will be Deleted ",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
                if(willDelete){
            axios.delete(`http://localhost:9000/api/boats/${id}`).then(()=>{


            if (willDelete) {
              swal({
                title: "The Boat has been Removed!",
                text: "You can Continue with Remaining Boats.",
                icon:  "success",
                type: "success"
              }).then(function(){
                window.location.href="/allboats";
               })
            } else {
              swal("Request Is Not Deleted");
            }
          });
        }
    });
    
    }

    const generatePDF = tickets => {
 
        const doc = new jspdf();
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];
        const tableColumn = ["Boat Name","Boat Number", "Boat Type"];
        const tableRows = [];
    
        tickets.map(ticket => {
            const ticketData = [
                ticket.boatName,
                ticket.boatNo,
                ticket.boatType

            ];
            tableRows.push(ticketData);
        })
        doc.text("Boat Details Report", 14, 15).setFontSize(12);
        doc.text(`Report Genarated Date - ${dateStr} `, 14, 23);
        // doc.addImage(img, 'JPEG', 170, 8, 22, 22);
        // right down width height
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
        doc.save(`Boat_Details_Report.pdf`);
      };

    useEffect(()=>{
        function getBoats() {
            axios.get("http://localhost:9000/api/boats/allboats").then((res)=>{
                setBoats(res.data);
            }).catch((err)=>{
                alert((err.message));
            })
        }
        getBoats();
    },[])


    return(
        <>
        <BOwnerNav />
        <div className="vlft"><div className="vcard">

        <br/><br/>
        <h3><center> All Boats </center></h3>
        <br/><br/> 


        <Link to={"/registerboat"} ><Button type="button" class="btn btn-primary" > Add New Boat</Button></Link>

        <Button style={{padding:'Right'}}type="button" class="btn btn-outline-warning" onClick={() =>  generatePDF(boats)}>Generate Report</Button>

        

        <div className="row g-3">
        <div className="col-sm-7">
        <i className="fas fa-search" style={{padding: "30px"}} aria-hidden="true"></i>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Users" aria-label="Search" 
        
        onChange={(e) => {
            setsearchTerm(e.target.value)
        }}/>
        </div>

        <div className="col-sm">
        <h5>Boat Count : {boats.length}</h5>
        </div>
        </div>

        <br/><br/>


        <table className="table table-bordered">
        <table className="table table-hover" >
                    <thead>
                        <tr>
                            <th><center> Boat Name </center></th>
                            <th><center> Boat Number </center></th>
                            <th><center> Boat Type </center></th>
                            <th></th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            boats.filter(val=>{
                                if (searchTerm === ''){
                                    return val;
                                } else if(

                                     val.boatName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     val.boatNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                     val.boatType.toLowerCase().includes(searchTerm.toLowerCase())
                                ){
                                    return val;
                                }
                                }).map(function (f) {
                                        return <tr>
                                    <td ><center> {f.boatName} </center></td>
                                    <td ><center> {f.boatNo} </center></td>
                                    <td ><center> {f.boatType} </center></td>
                                    
                                    <td > <Link to={"/view/" + f._id} ><Button type="button" class="btn btn-primary" > View Details </Button></Link></td>
                                    <td > <Link to={"/update/" + f._id} ><Button type="button" class="btn btn-primary" > Update Boat </Button></Link></td>
                                    <td > <Button type="button" class="btn btn-outline-danger" onClick={() =>  deleteBoat(f._id)}> Delete </Button></td>
                                        </tr>
        
                                    })
                                }
                            
                    </tbody>
                    </table>
                </table>
           </div>
           </div>
        </>

    )

}