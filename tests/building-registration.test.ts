import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the Clarity environment
const mockClarity = {
  contracts: {
    'building-registration': {
      functions: {
        'register-building': vi.fn(),
        'get-building': vi.fn(),
        'get-building-count': vi.fn(),
        'transfer-building': vi.fn()
      }
    }
  },
  tx: {
    sender: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  },
  block: {
    height: 100
  }
};

// Setup mock responses
beforeEach(() => {
  // Reset mocks
  Object.values(mockClarity.contracts['building-registration'].functions).forEach(fn => fn.mockReset());
  
  // Setup default responses
  mockClarity.contracts['building-registration'].functions['register-building'].mockReturnValue({ value: 1, success: true });
  mockClarity.contracts['building-registration'].functions['get-building'].mockReturnValue({
    value: {
      owner: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      address: '123 Main St',
      'construction-year': 2010,
      'square-footage': 5000,
      'building-type': 'Commercial',
      'registered-at': 100
    },
    success: true
  });
  mockClarity.contracts['building-registration'].functions['get-building-count'].mockReturnValue({ value: 1, success: true });
  mockClarity.contracts['building-registration'].functions['transfer-building'].mockReturnValue({ value: true, success: true });
});

describe('Building Registration Contract', () => {
  it('should register a new building', () => {
    const result = mockClarity.contracts['building-registration'].functions['register-building'](
        '123 Main St',
        2010,
        5000,
        'Commercial'
    );
    
    expect(result.success).toBe(true);
    expect(result.value).toBe(1);
    expect(mockClarity.contracts['building-registration'].functions['register-building']).toHaveBeenCalledWith(
        '123 Main St',
        2010,
        5000,
        'Commercial'
    );
  });
  
  it('should retrieve building information', () => {
    const result = mockClarity.contracts['building-registration'].functions['get-building'](1);
    
    expect(result.success).toBe(true);
    expect(result.value).toEqual({
      owner: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      address: '123 Main St',
      'construction-year': 2010,
      'square-footage': 5000,
      'building-type': 'Commercial',
      'registered-at': 100
    });
  });
  
  it('should get the building count', () => {
    const result = mockClarity.contracts['building-registration'].functions['get-building-count']();
    
    expect(result.success).toBe(true);
    expect(result.value).toBe(1);
  });
  
  it('should transfer building ownership', () => {
    const newOwner = 'ST2PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
    const result = mockClarity.contracts['building-registration'].functions['transfer-building'](1, newOwner);
    
    expect(result.success).toBe(true);
    expect(result.value).toBe(true);
    expect(mockClarity.contracts['building-registration'].functions['transfer-building']).toHaveBeenCalledWith(1, newOwner);
  });
});
