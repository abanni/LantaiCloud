import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import React from 'react';

// Mock motion library (framer-motion successor) - it uses browser APIs not in JSDOM
vi.mock('motion/react', () => {
  const Div = ({ children, ...props }: any) => React.createElement('div', props, children);
  const Button = ({ children, ...props }: any) => React.createElement('button', props, children);
  const Span = ({ children, ...props }: any) => React.createElement('span', props, children);
  const Section = ({ children, ...props }: any) => React.createElement('section', props, children);
  return {
    motion: { div: Div, button: Button, span: Span, section: Section },
    AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
    useReducedMotion: () => false,
  };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  User: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-user', 'data-size': size }, '👤'),
  UserPlus: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-userplus', 'data-size': size }, '👥'),
  Building2: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-building', 'data-size': size }, '🏢'),
  LogIn: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-login', 'data-size': size }, '→'),
  Eye: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-eye', 'data-size': size }, '👁'),
  EyeOff: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-eyeoff', 'data-size': size }, '👁‍🗨'),
  Loader2: ({ className }: any) => React.createElement('span', { 'data-testid': 'icon-loader', className }, '⏳'),
  ArrowRight: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-arrow', 'data-size': size }, '→'),
  ShieldCheck: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-shield', 'data-size': size }, '🛡'),
  Lock: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-lock', 'data-size': size }, '🔒'),
  Users: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-users', 'data-size': size }, '👥'),
  Sparkles: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-sparkles', 'data-size': size }, '✨'),
  HelpCircle: ({ size }: any) => React.createElement('span', { 'data-testid': 'icon-help', 'data-size': size }, '❓'),
}));

import Login from '../../components/dashboard/Login';

describe('Login', () => {
  const defaultProps = {
    onLogin: vi.fn()
  };

  it('renders the brand name', () => {
    render(
      <HashRouter>
        <Login {...defaultProps} />
      </HashRouter>
    );
    // Brand name uses middle dot · 
    expect(screen.getByText('兰台云 · 数智档案')).toBeInTheDocument();
  });

  it('renders persona selection tabs', () => {
    render(
      <HashRouter>
        <Login {...defaultProps} />
      </HashRouter>
    );
    expect(screen.getByText('张三')).toBeInTheDocument();
    expect(screen.getByText('李进')).toBeInTheDocument();
  });

  it('switches between persona tabs on click', () => {
    render(
      <HashRouter>
        <Login {...defaultProps} />
      </HashRouter>
    );
    const liJinTab = screen.getByText('李进');
    fireEvent.click(liJinTab);
    // After clicking 李进 tab, their info card should show
    expect(screen.getByText(/新注册的个人用户/)).toBeInTheDocument();
  });
});
