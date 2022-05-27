import { Component, ReactNode } from 'react';

type Props = { children: ReactNode; text: string; fallback?: ReactNode };

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
              width: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '20px',
            }}
          >
            <p>{this.props.text}</p>
          </div>
        );
      }
    }
    return this.props.children;
  }
}
