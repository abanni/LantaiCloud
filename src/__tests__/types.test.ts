import { describe, it, expect } from 'vitest';

// Type-level tests: verify mock data conforms to Project interface
import type { Project, Identity } from '../../types';

describe('TypeScript types', () => {
  it('Project type has required fields', () => {
    const project: Project = {
      id: 'test-1',
      name: '测试项目',
      status: 'processing',
      progress: 50,
      stage: '创建中',
      tags: ['测试'],
      issues: [],
      organizationId: 'org_test',
      isManaged: true,
      memberCount: 2,
      isCommitmentSigned: false,
      isCommitmentApproved: false,
      archiveName: '测试档案馆',
      units: [
        { id: 'u-1', name: '单位工程1', code: 'TEST-001', volumes: [], stage: '整理中', progress: 30 }
      ]
    };
    expect(project.id).toBe('test-1');
    expect(project.name).toBe('测试项目');
    expect(project.units).toHaveLength(1);
    expect(project.units![0].name).toBe('单位工程1');
  });

  it('Identity type has required fields', () => {
    const identity: Identity = {
      id: 'identity-1',
      user: { id: 'u1', name: '测试用户', role: 'admin', email: 'test@test.com', avatarBg: '#1890ff', joinDate: '2026-01-01', status: 'active' },
      organization: { id: 'org_test', name: '测试组织', type: 'ENTERPRISE' },
      role: 'admin'
    };
    expect(identity.user.name).toBe('测试用户');
    expect(identity.role).toBe('admin');
    expect(identity.organization?.name).toBe('测试组织');
  });
});
