class GlobalErrorBoundary extends React.Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
            <p className="mt-2 text-gray-600">Please refresh the page or try again later.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
} 