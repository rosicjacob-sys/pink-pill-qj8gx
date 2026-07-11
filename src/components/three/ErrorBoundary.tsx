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
          <div className="text-center">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full" style={{ background: 'radial-gradient(circle at 40% 35%, #3B82F6 0%, #1E5BFA 50%, #0A1F44 100%)', boxShadow: '0 0 100px rgba(30,91,250,0.3), 0 0 200px rgba(30,91,250,0.1)', animation: 'float 8s ease-in-out infinite' }} />
            <p className="text-sapphire font-display text-2xl font-bold">GHK-Cu</p>
            <p className="text-muted text-sm">Copper Peptide</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
