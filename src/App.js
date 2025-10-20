// Hoc
//Higher order Component is a function that takes a component and return a new compoenent

// Example loader with list compoenent

import React, { useState, useEffect } from 'react';

export const HOC = (Component) => {
  const Newcomponent = ({ loading, ...rest }) => {
    if (loading) return <div>Loading...</div>;
    return <Component {...rest} />;
  };
  return Newcomponent;
};

export const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(true);
  const WrapperComponent = HOC(UserList);

  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then((res) => res.json())
      .then((o) => {
        setData(o.users);
        setTimeout(() => {
          setLoader(false);
        }, 300);
      });
  }, []);

  return (
    <div>
      <WrapperComponent loading={loading} user={data} />
    </div>
  );
};

export const UserList = ({ user }) => {
  return (
    <div>
      {user.map((x, index) => {
        return <div key={index}>{x.firstName}</div>;
      })}
    </div>
  );
};
