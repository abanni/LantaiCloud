import { describe, it, expect } from 'vitest';
import { PAGE_PADDING, PAGE_CONTAINER } from '../../styles/pagePadding';

describe('pagePadding', () => {
  it('PAGE_PADDING is correctly defined', () => {
    expect(PAGE_PADDING).toBe('p-6 space-y-6');
  });

  it('PAGE_CONTAINER is correctly defined', () => {
    expect(PAGE_CONTAINER).toBe('flex-1 overflow-y-auto p-6 space-y-6');
  });

  it('PAGE_CONTAINER includes PAGE_PADDING classes', () => {
    const paddingClasses = PAGE_PADDING.split(' ');
    paddingClasses.forEach(cls => {
      expect(PAGE_CONTAINER).toContain(cls);
    });
  });
});
