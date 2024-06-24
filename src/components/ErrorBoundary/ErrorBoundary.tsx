import React, { Component, ErrorInfo, ReactNode } from 'react';
import { NextRouter, withRouter } from 'next/router';
import classNames from 'classnames/bind';
import styles from './ErrorBoundary.module.scss';

const cn = classNames.bind(styles);

interface ErrorBoundaryProps {
  children: ReactNode;
  router: NextRouter;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo });
  }
  handleRetry = () => {
    this.setState({ hasError: false });
    this.props.router.back();
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div className={cn('container')}>
            <div className={cn('logoContainer')}></div>
            <h1>Sorry... 오류가 발생했어요 😭</h1>
            <button type="button" onClick={this.handleRetry}>
              이전으로 돌아가기
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
