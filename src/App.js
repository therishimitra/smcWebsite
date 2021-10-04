import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import './App.css';
import CustomBtn from './components/customBtn';
import NavBar from './components/navBar';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ATCalendar from './ATCalendar';
import Recording from './Recording';
import Rehearsal from './Rehearsal';
import EditAndCollab from './EditAndCollab';

const theme = createTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

function App() {
  return (
    <Router>
      <div className="App">
      
      <ThemeProvider theme={theme}>

      <NavBar/>
      <Switch>
        <Route path = "/" exact component={ATCalendar}/>
        <Route path = "/Recording" exact component={Recording}/>
        <Route path = "/Rehearsal" exact component={Rehearsal}/>
        <Route path = "/EditAndCollab" exact component={EditAndCollab}/>
      </Switch>

      </ThemeProvider>
      
      </div>
    </Router>
      
    
    
  );
}

export default App;
