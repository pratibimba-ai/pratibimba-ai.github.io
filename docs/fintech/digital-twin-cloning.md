# Digital Twin Cloning

## Create Statistical Twins of Your Production Data

> **Train a Gaussian Copula model on your real credit data and generate unlimited synthetic samples that preserve correlation structures while guaranteeing privacy.**

---

## What is Digital Twin Cloning?

Digital Twin Cloning allows you to **upload your actual production data** and generate a synthetic "twin" that:

1. **Preserves statistical properties** - marginal distributions, correlations, and tail dependencies
2. **Guarantees privacy** - K-anonymity ≥ 5 enforced automatically
3. **Scales infinitely** - generate 10x, 100x your original dataset size
4. **Maintains referential integrity** - foreign key relationships preserved

Unlike from-scratch generation, cloning learns the **unique characteristics of your data** and reproduces them faithfully.

---

## How It Works

```mermaid
flowchart LR
    A[Upload CSV] --> B[Gaussian Copula Fitting]
    B --> C[Correlation Matrix Learning]
    C --> D[Marginal Distribution Fitting]
    D --> E[Model Persistence]
    E --> F[Synthetic Sampling]
    F --> G[K-Anonymity Enforcement]
    G --> H[Output CSV]
    
    style B fill:#e8f5e9
    style G fill:#e3f2fd
```

### Step 1: Data Ingestion

Upload your production data securely. Files are stored in a restricted directory with immutable audit logging.

### Step 2: Copula Training

The `DigitalTwinCloner` fits a **Gaussian Copula** to your data:
- Learns the correlation matrix between all columns
- Fits marginal distributions for each column (automatically detects: normal, log-normal, uniform, etc.)
- Captures tail dependencies that simpler methods miss

### Step 3: Synthetic Sampling

Generate any number of synthetic records by:
1. Sampling from multivariate Gaussian with learned correlation matrix
2. Transforming through inverse CDF of marginal distributions
3. Post-processing categorical variables

### Step 4: Privacy Enforcement

Automatically enforce **K-anonymity ≥ 5** through:
- Intelligent quasi-identifier generalization
- Micro-aggregation of numerical values
- Rare value grouping for categoricals
- Record suppression as last resort

---

## Why Gaussian Copulas?

### Comparison with Alternatives

| Approach | Correlation Preservation | Tail Dependencies | Training Time | Interpretability |
|----------|-------------------------|-------------------|---------------|------------------|
| **Gaussian Copula** | ✅ Excellent | ✅ Good | Fast (~seconds) | ✅ High |
| **CTGAN** | ⚠️ Good | ❌ Poor | Slow (~hours) | ❌ Low |
| **TVAE** | ⚠️ Moderate | ❌ Poor | Moderate | ❌ Low |
| **Bayesian Networks** | ⚠️ Moderate | ❌ Poor | Fast | ✅ High |

### Key Advantages

1. **Mathematical Guarantees** - Copulas have well-understood theoretical properties
2. **Fast Training** - No neural network epochs to tune
3. **Tail Risk Preservation** - Critical for credit risk modeling
4. **Explainable** - Can inspect the correlation matrix and marginals

---

## Usage

### REST API

#### 1. Upload Training Data

```bash
curl -X POST http://localhost:8000/api/fintech/upload-data \
  -F "file=@production_loans.csv"
```

**Response:**
```json
{
  "status": "success",
  "file_id": "RAW_a1b2c3d4",
  "filename": "production_loans.csv",
  "detected_columns": ["borrower_id", "age", "income", "credit_score", "loan_amount", "status"],
  "message": "Data securely ingested. Ready for cloning."
}
```

#### 2. Trigger Cloning

```bash
curl -X POST http://localhost:8000/api/fintech/clone-portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "file_id": "RAW_a1b2c3d4",
    "num_samples": 50000,
    "primary_key": "borrower_id"
  }'
```

**Response:**
```json
{
  "status": "initializing",
  "portfolio_id": "TWIN_20260202_163045_a1b2",
  "message": "Digital Twin cloning engine started."
}
```

#### 3. Check Status & Download

```bash
curl http://localhost:8000/api/fintech/portfolio/TWIN_20260202_163045_a1b2
```

