import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

export default class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="absolute inset-0 flex items-center justify-center bg-porcelain">
          <div className="w-48 h-48 rounded-full animate-float"
            style={{
              background: 'radial-gradient(circle at 40% 35%, #FF2E88 0%, #C4126B 50%, #8A0030 100%)',
              boxShadow: '0 0 120px rgba(255,46,136,0.5), 0 0 250px rgba(255,46,136,0.2), 0 30px 80px rgba(26,10,20,0.3)',
            }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
