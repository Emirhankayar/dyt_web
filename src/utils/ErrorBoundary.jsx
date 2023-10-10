import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Handle the error, e.g., log it
    console.error(error, errorInfo);
    // Set the state to trigger the error page rendering
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Redirect to the 404 page
      return <Redirect to="/404" />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