**Response (when complete):**
```json
{
  "id": "TWIN_20260202_163045_a1b2",
  "status": "COMPLETED",
  "source": "CLONE",
  "num_borrowers": 50000,
  "stats_json": {
    "quality_score": 94.5,
    "correlation_error": 0.02,
    "k_anonymity": 8,
    "bank_compliant": true
  },
  "download_urls": {
    "synthetic": "/api/fintech/download/TWIN_20260202_163045_a1b2/production_loans_synthetic.csv"
  }
}
```

### Python API

```python
from fintech.generators.cloner import DigitalTwinCloner
import pandas as pd

# Load your production data
original_df = pd.read_csv("production_loans.csv")

# Initialize cloner
cloner = DigitalTwinCloner()

# Train model on your data
model_id, metadata = cloner.train(original_df, primary_key="borrower_id")

print(f"Model trained: {model_id}")
print(f"Columns: {metadata['columns']}")
print(f"Rows trained on: {metadata['n_rows']}")

# Generate synthetic twin (10x scale-up)
synthetic_df = cloner.generate(model_id, num_samples=len(original_df) * 10)

# Compare quality
metrics = cloner.get_comparison(original_df, synthetic_df)
print(f"Similarity Score: {metrics['similarity_score']:.1f}%")
print(f"Correlation Error: {metrics['correlation_error']:.4f}")
```

---

## Gaussian Copula Engine Details

### GaussianCopulaEngine Class

The engine handles the mathematical complexity:

```python
from fintech.correlation.copula_engine import GaussianCopulaEngine

# Initialize engine
engine = GaussianCopulaEngine()

# Fit to numeric data
engine.fit(df[['age', 'income', 'credit_score', 'loan_amount']])

# Access learned correlation matrix
print(engine.correlation_matrix)
# [[1.00, 0.32, 0.45, 0.61],
#  [0.32, 1.00, 0.65, 0.78],
#  [0.45, 0.65, 1.00, 0.55],
#  [0.61, 0.78, 0.55, 1.00]]

# Sample new data preserving correlations
synthetic = engine.sample(n_samples=10000)

# Compare correlation preservation
comparison = engine.compare_correlations(original_df, synthetic)
print(f"Frobenius Error: {comparison['frobenius_error']:.4f}")
print(f"Max Absolute Error: {comparison['max_abs_error']:.4f}")
```

### Technical Implementation

The engine supports both the `copulas` library and a NumPy fallback:

```python
class GaussianCopulaEngine:
    """
    Gaussian Copula for correlation preservation.
    
    Uses the copulas library if available, falls back to NumPy otherwise.
    """
    
    def fit(self, data: pd.DataFrame):
        """Fit Gaussian copula to data."""
        
        if COPULAS_AVAILABLE:
            # Use copulas library
            self.copula = GaussianMultivariate()
            self.copula.fit(data)
        else:
            # NumPy fallback
            self._fit_numpy(data)
    
    def _fit_numpy(self, data: pd.DataFrame):
        """Fit using pure NumPy (no dependencies)."""
        
        # Store marginals
        self.marginals = {}
        uniform_data = np.zeros_like(data.values, dtype=float)
        
        for i, col in enumerate(data.columns):
            # Fit empirical CDF
            sorted_vals = np.sort(data[col].dropna())
            self.marginals[col] = {
                'values': sorted_vals,
                'min': data[col].min(),
                'max': data[col].max(),
                'mean': data[col].mean(),
                'std': data[col].std()
            }
            
            # Transform to uniform [0, 1]
            uniform_data[:, i] = self._ecdf_transform(data[col].values, sorted_vals)
        
        # Transform to normal
        normal_data = norm.ppf(np.clip(uniform_data, 1e-10, 1-1e-10))
        
        # Learn correlation matrix
        self.correlation_matrix = np.corrcoef(normal_data.T)
```

### Tail Risk Preservation

Critical for credit risk: the copula captures **tail dependencies** that determine joint default probabilities during stress events:

```python
# Enable tail risk preservation (on by default)
engine = GaussianCopulaEngine(preserve_tails=True)

# The engine will use Clayton copula for lower tail dependencies
# (relevant for simultaneous defaults in crisis)
```

