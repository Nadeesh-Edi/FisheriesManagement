import React from "react";
import "../../res/css/inv-pages.css"
import InvManagerNav from "../../navbars/inv-manager-nav";

export default function BuyerRequests() {
    return (
        <>
            <InvManagerNav />
            <div className="page">
                <h1 className="mx-5 text-body mb-5 pt-5">INVENTORY</h1>
                <br></br>
                <div className="shadow-lg p-3 mb-5 mx-5 bg-body rounded">
                    <form>
                        <div className="row">
                            <div className="col-4">
                                <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Request Id"></input>
                            </div>
                            <div className="col-4">
                                <input className="rounded-pill ps-2 mx-5" type="text" placeholder="Search Fish Type"></input>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary rounded mx-5 px-5">FILTER</button>
                            </div>
                        </div>
                    </form>
                </div>
                <table className="table table-striped mx-5">
                    <thead>
                        <tr className="table-dark">
                            <th>REQUEST ID</th>
                            <th>REQUESTER</th>
                            <th>TYPE OF FISH</th>
                            <th>QTY (KG)</th>
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