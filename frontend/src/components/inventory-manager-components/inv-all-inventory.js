import React from "react";
import "../../res/css/inv-pages.css"
import InvManagerNav from "../../navbars/inv-manager-nav";

export default function ViewAllInventory() {
    return(
        <>
            <InvManagerNav />
            <div className="page">
                <h1 className="mx-5 text-body mb-5 pt-5">INVENTORY</h1>
                <br></br>
                <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded">
                    <form>
                        <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Boat Id"></input>
                        <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Fish Type"></input>
                        <input className="rounded-pill ps-2 mx-5" type="date" placeholder="Inventory Date"></input>
                        <button type="submit" className="btn btn-primary rounded mx-5 px-5">FILTER</button>
                    </form>
                </div>
                <table className="table table-striped mx-5">
                    <thead>
                        <tr className="table-dark">
                            <th>INVENTORY ID</th>
                            <th>BOAT ID</th>
                            <th>OWNER NAME</th>
                            <th>INVENTORY DATE</th>
                            <th>TYPE OF FISH</th>
                            <th>QTY</th>
                            <th></th>
                        </tr>
                    </thead>
                    
                </table>
                <div className="row justify-content-end">
                    <div className="col-4">
                        <button className="btn btn-success rounded">GENERATE REPORT</button>
                    </div>
                </div>
            </div>
        </>
    )
}