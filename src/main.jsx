import React from 'react'
import ReactDOM from 'react-dom/client'
import RootRouter from './RootRouter.jsx'
import './index.css'

class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[GlobalErrorBoundary Caught Error]:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '3rem',
          maxWidth: '800px',
          margin: '4rem auto',
          background: '#FAF7F2',
          border: '1px solid rgba(197, 160, 89, 0.4)',
          borderRadius: '16px',
          fontFamily: 'sans-serif',
          color: '#161513'
        }}>
          <h2 style={{ color: '#9E7D3B', marginTop: 0 }}>Pearl Lighting Atelier — Recovery View</h2>
          <p style={{ color: '#58534A' }}>A rendering error was caught by the boundary:</p>
          <pre style={{
            background: '#FFFFFF',
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid rgba(22, 21, 19, 0.1)',
            overflowX: 'auto',
            color: '#B00020',
            fontSize: '0.85rem'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              background: '#161513',
              color: '#FAF7F2',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalErrorBoundary>
    <RootRouter />
  </GlobalErrorBoundary>
)
