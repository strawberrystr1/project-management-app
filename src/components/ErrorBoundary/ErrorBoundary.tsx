import React, { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode; fallback?: ReactNode };

export default class ErrorBoundary extends Component<Props, { error: boolean }> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback;
      } else {
        return (
          <div
            style={{
              height: '100px',
              width: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <p>Something went wrong...</p>
            <p>You can try to reload the page</p>
          </div>
        );
      }
    }
    return this.props.children;
  }
}
