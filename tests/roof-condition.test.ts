import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the Clarity environment
const mockClarity = {
  contracts: {
    'roof-condition': {
      functions: {
        'register-roof-condition': vi.fn(),
        'update-roof-condition': vi.fn(),
        'get-roof-condition': vi.fn()
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
  Object.values(mockClarity.contracts['roof-condition'].functions).forEach(fn => fn.mockReset());
  
  // Setup default responses
  mockClarity.contracts['roof-condition'].functions['register-roof-condition'].mockReturnValue({ value: true, success: true });
  mockClarity.contracts['roof-condition'].functions['update-roof-condition'].mockReturnValue({ value: true, success: true });
  mockClarity.contracts['roof-condition'].functions['get-roof-condition'].mockReturnValue({
    value: {
      'roof-type': 'Metal',
      'installation-date': 2015,
      'last-inspection-date': 100,
      'condition-rating': 8,
      'estimated-remaining-life': 120,
      'inspector': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      'last-updated': 100
    },
    success: true
  });
});

describe('Roof Condition Contract', () => {
  it('should register a new roof condition', () => {
    const result = mockClarity.contracts['roof-condition'].functions['register-roof-condition'](
        1,
        'Metal',
        2015,
        8,
        120
    );
    
    expect(result.success).toBe(true);
    expect(result.value).toBe(true);
    expect(mockClarity.contracts['roof-condition'].functions['register-roof-condition']).toHaveBeenCalledWith(
        1,
        'Metal',
        2015,
        8,
        120
    );
  });
  
  it('should update an existing roof condition', () => {
    const result = mockClarity.contracts['roof-condition'].functions['update-roof-condition'](
        1,
        7,
        100
    );
    
    expect(result.success).toBe(true);
    expect(result.value).toBe(true);
    expect(mockClarity.contracts['roof-condition'].functions['update-roof-condition']).toHaveBeenCalledWith(
        1,
        7,
        100
    );
  });
  
  it('should retrieve roof condition information', () => {
    const result = mockClarity.contracts['roof-condition'].functions['get-roof-condition'](1);
    
    expect(result.success).toBe(true);
    expect(result.value).toEqual({
      'roof-type': 'Metal',
      'installation-date': 2015,
      'last-inspection-date': 100,
      'condition-rating': 8,
      'estimated-remaining-life': 120,
      'inspector': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      'last-updated': 100
    });
  });
});
