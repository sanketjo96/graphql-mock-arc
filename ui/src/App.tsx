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
import PersistentDrawerLeft from './components/Drawer';
import HookDemo from './modules/hooksDemo';

const httpLink = createHttpLink({
  uri: 'http://giv-sales-board-dev.centricsoftware.com/buying-board-api-gateway/',
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkM2ODMxNjE1IiwidXNlcm5hbWUiOiJnbSIsImZpcnN0TmFtZSI6Ikdsb2JhbCIsImxhc3ROYW1lIjoiTWVyY2hhbmRpc2VyIiwiZW1haWwiOiJyYWVlc2FhLm1ldGthcmlAc3luZXJ6aXAuY29tIiwic2Vzc2lvblVybCI6ImNlbnRyaWM6Ly9TRVNTSU9OL2IzYWRiMjIyYWMxMDY4MmYwMGI0ZGYwNmM0MDNjZGQxIiwianRpIjoiYmFkOTUxNTAtZWIwYy0xMWU5LWI3NGEtNTVhY2Q1ZWY3ZGUzIiwiY2xpZW50X2lkIjoicG9ydGFsIiwiZXhwIjoxNTcwNzIwNzUxLCJpYXQiOjE1NzA2Nzc1NTF9.BrnIZNYSPpaoFhoR3_oAcc2RhDcUb84F-WBeevy06cs"
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
            <Route exact path="/" component={PersistentDrawerLeft} />
            <Route exact path="/hooks" component={HookDemo} />
          </div>
        </Router>
        <ToastContainer />
      </ApolloProvider>
    </div>
  );
}

export default App;
