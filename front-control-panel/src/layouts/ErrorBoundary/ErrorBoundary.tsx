import "./_errorBoundary.scss";
import React, { Component, ErrorInfo, ReactNode } from "react";
import StoreIcon from "../../assets/icons/store-shop-time.svg";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorKey: number;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorKey: 0 };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState((prevState) => ({
      hasError: true,
      errorKey: prevState.errorKey + 1,
    }));
  }

  handleClose = () => {
    this.setState((prevState) => ({
      hasError: false,
      errorKey: prevState.errorKey + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-container-fix">
            <header>Sistema temporariamente indisponível</header>
            <img src={StoreIcon} alt="sistema indisponível" />
            <p>
              Estamos trabalhando em uma solução para você utilizar o sistema
            </p>
            <p>o mais rápido possível</p>
            <button onClick={this.handleClose}>
              <span>Fechar</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
