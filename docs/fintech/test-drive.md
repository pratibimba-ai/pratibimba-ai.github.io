# Test Drive Pratibimba

Experience the power of enterprise synthetic data in under 5 minutes. Use this guide to run a local sandbox environment and generate your first credit portfolio.

---

## 🚀 1. Launch the Sandbox

Pratibimba is containerized for easy local testing. Ensure you have **Docker** and **Docker Compose** installed.

```bash
# Clone the repository
git clone https://github.com/ramprag/DataRobo.git
cd DataRobo

# Start the platform
docker compose up -d
```

The API will be available at `http://localhost:8000`.

---

## 📊 2. Generate Your First Portfolio

Once the services are healthy, you can trigger a synthetic portfolio generation using a simple `curl` command.

```bash
curl -X POST http://localhost:8000/api/fintech/generate-portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "num_borrowers": 1000,
    "target_default_rate": 0.05,
    "include_payment_history": true,
    "history_months": 12,
    "use_copulas": true,
    "privacy_epsilon": 1.0,
    "k_anonymity": 5
  }'
```

### What's happening?
*   **Risk Stratification:** The system creates 1,000 unique borrowers across risk grades A-E.
*   **Copula Preservation:** It maintains high-fidelity correlations between income, age, and credit score.
*   **Privacy Guardrails:** It automatically generalized the data to ensure no individual can be re-identified (k=5).

---

## ✅ 3. Verify Quality & Privacy

After generation, you can view the automated validation score. Replace `{portfolio_id}` with the ID returned in the previous step.

```bash
# Get the quality report
curl http://localhost:8000/api/fintech/portfolio/{portfolio_id}
```

Look for the `overall_score` (out of 100) and the `privacy_certificate_id`.

---

## 🛠 4. Local Python Testing

If you are a Data Scientist and want to test the core logic without the API, you can use our Python SDK directly.

```python
from fintech.generators.credit_generator import CreditPortfolioGenerator
from fintech.validation.credit_metrics import CreditMetricsValidator

# 1. Setup
generator = CreditPortfolioGenerator()
validator = CreditMetricsValidator()

# 2. Generate
portfolio = generator.generate_portfolio(num_borrowers=5000)

# 3. Validate
report = validator.validate_portfolio(
    original_df=None, # In sandbox mode, it uses statistical benchmarks
    synthetic_df=portfolio
)

print(f"Sandbox Fidelity Score: {report['overall_score']}%")
```

---

## 🔍 What's Next?

Now that you've run the basic flow, deep dive into the specific enterprise modules:

- [System Architecture →](./architecture.md)
- [Digital Twin Cloning →](./digital-twin-cloning.md)
- [Privacy Framework →](./privacy-guarantees.md)
- [Stress Testing →](./stress-testing.md)
