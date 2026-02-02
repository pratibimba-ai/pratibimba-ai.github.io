# API Reference

## Complete REST API Documentation

> **Full endpoint documentation for Pratibimba Fintech module. 20+ endpoints covering portfolio generation, validation, privacy, stress testing, and reporting.**

---

## Base URL

```
http://localhost:8000/api/fintech
```

All endpoints are prefixed with `/api/fintech`.

---

## Authentication

Authentication is handled at the API gateway level. Include your bearer token in all requests:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" ...
```

---

## Endpoints by Phase

### Phase 1: Portfolio Generation

#### Generate Portfolio

Create a synthetic credit portfolio from scratch.

```http
POST /generate-portfolio
```

**Request Body:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `num_borrowers` | int | 1000 | Number of borrowers (1-100,000) |
| `target_default_rate` | float | 0.03 | Target default rate (0.0-1.0) |
| `default_rate_tolerance` | float | 0.01 | Acceptable deviation (0.0-0.1) |
| `include_payment_history` | bool | false | Generate payment sequences |
| `history_months` | int | 24 | Months of history if included |
| `use_copulas` | bool | true | Use copulas for correlation |
| `privacy_epsilon` | float | 1.0 | Differential privacy ε (0.1-10) |
| `k_anonymity` | int | 5 | Minimum k-anonymity (2-100) |

**Example:**

```bash
curl -X POST http://localhost:8000/api/fintech/generate-portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "num_borrowers": 10000,
    "target_default_rate": 0.035,
    "include_payment_history": true,
    "use_copulas": true
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

### Phase 1.5: Digital Twin Cloning

#### Upload Training Data

Securely upload original data for cloning.

```http
POST /upload-data
```

**Request:** Multipart form with file upload

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
  "detected_columns": ["borrower_id", "age", "income", "credit_score"],
  "message": "Data securely ingested. Ready for cloning."
}
```

---

#### Clone Portfolio

Train Gaussian Copula and generate synthetic twin.

```http
POST /clone-portfolio
```

**Request Body:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `file_id` | string | required | ID from upload-data |
| `num_samples` | int | 1000 | Synthetic records to generate (10-100,000) |
| `primary_key` | string | null | Primary key column name |

**Example:**

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

---

### Phase 2: Payment Sequences

#### Generate Payment Sequences

Generate LSTM-based payment sequences for a portfolio.

```http
POST /generate-payment-sequences
```

**Request Body:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `portfolio_id` | string | required | Portfolio ID |
| `num_months` | int | 24 | Months to generate (1-120) |
| `use_lstm` | bool | true | Use LSTM model |

**Example:**

```bash
curl -X POST http://localhost:8000/api/fintech/generate-payment-sequences \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio_id": "SYNTH_20260202_163045_a1b2",
    "num_months": 36,
    "use_lstm": true
  }'
```

**Response:**

```json
{
  "portfolio_id": "SYNTH_20260202_163045_a1b2",
  "sequences_generated": 10000,
  "total_records": 360000,
  "months_per_sequence": 36,
  "cascade_model": "LSTM",
  "download_url": "/api/fintech/download/SYNTH_20260202_163045_a1b2/payment_sequences.csv"
}
```

---

#### Get Cascade Probabilities

Get transition probabilities from a payment status.

```http
GET /cascade-probabilities/{current_status}
```

**Example:**

```bash
curl http://localhost:8000/api/fintech/cascade-probabilities/30_days
```

**Response:**

```json
{
  "current_status": "30_days",
  "transitions": {
    "on_time": 0.35,
    "grace_period": 0.10,
    "30_days": 0.15,
    "60_days": 0.38,
    "paid_off": 0.01,
    "prepaid": 0.01
  }
}
```

---

### Phase 3: Validation

#### Validate Portfolio

Run comprehensive validation on synthetic portfolio.

```http
POST /validate
```

**Request Body:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `original_portfolio_id` | string | null | Original portfolio for comparison |
| `synthetic_portfolio_id` | string | required | Synthetic portfolio to validate |
| `target_column` | string | "status" | Column containing target |
| `target_value` | string | "default" | Value indicating positive class |
| `run_privacy_audit` | bool | true | Include privacy assessment |

**Example:**

```bash
curl -X POST http://localhost:8000/api/fintech/validate \
  -H "Content-Type: application/json" \
  -d '{
    "original_portfolio_id": "ORIG_...",
    "synthetic_portfolio_id": "SYNTH_20260202_163045_a1b2",
    "run_privacy_audit": true
  }'
