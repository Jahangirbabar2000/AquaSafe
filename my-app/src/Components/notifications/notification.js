import './notifications.css'

const notification = (props) => {
    const data = props.notifData;
    return (
        <p style={{ backgroundColor: data.pH > 10 ? '#bb2f2f' :null }} className='notification'>{`Country: ${data.Country} pH: ${data.pH} Time: ${data.time} Date:${data.date}`}</p>
    );
}

export default notification;