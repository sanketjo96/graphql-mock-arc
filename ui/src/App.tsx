import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TableContainer from './modules/prime-treetable/component/Container';
import WijmoTableContainer from './modules/wijmo-table/component/WijmoContainer';

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks';
import Test from './modules/hooksDemo/TestCompo';

const httpLink = createHttpLink({
  uri: 'http://giv-sales-board-dev.centricsoftware.com/buying-board-api-gateway/',
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkM2MTM2NDM3IiwidXNlcm5hbWUiOiJnbSIsImZpcnN0TmFtZSI6IkNlbnRyYWwiLCJsYXN0TmFtZSI6Ik1hcmNoYW5kaXNlciIsImVtYWlsIjoiZGV2ZW5kcmEuZGhhbmFsQHN5bmVyemlwLmNvbSIsInNlc3Npb25VcmwiOiJjZW50cmljOi8vU0VTU0lPTi84MDYxNWJlYmFjMTA2ODJmNDdiZmVhMjJjY2FmOTM3OSIsImp0aSI6ImU5MDJjZjYwLWUzMzgtMTFlOS1hNWUyLTQzNjgyZDZhMDhiYiIsImNsaWVudF9pZCI6InBvcnRhbCIsImV4cCI6MTU2OTg2MDExNywiaWF0IjoxNTY5ODE2OTE3fQ.ZzDvb-B-rEjd1nBdmGedPUETNRvSsOnfznW6fwfbxV0"
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/prime" component={Test} />
            <Route exact path="/" component={WijmoTableContainer} />
          </div>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
