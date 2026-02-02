# Competitive Comparison

## How Pratibimba Stacks Up Against the Competition

> **See exactly how Pratibimba compares to Tonic.ai, Gretel, Mostly AI, and SDV across features, capabilities, and pricing.**

---

## Executive Summary

| Aspect | Pratibimba | Tonic.ai | Gretel | Mostly AI | SDV |
|--------|------------|----------|--------|-----------|-----|
| **Best For** | Credit/Fintech | Generic Enterprise | Privacy Focus | Healthcare/Generic | Research |
| **Deployment** | Self-hosted | Cloud/Self-hosted | Cloud | Cloud/Self-hosted | Self-hosted |
| **Pricing** | Open Source | $$$$ Enterprise | $$$ Cloud | $$$ Cloud | Open Source |
| **Credit-Specific** | ✅ Native | ❌ Generic | ❌ Generic | ❌ Generic | ❌ Generic |

---

## Feature Comparison Matrix

### Core Generation

| Feature | Pratibimba | Tonic.ai | Gretel | Mostly AI | SDV |
|---------|------------|----------|--------|-----------|-----|
| Gaussian Copula | ✅ | ✅ | ✅ | ✅ | ✅ |
| CTGAN | ✅ (via DataRobo) | ✅ | ✅ | ✅ | ✅ |
| Credit-Specific Generator | ✅ Native | ❌ | ❌ | ❌ | ❌ |
| LSTM Delinquency Cascade | ✅ | ❌ | ❌ | ❌ | ❌ |
| Default Rate Calibration | ✅ ±1% | ❌ | ❌ | ❌ | ❌ |
| Risk Grade Stratification | ✅ | ❌ | ❌ | ❌ | ❌ |

### Privacy & Compliance

| Feature | Pratibimba | Tonic.ai | Gretel | Mostly AI | SDV |
|---------|------------|----------|--------|-----------|-----|
| Differential Privacy | ✅ | ✅ | ✅ | ✅ | ❌ |
| K-Anonymity Enforcement | ✅ Automatic | ⚠️ Manual | ⚠️ Manual | ⚠️ Manual | ❌ |
| Privacy Budget Tracking | ✅ Real-time | ❌ | ⚠️ Basic | ❌ | ❌ |
| Membership Inference Testing | ✅ | ⚠️ Basic | ✅ | ⚠️ Basic | ❌ |
| XPrivacy (Explainable) | ✅ Unique | ❌ | ❌ | ❌ | ❌ |
| Privacy Certificates | ✅ | ⚠️ Basic | ✅ | ⚠️ Basic | ❌ |

### Validation & Quality

| Feature | Pratibimba | Tonic.ai | Gretel | Mostly AI | SDV |
|---------|------------|----------|--------|-----------|-----|
| Statistical Validation | ✅ | ✅ | ✅ | ✅ | ⚠️ Basic |
| Gini Coefficient | ✅ | ❌ | ❌ | ❌ | ❌ |
| Correlation Preservation | ✅ | ✅ | ✅ | ✅ | ⚠️ Basic |
| Quality Scoring | ✅ 0-100 | ⚠️ Basic | ✅ | ⚠️ Basic | ❌ |
| Automated Recommendations | ✅ | ⚠️ Basic | ⚠️ Basic | ❌ | ❌ |

### Financial-Specific

| Feature | Pratibimba | Tonic.ai | Gretel | Mostly AI | SDV |
|---------|------------|----------|--------|-----------|-----|
| Stress Testing | ✅ 5 scenarios | ❌ | ❌ | ❌ | ❌ |
| Regulatory Reports | ✅ OCC/FDIC/PRA | ❌ | ❌ | ⚠️ Basic | ❌ |
| Credit Risk Modeling | ✅ Native | ❌ | ❌ | ❌ | ❌ |
| Payment Sequence Generation | ✅ LSTM | ❌ | ❌ | ❌ | ❌ |
| Tail Risk Preservation | ✅ | ⚠️ Basic | ⚠️ Basic | ⚠️ Basic | ❌ |

### Enterprise Features

| Feature | Pratibimba | Tonic.ai | Gretel | Mostly AI | SDV |
|---------|------------|----------|--------|-----------|-----|
| Self-Hosted | ✅ | ✅ Enterprise | ⚠️ Limited | ✅ Enterprise | ✅ |
| API Access | ✅ REST | ✅ REST | ✅ REST | ✅ REST | ⚠️ Python only |
| Audit Trail | ✅ Immutable | ✅ | ✅ | ⚠️ Basic | ❌ |
| Multi-Table Support | ✅ | ✅ | ✅ | ✅ | ✅ |
| Database Connectors | ✅ PostgreSQL | ✅ Many | ✅ Cloud | ✅ Many | ⚠️ Limited |

### Licensing & Pricing

| Aspect | Pratibimba | Tonic.ai | Gretel | Mostly AI | SDV |
|--------|------------|----------|--------|-----------|-----|
| License | MIT | Proprietary | Proprietary | Proprietary | MIT |
| Self-Hosted Cost | **Free** | $100K+/year | N/A | $50K+/year | **Free** |
| Cloud Cost | N/A | $$$/month | $$$/month | $$$/month | N/A |
| Per-Seat Licensing | **No** | Yes | Yes | Yes | **No** |
| Data Egress Fees | **No** | Yes | Yes | Yes | **No** |

---

## Deep Dive Comparisons

### vs Tonic.ai

**Where Tonic Wins:**
- More database connectors out of the box
- Larger enterprise customer base
- Dedicated support team

