# Regulatory Reporting & Fidelity Reports

## Audit-Ready Documentation for Regulators

> **Generate comprehensive fidelity reports in PDF and JSON formats with built-in templates for OCC, FDIC, and PRA regulatory requirements. Complete audit trail with immutable hashing.**

---

## Overview

When regulators ask "How do you validate your synthetic data?", you need more than verbal assurance. Pratibimba's **Fidelity Report Generator** creates production-grade documentation that includes:

- **Data Statistics** - Source and synthetic data profiles
- **Validation Results** - All quality metrics with pass/fail status
- **Privacy Assessment** - Full privacy certificate with explanations
- **Stress Test Results** - Economic scenario impacts
- **Regulatory Compliance** - Template-specific sections for OCC, FDIC, PRA

---

## Report Formats

### JSON Report

Machine-readable format for integration with audit systems:

```json
{
  "report_id": "FID_20260202_163045_A1B2",
  "generated_at": "2026-02-02T16:30:45Z",
  "portfolio_id": "SYNTH_20260202_163045_a1b2",
  
  "executive_summary": {
    "overall_quality": "HIGH",
    "privacy_status": "COMPLIANT",
    "stress_test_passed": true,
    "recommendation": "Approved for production use"
  },
  
  "data_statistics": {
    "source_records": 25000,
    "synthetic_records": 25000,
    "columns": 18,
    "numeric_columns": 12,
    "categorical_columns": 6
  },
  
  "validation_results": {
    "overall_score": 87.5,
    "passed": true,
    "metrics": { ... }
  },
  
  "privacy_certificate": {
    "certificate_id": "PRIV_...",
    "epsilon": 1.0,
    "k_anonymity": 8,
    "mia_success_rate": 0.52,
    "compliance": {
      "gdpr": true,
      "ccpa": true,
      "hipaa": true
    }
  },
  
  "stress_test_summary": {
    "scenarios_tested": ["severe_recession", "rate_shock"],
    "all_passed": true,
    "capital_recommendation": "8.5%"
  }
}
```

### PDF Report

Professional document for executive review and regulatory submission:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│            PRATIBIMBA SYNTHETIC DATA FIDELITY REPORT            │
│                                                                 │
│  Portfolio ID: SYNTH_20260202_163045_a1b2                      │
│  Generated: February 2, 2026 4:30 PM UTC                        │
│  Report ID: FID_20260202_163045_A1B2                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     EXECUTIVE SUMMARY                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Overall Quality Score: 87.5/100 ✓ PASSED                      │
│  Privacy Status: COMPLIANT                                      │
│  Stress Test Status: PASSED                                     │
│                                                                 │
│  Recommendation: Approved for production use                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     DATA PROFILE                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Source Records: 25,000                                         │
│  Synthetic Records: 25,000                                      │
│  Columns: 18 (12 numeric, 6 categorical)                        │
│                                                                 │
│  Default Rate (Target): 3.50%                                   │
│  Default Rate (Achieved): 3.47% ✓                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                     VALIDATION METRICS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Metric                    Score    Status                      │
│  ─────────────────────────────────────────                     │
│  Default Rate Match        98.5%    ✓ Pass                     │
│  Distribution Similarity   92.3%    ✓ Pass                     │
│  Correlation Preservation  89.1%    ✓ Pass                     │
│  Gini Coefficient Match    95.2%    ✓ Pass                     │
│  Risk Distribution         88.5%    ✓ Pass                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Usage

### Python API

```python
from fintech.validation.fidelity_report import FidelityReportGenerator

# Initialize generator
reporter = FidelityReportGenerator(output_dir="reports/fintech")

# Generate report
report_path = reporter.generate_report(
    portfolio_id="SYNTH_20260202_163045_a1b2",
    data_stats={
        "source_records": 25000,
        "synthetic_records": 25000,
        "columns": 18
    },
    validation_results=validation_report,
    privacy_certificate=privacy_cert,
    stress_test_results=stress_results,
    format="both",  # "json", "pdf", or "both"
    regulatory_template="occ"  # or "fdic", "pra"
)

print(f"JSON Report: {report_path['json']}")
print(f"PDF Report: {report_path['pdf']}")
```

