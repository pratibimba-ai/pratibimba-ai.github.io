# Credit Portfolio Generator

## Synthetic Credit Portfolio Generation with Statistical Fidelity

> **Generate production-quality synthetic borrowers and loans with risk-stratified profiles, calibrated default rates, and realistic correlation structures.**

---

## Overview

The **Credit Portfolio Generator** is the core engine for creating synthetic credit portfolios from scratch. Unlike generic synthetic data tools that treat financial data as arbitrary columns, this generator understands the **deep structure of credit risk**:

- Credit scores correlate with income and employment stability
- Default probability is tied to risk grade and debt-to-income ratio
- Loan terms vary by product type and borrower profile
- Payment behavior follows temporal patterns

---

## Key Features

### 🎯 Default Rate Calibration

Generate portfolios with **precise default rate targeting**. The generator includes an iterative calibration loop that adjusts generated data until the achieved default rate falls within your specified tolerance.

```python
config = PortfolioGenerationConfig(
    num_borrowers=10000,
    target_default_rate=0.035,      # 3.5% target
    default_rate_tolerance=0.01,    # ±1% tolerance
)
# Achieved default rate: 3.47% ✓
```

**How it works:**
1. Generate initial portfolio based on risk grade distribution
2. Calculate achieved default rate
3. If outside tolerance, adjust risk grade proportions
4. Repeat until calibrated (up to 10 iterations)

### 📊 Risk-Stratified Generation

Borrowers are assigned to **five risk grades** (A through E) with realistic attribute distributions:

| Risk Grade | Default Probability | Credit Score Range | Typical Interest Rate |
|------------|--------------------|--------------------|----------------------|
| **A (Prime)** | 0.5% - 1.0% | 750 - 850 | 5.0% - 8.0% |
| **B (Near-Prime)** | 1.5% - 3.0% | 700 - 749 | 8.0% - 12.0% |
| **C (Standard)** | 4.0% - 8.0% | 650 - 699 | 12.0% - 18.0% |
| **D (Subprime)** | 12.0% - 20.0% | 580 - 649 | 18.0% - 25.0% |
| **E (Deep Subprime)** | 25.0% - 40.0% | 300 - 579 | 25.0% - 35.0% |

Each attribute is generated to be **internally consistent**:
- Higher income → higher credit scores
- Longer employment → better risk grades
- Lower DTI → lower default probability

### 👤 Realistic Borrower Profiles

Generated borrower attributes include:

| Attribute | Generation Logic |
|-----------|-----------------|
| `borrower_id` | Unique identifier (B000001 format) |
| `age` | 22-65, correlated with employment stability |
| `income_annual` | Log-normal distribution, correlated with credit score |
| `employment_type` | FULL_TIME, PART_TIME, SELF_EMPLOYED, UNEMPLOYED |
| `employment_length_months` | Correlated with risk grade |
| `credit_score` | Range based on risk grade |
| `debt_to_income` | DTI ratio by risk grade |
| `home_ownership` | RENT, OWN, MORTGAGE |
| `state` | US states weighted by population |
| `bankruptcies` | Higher probability for E grade |
| `delinquencies_2y` | Historical delinquencies |
| `inquiries_6m` | Recent credit inquiries |

### 💳 Multi-Product Loan Types

Support for diverse loan products with realistic term structures:

| Loan Type | Typical Principal | Term Range | Interest Rate Basis |
|-----------|------------------|------------|---------------------|
| **PERSONAL** | $1,000 - $50,000 | 12 - 60 months | Risk grade + base |
| **AUTO** | $5,000 - $75,000 | 24 - 84 months | Prime + spread |
| **MORTGAGE** | $50,000 - $1,000,000 | 180 - 360 months | Treasury + margin |
| **CREDIT_CARD** | $500 - $25,000 | Revolving | Risk-based pricing |
| **SMALL_BUSINESS** | $10,000 - $500,000 | 12 - 120 months | Prime + industry risk |
| **STUDENT** | $5,000 - $150,000 | 60 - 240 months | Fixed federal rates |