**Where Pratibimba Wins:**
- **Credit-specific generation** - Tonic treats credit data as generic tabular data
- **LSTM delinquency cascades** - Tonic cannot model temporal payment dynamics
- **Built-in stress testing** - Tonic requires external tools
- **XPrivacy** - No equivalent feature in Tonic
- **Open source** - No licensing costs or vendor lock-in
- **Privacy budget tracking** - Tonic doesn't track cumulative ε

**Bottom Line:** Choose Pratibimba for fintech-specific use cases; consider Tonic for generic enterprise data across many systems.

---

### vs Gretel AI

**Where Gretel Wins:**
- Cloud-native architecture
- Strong privacy research team
- Synthetic text generation (NLP)

**Where Pratibimba Wins:**
- **Self-hosted by default** - Gretel is cloud-first
- **Credit-specific features** - Gretel is domain-agnostic
- **Regulatory templates** - OCC/FDIC/PRA built-in
- **Stress testing** - Not available in Gretel
- **No usage-based pricing** - Gretel charges by row volume
- **Privacy budget tracking** - Real-time composition theorems

**Bottom Line:** Choose Pratibimba for on-premise fintech deployments; consider Gretel for cloud-native ML workflows.

---

### vs Mostly AI

**Where Mostly AI Wins:**
- Strong in healthcare vertical
- Good UI/UX for non-technical users
- Active academic research

**Where Pratibimba Wins:**
- **Credit risk specialization** - Mostly AI doesn't understand risk grades
- **LSTM for payment sequences** - No temporal modeling in Mostly AI
- **K-anonymity enforcement** - Automatic in Pratibimba
- **Open source** - Mostly AI is proprietary
- **Stress testing** - Not available
- **XPrivacy explanations** - Unique to Pratibimba

**Bottom Line:** Choose Pratibimba for credit risk use cases; consider Mostly AI for healthcare or generic enterprise.

---

### vs SDV (Synthetic Data Vault)

**Where SDV Wins:**
- Strong academic foundation (MIT DAI Lab)
- Good documentation
- Large community

**Where Pratibimba Wins:**
- **Credit-specific generation** - SDV is domain-agnostic
- **Privacy features** - SDV has minimal privacy controls
- **Enterprise features** - No audit trail, no certificates
- **Stress testing** - Not available
- **Regulatory compliance** - No built-in templates
- **Production-ready** - SDV is research-focused

**Bottom Line:** SDV is excellent for research; Pratibimba is built for production fintech deployments.

---

## Unique Differentiators

### 1. Credit-Native Generation

Pratibimba is the only solution that **understands credit risk**:

```python
# Pratibimba: Risk-stratified generation
config = PortfolioGenerationConfig(
    risk_grade_distribution={"A": 0.2, "B": 0.25, "C": 0.3, "D": 0.15, "E": 0.1},
    target_default_rate=0.035,
    default_rate_tolerance=0.01
)

# Competitors: Generic tabular generation
# No concept of risk grades, default rates, or credit scoring
```

### 2. LSTM Delinquency Cascades

No competitor models temporal payment dynamics:

```python
# Pratibimba: Learns cascade effects
# "A missed payment today increases default probability tomorrow"
lstm.generate_sequence(borrower, num_months=24)

# Competitors: Each month sampled independently
# Destroys realistic delinquency patterns
```

### 3. Privacy Budget Tracking

Real-time cumulative privacy accounting with composition theorems:

```python
# Pratibimba: Track budget across queries
manager = PrivacyBudgetManager(total_budget=10.0)
manager.consume(epsilon=1.0, operation="generation")
# Remaining: ε=9.0

# Competitors: No cumulative tracking
# Each generation treated independently
```

### 4. XPrivacy Explainability

Translate ε into business language:

```python
# Pratibimba
explanation = explainer.explain_epsilon(epsilon=1.0)
# "Strong Privacy Protection: Suitable for sharing with trusted third parties"

# Competitors: "epsilon=1.0"
# No translation for legal/compliance teams
```

### 5. Built-in Stress Testing

Five economic scenarios with plausibility validation:

```python
# Pratibimba
result = engine.run_stress_test(portfolio, scenario="severe_recession")
# Includes plausibility check against 2008 benchmarks

# Competitors: Must build custom solutions
```

### 6. Regulatory Templates

OCC SR 11-7, FDIC, PRA templates built-in:

```python
# Pratibimba
reporter.generate_report(regulatory_template="occ")

# Competitors: Generic reports only
```

---

## Migration Guide

### From Tonic.ai

1. Export data schemas from Tonic
2. Create equivalent generation configs in Pratibimba
3. Enable copulas for correlation preservation
4. Add fintech-specific configurations (risk grades, default rates)
5. Run validation to compare quality

### From Gretel

1. Download Gretel-generated data
2. Use Pratibimba's cloning feature to train on Gretel output
3. Enhance with credit-specific generation
4. Add privacy budget tracking

### From SDV

1. Port SDV synthesizers to Pratibimba generators
2. Add privacy layer (SDV has none)
3. Add validation layer
4. Add regulatory reporting

---

## Conclusion

| Use Case | Best Choice |
|----------|------------|
| **Credit portfolios** | **Pratibimba** |
| **Fintech stress testing** | **Pratibimba** |
| **Regulatory compliance** | **Pratibimba** |
| **Self-hosted, no licensing** | **Pratibimba** |
| **Generic enterprise with support** | Tonic.ai |
| **Cloud-native ML workflows** | Gretel |
| **Healthcare focus** | Mostly AI |
| **Academic research** | SDV |

---

## Related Documentation

- [Architecture →](./architecture.md) - System design
- [Privacy Guarantees →](./privacy-guarantees.md) - Privacy framework
- [Use Cases →](./use-cases.md) - When to use Pratibimba
