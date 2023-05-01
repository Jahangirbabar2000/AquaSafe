import * as React from 'react';
import Routes from './Components/routes';
import UserContext from './Components/userAuth/UserContext'
import jwt_decode from 'jwt-decode';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function App() {
  const theme = createTheme({
    // You can customize the theme here.
    // If you want to use the default theme, you can skip this step.
  });

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
    <ThemeProvider theme={theme}>
    <div className="main">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes />
      </UserContext.Provider>
      </div>
    </ThemeProvider>
  );
}


export default App;
