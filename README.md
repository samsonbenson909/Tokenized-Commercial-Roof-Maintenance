# Tokenized Commercial Roof Maintenance

A blockchain-based solution for transparent management, tracking, and optimization of commercial roof assets through smart contracts.

## Overview

This system leverages blockchain technology to create a comprehensive platform for managing commercial roof assets, maintenance operations, and warranty coverage. By tokenizing roof systems, the platform enables transparent condition tracking, efficient maintenance scheduling, and verifiable warranty management for building owners, facility managers, and service providers.

## Core Components

### Building Registration Contract
- Records details of commercial structures
- Maintains building specifications and roof system information
- Stores ownership records and responsible parties
- Creates verifiable digital identity for registered properties

### Roof Condition Contract
- Tracks status and remaining useful life of roof systems
- Maintains detailed condition assessments and historical data
- Records environmental exposure and weather events
- Enables predictive analytics for maintenance planning

### Maintenance Scheduling Contract
- Manages regular inspections and repairs
- Automates scheduling based on condition assessments and manufacturer recommendations
- Tracks maintenance history and contractor performance
- Issues verifiable completion certificates for work performed

### Warranty Tracking Contract
- Monitors coverage for roof systems
- Maintains manufacturer and installer warranty terms
- Tracks warranty claims and resolutions
- Validates compliance with warranty maintenance requirements

## Getting Started

### Prerequisites
- Ethereum wallet (MetaMask recommended)
- Ethereum development environment (Truffle/Hardhat)
- Node.js (v16+)
- Web3.js or ethers.js

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/tokenized-roof.git
cd tokenized-roof
```

2. Install dependencies
```
npm install
```

3. Compile smart contracts
```
npx hardhat compile
```

4. Deploy to test network
```
npx hardhat run scripts/deploy.js --network <network-name>
```

## Usage Examples

### Register a Commercial Building
```javascript
await buildingContract.registerBuilding(
  "Industrial Complex A",
  "456 Manufacturing Blvd",
  "Single-story industrial", // building type
  45000, // square footage
  2018, // year built
  "Metal deck with TPO membrane" // roof system type
);
```

### Record Roof Condition Assessment
```javascript
await roofConditionContract.recordAssessment(
  buildingId,
  85, // condition score (0-100)
  "Generally good condition with minor ponding in northwest section",
  ["Ponding", "Minor seam separation"], // observed issues
  "2025-04-01", // assessment date
  inspectorWalletAddress
);
```

### Schedule Maintenance
```javascript
await maintenanceContract.scheduleMaintenance(
  buildingId,
  "Quarterly Preventive Inspection",
  Math.floor(Date.now() / 1000) + 7889400, // 3 months from now
  contractorWalletAddress,
  ["Clear drains", "Check seams", "Inspect flashings"]
);
```

### Register Warranty Information
```javascript
await warrantyContract.registerWarranty(
  buildingId,
  "TPO Membrane System",
  "RoofTech Manufacturing", // manufacturer
  "Premier Roofing Contractors", // installer
  "20-year NDL", // warranty type
  "2018-06-15", // installation date
  "2038-06-15" // expiration date
);
```

## Benefits

- **Transparency**: Immutable record of roof condition, maintenance, and warranty information
- **Accountability**: Clear responsibility tracking for building owners and service providers
- **Efficiency**: Automated scheduling and notification systems based on real conditions
- **Cost Savings**: Optimized maintenance planning and extended roof lifespan
- **Risk Reduction**: Early identification of potential issues before they cause damage
- **Value Enhancement**: Verifiable maintenance history increases property value

## Tokenization Model

The platform implements a tokenized approach to roof asset management:

- **Building Token (BT)**: Represents the registered commercial structure
- **Roof System Token (RST)**: Represents the specific roof installation
- **Maintenance Record Token (MRT)**: Represents completed maintenance activities
- **Warranty Coverage Token (WCT)**: Represents active warranty protections

These tokens provide a secure and transparent way to track ownership, transfer responsibility, and verify compliance with maintenance and warranty requirements.

## Future Development

- Integration with weather data services for proactive maintenance alerts
- Drone and IoT sensor connectivity for automated condition assessments
- Tokenized insurance and risk management integration
- Decentralized marketplace for roofing contractors and service providers
- Implementation of AI for predictive maintenance optimization

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
