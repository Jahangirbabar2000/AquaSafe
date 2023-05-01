import * as React from 'react';
import Routes from './Components/routes';
import UserContext from './Components/userAuth/UserContext'
import jwt_decode from 'jwt-decode';


function App() {
  const [user, setUser] = React.useState(null);

  // Check for JWT token and set user state
  React.useEffect(() => {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      try {
        const decodedUser = jwt_decode(jwtToken);
        setUser(decodedUser);
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }
  }, []);

  return (
    <div className="main">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes />
      </UserContext.Provider>
    </div>
  );
}


export default App;