```

**Response:**

```json
{
  "validation_id": "VAL_20260202_163045_a1b2",
  "overall_score": 87.5,
  "passed": true,
  "metrics": {
    "default_rate_validation": { ... },
    "distribution_validation": { ... },
    "correlation_validation": { ... },
    "gini_validation": { ... }
  },
  "recommendations": [
    "✓ Default rate within tolerance",
    "✓ Correlation structure preserved"
  ],
  "privacy_certificate_id": "PRIV_..."
}
```

---

### Phase 4: Privacy

#### Run Privacy Audit

Generate privacy certificate for a portfolio.

```http
POST /privacy-audit/{portfolio_id}
```

**Example:**

```bash
curl -X POST http://localhost:8000/api/fintech/privacy-audit/SYNTH_20260202_163045_a1b2
```

**Response:**

```json
{
  "certificate_id": "PRIV_20260202_163045_A1B2",
  "generated_at": "2026-02-02T16:30:45Z",
  "differential_privacy": {
    "epsilon": 1.0,
    "delta": 1e-5,
    "interpretation": "Strong privacy"
  },
  "k_anonymity": {
    "achieved_k": 8,
    "target_k": 5,
    "meets_requirement": true
  },
  "membership_inference": {
    "attack_success_rate": 0.523,
    "passed": true
  },
  "regulatory_compliance": {
    "gdpr_anonymous": true,
    "ccpa_exempt": true,
    "hipaa_safe_harbor": true
  }
}
```

---

#### Get Privacy Certificate

Retrieve a previously generated certificate.

```http
GET /privacy-certificate/{certificate_id}
```

**Example:**

```bash
curl http://localhost:8000/api/fintech/privacy-certificate/PRIV_20260202_163045_A1B2
```

---

### Phase 5: Stress Testing

#### Run Stress Test

Apply economic stress scenario to portfolio.

```http
POST /stress-test
```

**Request Body:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `portfolio_id` | string | required | Portfolio to stress |
| `scenario` | enum | "severe_recession" | Stress scenario |
| `compare_with_original` | string | null | Compare with original |

**Scenario Options:**
- `mild_recession`
- `severe_recession`
- `rate_shock`
- `unemployment_spike`
- `housing_crash`

**Example:**

```bash
curl -X POST http://localhost:8000/api/fintech/stress-test \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio_id": "SYNTH_20260202_163045_a1b2",
    "scenario": "severe_recession"
  }'
```

**Response:**

```json
{
  "stress_test_id": "STRESS_...",
  "scenario": "severe_recession",
  "baseline_metrics": {
    "default_rate": 0.035,
    "expected_loss": 1250000
  },
  "stressed_metrics": {
    "default_rate": 0.105,
    "expected_loss": 3675000
  },
  "impact_analysis": {
    "default_rate_increase": 0.070,
    "loss_increase_percent": 194.0
  },
  "plausibility_check": {
    "passed": true,
    "historical_benchmark": "2008 crisis"
  }
}
```

---

### Phase 6: Reports

#### Generate Fidelity Report

Create PDF/JSON report with all metrics.

```http
POST /generate-report
```

**Request Body:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `portfolio_id` | string | required | Portfolio ID |
| `validation_id` | string | null | Include validation |
| `format` | string | "both" | "json", "pdf", or "both" |
| `include_regulatory` | bool | false | Add regulatory sections |
| `regulator` | string | null | "occ", "fdic", or "pra" |

**Example:**

```bash
curl -X POST http://localhost:8000/api/fintech/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio_id": "SYNTH_20260202_163045_a1b2",
    "format": "both",
    "include_regulatory": true,
    "regulator": "occ"
  }'
```

**Response:**

```json
{
  "report_id": "FID_...",
  "files": {
    "json": "/api/fintech/download/reports/FID_....json",
    "pdf": "/api/fintech/download/reports/FID_....pdf"
  }
}
```

---

### Utility Endpoints

#### Get Portfolio Status

```http
GET /portfolio/{portfolio_id}
```

---

#### Download File

```http
GET /download/{portfolio_id}/{filename}
```

**Example:**

```bash
curl -O http://localhost:8000/api/fintech/download/SYNTH_.../borrowers.csv
```

---

#### List Portfolios

```http
GET /portfolios
```

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `status` | string | Filter by status |
| `source` | string | "SYNTHETIC" or "CLONE" |
| `limit` | int | Max results |
| `offset` | int | Pagination offset |

---

## Error Responses

All errors return standard format:

```json
{
  "detail": "Error message",
  "error_code": "ERR_XXX",
  "timestamp": "2026-02-02T16:30:45Z"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| 400 | Bad Request | Invalid parameters |
| 404 | Not Found | Portfolio/file not found |
| 422 | Unprocessable | Validation error |
| 500 | Server Error | Internal error |

---

## Rate Limits

| Tier | Requests/min | Burst |
|------|--------------|-------|
| Free | 60 | 10 |
| Pro | 300 | 50 |
| Enterprise | Unlimited | Unlimited |

---

## SDKs

### Python SDK

```python
from pratibimba import FintechClient

client = FintechClient(base_url="http://localhost:8000")

# Generate portfolio
portfolio = client.generate_portfolio(
    num_borrowers=10000,
    target_default_rate=0.035
)

# Validate
validation = client.validate(portfolio.id)

# Get privacy certificate
certificate = client.privacy_audit(portfolio.id)
```

---

## Related Documentation

- [Architecture →](./architecture.md) - System design
- [Credit Portfolio Generator →](./credit-portfolio-generator.md) - Generation details
- [Privacy Guarantees →](./privacy-guarantees.md) - Privacy framework
- [Stress Testing →](./stress-testing.md) - Economic scenarios
