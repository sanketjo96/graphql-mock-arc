import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TableContainer from './modules/prime-treetable/component/Container';
import { ToastContainer, toast } from 'react-toastify';
import WijmoTableContainer from './modules/wijmo-table/component/WijmoContainer';

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks';
import Test from './modules/hooksDemo/TestCompo';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

const httpLink = createHttpLink({
  uri: 'http://giv-sales-board-dev.centricsoftware.com/buying-board-api-gateway/',
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkM2MTM2NDM3IiwidXNlcm5hbWUiOiJnbSIsImZpcnN0TmFtZSI6IkNlbnRyYWwiLCJsYXN0TmFtZSI6Ik1hcmNoYW5kaXNlciIsImVtYWlsIjoiZGV2ZW5kcmEuZGhhbmFsQHN5bmVyemlwLmNvbSIsInNlc3Npb25VcmwiOiJjZW50cmljOi8vU0VTU0lPTi84NWIwMGJhYWFjMTA2ODJmNDdiZmVhMjI3NDZmNjc5NSIsImp0aSI6IjM4OGNiZTkwLWU0MDgtMTFlOS05OTc3LTE5NTA4ZDFmYTk4NCIsImNsaWVudF9pZCI6InBvcnRhbCIsImV4cCI6MTU2OTk0OTE1NywiaWF0IjoxNTY5OTA1OTU3fQ.TA8vo_QM25ExRtqwHeIyv4vN-vRzz7uYY4WNu8y2fME"
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

toast.configure({
  className: 'black-background',
  bodyClassName: "grow-font-size",
  progressClassName: 'fancy-progress-bar'
});

const App: React.FC = () => {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/prime" component={TableContainer} />
            <Route exact path="/" component={WijmoTableContainer} />
          </div>
        </Router>
        <ToastContainer />
      </ApolloProvider>
    </div>
  );
}

export default App;