### 🔗 Correlated Attributes

The generator maintains realistic correlations between attributes:

```
credit_score ↔ income_annual (+0.65 correlation)
credit_score ↔ default_probability (-0.80 correlation)
debt_to_income ↔ default_probability (+0.55 correlation)
employment_length ↔ credit_score (+0.45 correlation)
```

---

## Usage

### Python API

```python
from fintech.generators.credit_generator import CreditPortfolioGenerator
from fintech.schemas.loan_portfolio import PortfolioGenerationConfig

# Initialize generator
generator = CreditPortfolioGenerator()

# Configure portfolio
config = PortfolioGenerationConfig(
    num_borrowers=10000,
    target_default_rate=0.035,
    default_rate_tolerance=0.01,
    include_payment_history=True,
    history_months=24,
    risk_grade_distribution={
        "A": 0.20,  # 20% prime
        "B": 0.25,  # 25% near-prime
        "C": 0.30,  # 30% standard
        "D": 0.15,  # 15% subprime
        "E": 0.10   # 10% deep subprime
    }
)

# Generate portfolio
portfolio = generator.generate_portfolio(config)

# Calculate statistics
portfolio.compute_statistics()

# Export to DataFrames
borrowers_df, loans_df = generator.portfolio_to_dataframe(portfolio)

# Get generation statistics
stats = generator.get_generation_stats()
print(f"Achieved default rate: {portfolio.default_rate:.2%}")
print(f"Generation time: {stats['generation_time_seconds']:.2f}s")
```

### REST API

```bash
curl -X POST http://localhost:8000/api/fintech/generate-portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "num_borrowers": 10000,
    "target_default_rate": 0.035,
    "default_rate_tolerance": 0.01,
    "include_payment_history": true,
    "history_months": 24,
    "use_copulas": true,
    "privacy_epsilon": 1.0,
    "k_anonymity": 5
  }'
```

**Response:**

```json
{
  "portfolio_id": "SYNTH_20260202_163045_a1b2",
  "status": "completed",
  "num_borrowers": 10000,
  "num_loans": 14523,
  "achieved_default_rate": 0.0347,
  "target_default_rate": 0.035,
  "generation_time_seconds": 2.34,
  "download_urls": {
    "borrowers": "/api/fintech/download/SYNTH_20260202_163045_a1b2/borrowers.csv",
    "loans": "/api/fintech/download/SYNTH_20260202_163045_a1b2/loans.csv"
  }
}
```

---

## Output Schema

### borrowers.csv

| Column | Type | Description |
|--------|------|-------------|
| `borrower_id` | string | Unique identifier |
| `age` | int | Borrower age |
| `income_annual` | float | Annual income ($) |
| `employment_type` | string | Employment category |
| `employment_length_months` | int | Months employed |
| `credit_score` | int | FICO-style score (300-850) |
| `debt_to_income` | float | DTI ratio (0.0-1.0) |
| `home_ownership` | string | RENT, OWN, MORTGAGE |
| `state` | string | US state code |
| `bankruptcies` | int | Historical bankruptcies |
| `delinquencies_2y` | int | Delinquencies in 24 months |
| `inquiries_6m` | int | Credit inquiries in 6 months |
| `risk_grade` | string | A, B, C, D, or E |

### loans.csv

| Column | Type | Description |
|--------|------|-------------|
| `loan_id` | string | Unique identifier |
| `borrower_id` | string | FK to borrower |
| `loan_type` | string | Product type |
| `principal` | float | Loan amount ($) |
| `interest_rate` | float | Annual rate (decimal) |
| `term_months` | int | Loan term |
| `origination_date` | date | When loan originated |
| `status` | string | current, default, paid_off |
| `risk_grade` | string | Assigned risk grade |

---

## Configuration Options