---

## K-Anonymity Enforcement

After cloning, the synthetic data goes through **automatic k-anonymity enforcement**:

```python
from fintech.privacy.k_anonymity_enforcer import enforce_k_anonymity

# Enforce k >= 5 for bank compliance
protected_df, report = enforce_k_anonymity(synthetic_df, target_k=5)

print(f"Initial K: {report['initial_k']}")
print(f"Final K: {report['final_k']}")
print(f"Bank Compliant: {report['bank_compliant']}")
print(f"Records Suppressed: {report['records_suppressed']}")
print(f"Transformations: {report['transformations_applied']}")
```

### Enforcement Strategies

The enforcer uses a multi-pass approach:

| Pass | Strategy | Description |
|------|----------|-------------|
| 1 | Numerical Generalization | Age → age bands, Income → income bands |
| 2 | Categorical Generalization | Group rare values into "Other" |
| 3 | Micro-aggregation | Replace values with group means |
| 4 | Record Suppression | Remove remaining unique records |

---

## Quality Metrics

After cloning, verify quality with built-in metrics:

### Similarity Score (0-100%)

Composite score based on:
- Column distribution similarity (KS statistic)
- Correlation matrix preservation (Frobenius norm)
- Categorical distribution matching

### Correlation Error

Average absolute difference between original and synthetic correlation matrices:

```
Excellent: < 0.05
Good: 0.05 - 0.10
Acceptable: 0.10 - 0.20
Poor: > 0.20
```

### Example Output

```json
{
  "similarity_score": 94.5,
  "correlation_error": 0.023,
  "ks_statistics": {
    "age": 0.012,
    "income": 0.034,
    "credit_score": 0.018,
    "loan_amount": 0.028
  },
  "categorical_match": {
    "status": 0.98,
    "loan_type": 0.99
  }
}
```

---

## Audit Trail

All cloning operations are logged with immutable SHA-256 hashes:

```json
{
  "operation": "CLONE_INITIATED",
  "data_hash": "a1b2c3d4e5f6789...",
  "metadata": {
    "portfolio_id": "TWIN_20260202_163045_a1b2",
    "rows": 25000,
    "file": "production_loans.csv"
  },
  "timestamp": "2026-02-02T16:30:45Z"
}
```

---

## Best Practices

### 1. Remove Direct Identifiers Before Upload

Strip any columns that are direct identifiers:
- SSN, Email, Phone Number
- Full Name, Address
- Account Numbers

### 2. Specify Primary Key

Help the cloner understand your data structure:

```json
{
  "primary_key": "borrower_id"
}
```

### 3. Verify Quality Before Use

Always run validation after cloning:

```bash
curl -X POST http://localhost:8000/api/fintech/validate \
  -H "Content-Type: application/json" \
  -d '{
    "original_portfolio_id": "RAW_a1b2c3d4",
    "synthetic_portfolio_id": "TWIN_20260202_163045_a1b2"
  }'
```

### 4. Scale Appropriately

When generating more samples than original:
- 2-5x: Excellent quality
- 5-10x: Good quality
- 10x+: May show repetition patterns

---

## Security Considerations

### Data Handling

| Stage | Security Control |
|-------|-----------------|
| **Upload** | TLS encryption, restricted directory storage |
| **Training** | Data never leaves your infrastructure |
| **Model Storage** | Models are statistical summaries, not raw data |
| **Audit** | Immutable logging with SHA-256 hashes |
| **Cleanup** | Original data can be deleted after training |

### Privacy Guarantees

| Guarantee | Level |
|-----------|-------|
| **K-Anonymity** | ≥ 5 (enforced) |
| **No Direct Copies** | Statistical sampling, not record copying |
| **Audit Trail** | Full provenance for regulatory review |

---

## Related Documentation

- [Credit Portfolio Generator →](./credit-portfolio-generator.md) - Generate from scratch
- [Gaussian Copula Deep Dive →](#gaussian-copula-engine-details) - Mathematical details
- [Privacy Guarantees →](./privacy-guarantees.md) - Privacy framework
- [API Reference →](./api-reference.md) - Complete API documentation
