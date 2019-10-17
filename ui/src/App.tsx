import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ToastContainer, toast } from 'react-toastify';

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import PersistentDrawerRight from './components/Drawer';
import TreeListConatiner from './modules/stickyTree/components/Tree';

const httpLink = createHttpLink({
  uri: 'http://localhost:4444/',
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkM2ODMxNjE1IiwidXNlcm5hbWUiOiJnbSIsImZpcnN0TmFtZSI6Ikdsb2JhbCIsImxhc3ROYW1lIjoiTWVyY2hhbmRpc2VyIiwiZW1haWwiOiJyYWVlc2FhLm1ldGthcmlAc3luZXJ6aXAuY29tIiwic2Vzc2lvblVybCI6ImNlbnRyaWM6Ly9TRVNTSU9OL2Q3ZTgyMjgwYWMxMDY4MmYwMGI0ZGYwNmIyNmE4YTJkIiwianRpIjoiZTU4OWU4YjAtZjA5My0xMWU5LWFiOTgtYjc1MjkzNjkzY2RjIiwiY2xpZW50X2lkIjoicG9ydGFsIiwiZXhwIjoxNTcxMzI4NTYxLCJpYXQiOjE1NzEyODUzNjF9.KcYZ7bRJ_71WClDIWtNgSPHduKXp7ONqRMNNbyN0eyw"  }
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
            <Route exact path="/" component={PersistentDrawerRight} />
            <Route exact path="/tree" component={TreeListConatiner} />
          </div>
        </Router>
        <ToastContainer />
      </ApolloProvider>
    </div>
  );
}

export default App;
