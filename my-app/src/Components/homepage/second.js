import React from "react"
import "./homepage.css";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ConstructionIcon from '@mui/icons-material/Construction';

export default function Second(){
    return(
        <div className="more">
            <h1 id="heading">See more. Learn More. Do more. </h1>
            {/* <PriorityHighIcon sx={{fontSize:40}} /> */}
            <div className="Info-container">
                <InfoBox icon={<PriorityHighIcon sx={{ fontSize:100}}/>} up="Get Alerts for critical Contamination" />
                <InfoBox icon={<NotificationsIcon sx={{ fontSize: 100}}/>} up="You choose between push or regular interval notifications" />
                <InfoBox icon={<ManageAccountsIcon sx={{fontSize:100}}/>} up="Manage user visibility and interactions" />
                <InfoBox icon={<ConstructionIcon sx={{ fontSize: 100}}/>} up="Assign technicians to tasks as needed" />

            </div>
        </div>
    );
}

function InfoBox(props){
    return(
        <div className="Info">
             {props.icon}
            <p style={{marginTop: 23,fontSize:23}}>{props.up}</p>   
        </div>
    );
}