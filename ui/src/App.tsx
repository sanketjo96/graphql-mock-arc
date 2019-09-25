import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TableContainer from './modules/prime-treetable/component/Container';
import WijmoTableContainer from './modules/wijmo-table/component/WijmoContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <div style={{width: '92%'}}>
          <Route exact path="/" component={WijmoTableContainer} />
          <Route exact path="/prime" component={TableContainer} />
        </div>
      </Router>
    </div>
  );
}

export default App;
