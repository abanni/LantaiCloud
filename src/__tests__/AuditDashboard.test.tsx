import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuditDashboard } from '../../components/audit/AuditDashboard';

// Mock recharts to avoid rendering issues in test environment
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="xaxis" />,
  YAxis: () => <div data-testid="yaxis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}));

// Mock StatusBadge
vi.mock('../../components/audit/Shared', () => ({
  StatusBadge: ({ stage }: any) => <span data-testid="status-badge">{stage}</span>,
}));

describe('AuditDashboard', () => {
  const mockArchives = [
    {
      id: 'arc_1',
      submissionDate: '2026-06-04 10:24:15',
      stage: 'FIRST_REVIEW' as const,
      registrationNumber: 'REG-001',
      projectInfo: {
        id: 'proj_1',
        projectName: '测试项目一',
        permitNumber: '320583202508190204',
        projectCode: 'KS-2025-001',
        location: '昆山市',
        constructionUnit: '测试建设公司',
        constructionCompany: '测试施工公司',
        designUnit: '测试设计院',
        supervisorUnit: '测试监理公司',
        operator: '张三',
        projectManager: '李四',
        managerPhone: '13800138000',
        totalArea: '5000',
        totalCost: '2000',
        volumeCount: '10',
      },
      submissionDocs: [],
      archiveDataPackage: [],
      volumeDataPackage: [],
    },
  ];

  const defaultProps = {
    archives: mockArchives,
    onNavigate: vi.fn()
  };

  it('renders stat cards with updated labels', () => {
    render(<AuditDashboard {...defaultProps} />);
    // StatMiniCard labels are uppercase tracking text - check all occurrences
    expect(screen.getAllByText('档案登记').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('审核中')).toBeInTheDocument();
    expect(screen.getByText('已退回')).toBeInTheDocument();
    expect(screen.getByText('已入库')).toBeInTheDocument();
  });

  it('renders quick action card labels', () => {
    render(<AuditDashboard {...defaultProps} />);
    expect(screen.getByText('项目信息')).toBeInTheDocument();
  });

  it('renders the chart title', () => {
    render(<AuditDashboard {...defaultProps} />);
    expect(screen.getByText('数字档案移交入库环比增长态势')).toBeInTheDocument();
  });

  it('renders pending review section', () => {
    render(<AuditDashboard {...defaultProps} />);
    expect(screen.getByText(/待审核档案项目/)).toBeInTheDocument();
  });

  it('shows project name in pending review list', () => {
    render(<AuditDashboard {...defaultProps} />);
    expect(screen.getByText('测试项目一')).toBeInTheDocument();
  });
});
