import React from "react";

const NewButton = props => {
    return (
        <button style={{
            padding: "8px", paddingInline:"13px", fontWeight: "bold", width: "auto",
            color: "white", height: "auto", borderRadius: "10px", fontSize: "20px",
            backgroundColor: "#04273c"            
        }}>{props.text}</button>
    );
};

export default NewButton;