### PortfolioGenerationConfig

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `num_borrowers` | int | 1000 | Number of borrowers to generate |
| `target_default_rate` | float | 0.03 | Target default rate (0.0-1.0) |
| `default_rate_tolerance` | float | 0.01 | Acceptable deviation from target |
| `include_payment_history` | bool | False | Generate payment sequences |
| `history_months` | int | 24 | Months of history if included |
| `risk_grade_distribution` | dict | balanced | Distribution across grades |
| `loan_type_distribution` | dict | balanced | Distribution across products |
| `privacy_epsilon` | float | 1.0 | Differential privacy parameter |
| `k_anonymity` | int | 5 | Minimum k for anonymity |

---

## Technical Deep Dive

### Risk Matrix Initialization

The generator initializes internal risk matrices that encode domain knowledge:

```python
def _init_risk_matrices(self):
    # Default probability by risk grade
    self.default_prob_by_grade = {
        RiskGrade.A: (0.005, 0.010),   # 0.5% - 1.0%
        RiskGrade.B: (0.015, 0.030),   # 1.5% - 3.0%
        RiskGrade.C: (0.040, 0.080),   # 4.0% - 8.0%
        RiskGrade.D: (0.120, 0.200),   # 12% - 20%
        RiskGrade.E: (0.250, 0.400),   # 25% - 40%
    }
    
    # Credit score ranges by grade
    self.credit_score_by_grade = {
        RiskGrade.A: (750, 850),
        RiskGrade.B: (700, 749),
        RiskGrade.C: (650, 699),
        RiskGrade.D: (580, 649),
        RiskGrade.E: (300, 579),
    }
    
    # DTI ranges by grade
    self.dti_by_grade = {
        RiskGrade.A: (0.10, 0.25),
        RiskGrade.B: (0.20, 0.35),
        RiskGrade.C: (0.30, 0.45),
        RiskGrade.D: (0.40, 0.55),
        RiskGrade.E: (0.50, 0.70),
    }
```

### Calibration Algorithm

```python
def _calibrate_default_rate(self, portfolio, target_rate, tolerance):
    """Iterative calibration to achieve target default rate."""
    
    for iteration in range(10):  # Max 10 iterations
        current_rate = portfolio.compute_default_rate()
        
        if abs(current_rate - target_rate) <= tolerance:
            return True  # Within tolerance
        
        if current_rate > target_rate:
            # Too many defaults - shift toward better grades
            self._adjust_grade_distribution(shift="better")
        else:
            # Too few defaults - shift toward worse grades
            self._adjust_grade_distribution(shift="worse")
        
        # Regenerate with new distribution
        portfolio = self._regenerate_with_current_distribution()
    
    return False  # Could not calibrate
```

---

## Performance

| Portfolio Size | Generation Time | Memory Usage |
|---------------|-----------------|--------------|
| 1,000 borrowers | ~0.3s | ~50MB |
| 10,000 borrowers | ~2.5s | ~200MB |
| 100,000 borrowers | ~25s | ~1.5GB |
| 1,000,000 borrowers | ~4min | ~12GB |

---

## Best Practices

### 1. Match Your Production Distribution

Configure risk grade distribution to match your actual portfolio:

```python
# If your production portfolio is 60% prime/near-prime
config = PortfolioGenerationConfig(
    risk_grade_distribution={
        "A": 0.35,
        "B": 0.25,
        "C": 0.20,
        "D": 0.12,
        "E": 0.08
    }
)
```

### 2. Use Copulas for Higher Fidelity

Enable copulas to preserve correlation structures:

```python
# API call with copulas enabled
{
    "use_copulas": true,
    ...
}
```

### 3. Include Payment History for Time-Series Models

If training temporal models (LSTM, etc.), include payment sequences:

```python
config = PortfolioGenerationConfig(
    include_payment_history=True,
    history_months=36  # 3 years of history
)
```

---

## Related Documentation

- [Digital Twin Cloning →](./digital-twin-cloning.md) - Clone your production data
- [LSTM Cascade Engine →](./lstm-cascade-engine.md) - Temporal payment modeling
- [Validation & Quality →](./validation-quality.md) - Verify synthetic data quality
- [API Reference →](./api-reference.md) - Complete API documentation
