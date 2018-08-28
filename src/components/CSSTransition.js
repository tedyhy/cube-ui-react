import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default class CSSTransitionWrap extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this.state = {
      in: false,
    };
  }

  componentDidMount() {
    this.setState({ in: true });
  }

  render() {
    return (
      <CSSTransition
        appear
        in={this.state.in}
        exit={false}
        classNames="app-animation"
        timeout={{ appear: 400, enter: 400 }}
      >
        {this.props.children}
      </CSSTransition>
    );
  }
}
