// Межа помилок (Error Boundary) — класовий компонент, який перехоплює помилки
// рендерингу дочірніх компонентів і показує запасний інтерфейс замість «білого
// екрана». Функціональні компоненти цього робити не вміють, тому саме клас.
import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message?: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Тут міг би бути відправник помилок у зовнішній сервіс моніторингу.
    console.error('ErrorBoundary перехопив помилку:', error, info)
  }

  handleReload = () => {
    window.location.assign('/')
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-neutral-50 p-4 dark:bg-neutral-950">
          <div className="max-w-md rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 text-4xl">⚠️</div>
            <h1 className="mb-2 text-xl font-bold">Щось пішло не так</h1>
            <p className="mb-5 text-sm text-neutral-500 dark:text-neutral-400">
              {this.state.message ?? 'Сталася непередбачена помилка інтерфейсу.'}
            </p>
            <button
              onClick={this.handleReload}
              className="rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
            >
              На головну
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
