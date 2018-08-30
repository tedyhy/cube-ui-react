import React from 'react';
import Loading from '../../components/loading';

export default class LoadingExample extends React.PureComponent {
  render() {
    return (
      <div className="cube-content">
        <Loading />
        <Loading size={28} />
        <Loading size={40} />
      </div>
    );
  }
}
