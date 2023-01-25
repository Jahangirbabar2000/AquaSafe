import Notification from "./notification";
import './notifications.css'
import { Grid } from "@mui/material";
import Sidebar from "../sidebar/side-bar";

const notifications = (props) => {
  return (

    <Grid container>
      <Sidebar />
      <Grid item xs={8} sm={7} md={12}>
        <div className="notifications">{
          props.data.map((notification) => {
            return <Notification notifData={notification} />;
          })
        }</div>
      </Grid>
    </Grid>


  );
}

export default notifications;