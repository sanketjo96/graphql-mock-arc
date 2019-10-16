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

const httpLink = createHttpLink({
  uri: 'http://localhost:4444/',
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkM2ODMxNjE1IiwidXNlcm5hbWUiOiJnbSIsImZpcnN0TmFtZSI6Ikdsb2JhbCIsImxhc3ROYW1lIjoiTWVyY2hhbmRpc2VyIiwiZW1haWwiOiJyYWVlc2FhLm1ldGthcmlAc3luZXJ6aXAuY29tIiwic2Vzc2lvblVybCI6ImNlbnRyaWM6Ly9TRVNTSU9OL2QxZjVhMzlhYWMxMDY4MmYwMGI0ZGYwNmJiOGQzNTExIiwianRpIjoiOTc3NDUzNjAtZWZhYi0xMWU5LTg2ZTAtMGY5MWQ4NjEwMzIwIiwiY2xpZW50X2lkIjoicG9ydGFsIiwiZXhwIjoxNTcxMjI4Nzg3LCJpYXQiOjE1NzExODU1ODd9.XpZuYtH0IHz3QHIUJ0mQmPn2ZZTCud4l8bRGys9Up5M"  
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
            <Route exact path="/" component={PersistentDrawerRight} />
          </div>
        </Router>
        <ToastContainer />
      </ApolloProvider>
    </div>
  );
}

export default App;