### REST API

```bash
curl -X POST http://localhost:8000/api/fintech/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "portfolio_id": "SYNTH_20260202_163045_a1b2",
    "validation_id": "VAL_...",
    "format": "both",
    "include_regulatory": true,
    "regulator": "occ"
  }'
```

**Response:**

```json
{
  "report_id": "FID_20260202_163045_A1B2",
  "portfolio_id": "SYNTH_20260202_163045_a1b2",
  "format": "both",
  "regulatory_template": "occ",
  "files": {
    "json": "/api/fintech/download/reports/FID_20260202_163045_A1B2.json",
    "pdf": "/api/fintech/download/reports/FID_20260202_163045_A1B2.pdf"
  }
}
```

---

## Regulatory Templates

### OCC SR 11-7 Template

For US national banks, includes:

- **Model Risk Management** documentation
- **Validation independence** attestation
- **Conceptual soundness** evaluation
- **Ongoing monitoring** plan

```python
reporter.generate_report(
    ...,
    regulatory_template="occ"
)
```

**Additional Sections:**

```
┌─────────────────────────────────────────────────────────────────┐
│              OCC SR 11-7 COMPLIANCE DOCUMENTATION               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. MODEL IDENTIFICATION                                        │
│     Model Name: Pratibimba Synthetic Data Generator             │
│     Model Type: Statistical Sampling (Gaussian Copula)          │
│     Model Owner: [Your Organization]                            │
│                                                                 │
│  2. CONCEPTUAL SOUNDNESS                                        │
│     ✓ Gaussian copula methodology is well-documented            │
│     ✓ Correlation preservation verified via Frobenius norm     │
│     ✓ Privacy guarantees based on differential privacy theory  │
│                                                                 │
│  3. ONGOING MONITORING                                          │
│     • Validation runs required quarterly                        │
│     • Privacy budget tracking enabled                          │
│     • Stress tests required annually                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### FDIC Model Risk Management Guidance

For FDIC-supervised institutions:

```python
reporter.generate_report(
    ...,
    regulatory_template="fdic"
)
```

### UK PRA SS1/23 Template

For UK Prudential Regulation Authority:

```python
reporter.generate_report(
    ...,
    regulatory_template="pra"
)
```

**PRA-Specific Sections:**

- Stress testing results against PRA scenarios
- Model governance attestation
- Third-party model validation notes

---

## Report Sections

### 1. Executive Summary

One-page overview for senior management:

```python
{
  "executive_summary": {
    "overall_quality": "HIGH",
    "quality_score": 87.5,
    "privacy_status": "COMPLIANT",
    "stress_test_passed": true,
    "key_findings": [
      "Default rate within 0.5% of target",
      "Correlation structure preserved (89.1% accuracy)",
      "K-anonymity k=8 exceeds minimum requirement"
    ],
    "recommendation": "Approved for production use"
  }
}
```

### 2. Data Profile

Statistics on source and synthetic data:

```python
{
  "data_statistics": {
    "source": {
      "records": 25000,
      "columns": 18,
      "date_range": "2023-01-01 to 2025-12-31",
      "default_rate": 0.035
    },
    "synthetic": {
      "records": 25000,
      "columns": 18,
      "default_rate": 0.0347
    }
  }
}
```

### 3. Validation Results

Detailed metrics with pass/fail status:

```python
{
  "validation_results": {
    "overall_score": 87.5,
    "passed": true,
    "metrics": {
      "default_rate_match": {"score": 98.5, "passed": true},
      "distribution_similarity": {"score": 92.3, "passed": true},
      "correlation_preservation": {"score": 89.1, "passed": true},
      "gini_coefficient": {"score": 95.2, "passed": true},
      "risk_distribution": {"score": 88.5, "passed": true}
    },
    "recommendations": [
      "✓ All validation metrics within acceptable ranges"
    ]
  }
}
```

### 4. Privacy Assessment

Full privacy certificate with XPrivacy explanations:

```python
{
  "privacy_assessment": {
    "certificate_id": "PRIV_...",
    "differential_privacy": {
      "epsilon": 1.0,
      "risk_level": "low",
      "explanation": "Strong privacy protection..."
    },
    "k_anonymity": {
      "achieved": 8,
      "target": 5,
      "explanation": "Good re-identification protection..."
    },
    "regulatory_compliance": {
      "gdpr": true,
      "ccpa": true,
      "hipaa": true
    }
  }
}
```

### 5. Stress Test Summary

Results from economic scenario testing:

```python
{
  "stress_test_summary": {
    "scenarios_tested": [
      {
        "name": "severe_recession",
        "baseline_default_rate": 0.035,
        "stressed_default_rate": 0.105,
        "plausibility_passed": true
      }
    ],
    "capital_recommendation": "8.5% buffer recommended"
  }
}
```

### 6. Audit Trail

Cryptographic verification:

```python
{
  "audit_trail": {
    "source_data_hash": "sha256:a1b2c3d4...",
    "synthetic_data_hash": "sha256:e5f6g7h8...",
    "model_hash": "sha256:i9j0k1l2...",
    "generation_timestamp": "2026-02-02T16:30:45Z",
    "validator_version": "1.2.3"
  }
}
```

---

## Immutable Audit Logging

All report generation is logged with SHA-256 hashes:

```python
from fintech.db.repository import AuditLogRepository

