export const Newbutton = ({handleShow}) => {
   
    return (
        <div className="newBtn" style={{ display: "inline-block", color: "yellow", position: "relative", top: "30%", left: "30%", border: "2px solid olive", backgroundColor: "#082F49", padding: "10px", textAlign: "center" }}>
            <h1 style={{ margin: "1rem" }}>Click on the Button Below to Add your Details</h1>
            <button style={{ backgroundColor: "skyblue", width: "6rem", padding: "5px", margin: "0rem 1rem 1rem 1rem", borderRadius: "8px" }} onClick={()=>handleShow()}>Add</button>
        </div>
    )
}