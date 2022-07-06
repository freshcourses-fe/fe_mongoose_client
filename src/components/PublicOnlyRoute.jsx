import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicOnlyRoute = props => {
  const { user, isLoading, error } = useSelector(state => state.auth);

  if (isLoading) {
    return <div>LOADING ...</div>;
  }

  if (!user) {
    return <Route {...props} />;
  }

  return <Redirect to='/' />;
};

export default PublicOnlyRoute;