# Automatically logged during report generation
{
  "operation": "REPORT_GENERATED",
  "data_hash": "sha256:...",
  "metadata": {
    "report_id": "FID_...",
    "portfolio_id": "SYNTH_...",
    "regulatory_template": "occ",
    "quality_score": 87.5
  },
  "timestamp": "2026-02-02T16:30:45Z"
}
```

---

## PDF Generation

PDF reports are generated using **ReportLab** with professional styling:

```python
# PDF generation is automatic when format="pdf" or format="both"

# The PDF includes:
# - Company logo placeholder
# - Page numbers and timestamps
# - Tables with alternating row colors
# - Charts for key metrics
# - Digital signature placeholder
```

---

## Best Practices

### 1. Generate Reports for Every Production Release

```python
# Include in your CI/CD pipeline
def release_synthetic_data(portfolio_id):
    # 1. Run validation
    validation = validator.validate_portfolio(...)
    
    # 2. Run privacy audit
    privacy = auditor.generate_certificate(...)
    
    # 3. Run stress test
    stress = engine.run_stress_test(...)
    
    # 4. Generate report
    report = reporter.generate_report(
        portfolio_id=portfolio_id,
        validation_results=validation,
        privacy_certificate=privacy,
        stress_test_results=stress,
        format="both",
        regulatory_template="occ"
    )
    
    # 5. Archive report
    archive_to_compliance_system(report)
```

### 2. Use Regulatory Templates for Submissions

Always use the appropriate template when preparing for regulatory review:

| Regulator | Template | Use Case |
|-----------|----------|----------|
| OCC | `occ` | US national banks, federal thrifts |
| FDIC | `fdic` | FDIC-supervised state banks |
| PRA | `pra` | UK banks, insurers |
| Fed | `occ` | Federal Reserve supervision |

### 3. Archive Reports for 7+ Years

Regulatory retention requirements typically require 7+ years:

```python
# Configure storage path
reporter = FidelityReportGenerator(
    output_dir="compliance/archive/2026"
)
```

---

## Related Documentation

- [Validation & Quality →](./validation-quality.md) - Validation metrics explained
- [Privacy Guarantees →](./privacy-guarantees.md) - Privacy certificate details
- [Stress Testing →](./stress-testing.md) - Economic scenario testing
- [API Reference →](./api-reference.md) - Complete API documentation
