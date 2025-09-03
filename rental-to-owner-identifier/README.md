# 🏠 Rental-to-Owner Identifier

A comprehensive system that analyzes rental payment history and credit improvements to identify renters ready to transition to homeownership.

## Features

- **Payment History Analysis**: Tracks rental payment reliability and patterns
- **Credit Score Monitoring**: Monitors credit improvements over time
- **Financial Assessment**: Evaluates income, savings, and debt ratios
- **Readiness Scoring**: Proprietary algorithm to score homeownership readiness (0-100)
- **Personalized Outreach**: Generates targeted messages for different readiness levels
- **Interactive Dashboard**: React-based UI for visual analysis
- **Data Export**: JSON and CSV export capabilities

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/rental-to-owner-identifier.git
cd rental-to-owner-identifier
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the Analysis
```bash
python rental_analysis.py
```

### 4. View Results
- Check `rental_analysis_results.json` for detailed results
- View `rental_analysis_dashboard.png` for visualizations
- Open the React dashboard for interactive analysis

## Dataset Structure

The system uses a preprocessed CSV dataset with the following columns:

| Column | Description |
|--------|-------------|
| `renter_id` | Unique identifier |
| `name` | Renter name |
| `email` | Contact email |
| `phone` | Contact phone |
| `current_rent` | Monthly rent amount |
| `months_as_renter` | Duration as renter |
| `income` | Annual income |
| `savings` | Total savings |
| `debts` | Total debts |
| `employment_years` | Years of employment |
| `credit_score_initial` | Starting credit score |
| `credit_score_current` | Current credit score |
| `payment_reliability_percent` | Percentage of on-time payments |
| `readiness_score` | Calculated readiness score (0-100) |
| `recommendation` | Ready Now / High Priority / Needs Improvement |

## Readiness Score Algorithm

The readiness score (0-100) is calculated based on:

- **Credit Score (30 points)**: Current credit score strength
- **Payment Reliability (25 points)**: Rental payment consistency
- **Savings Adequacy (20 points)**: Available funds for down payment
- **Employment Stability (10 points)**: Years of steady employment
- **Debt Management (10 points)**: Debt-to-income ratio
- **Credit Improvement (5 points)**: Credit score growth over time

## Readiness Categories

- **Ready Now (90-100)**: Qualified for immediate homeownership
- **High Priority (80-89)**: Nearly ready with minor improvements needed
- **Moderate (70-79)**: On track but needs focused preparation
- **Needs Improvement (<70)**: Requires significant financial improvement

## Usage Examples

### Python Analysis
```python
from rental_analysis import RentalToOwnerAnalyzer

# Initialize analyzer
analyzer = RentalToOwnerAnalyzer('rental_data.csv')

# Get top prospects
top_prospects = analyzer.identify_top_prospects(10)

# Generate outreach messages
messages = analyzer.generate_outreach_messages()

# Create visualizations
analyzer.create_visualizations()
```

### React Dashboard
The included React component provides an interactive dashboard for:
- Filtering and sorting renters
- Viewing detailed financial profiles
- Tracking credit score improvements
- Generating personalized outreach messages

## File Structure
```
rental-to-owner-identifier/
├── rental_data.csv              # Main dataset
├── rental_analysis.py           # Python analysis script
├── requirements.txt             # Python dependencies
├── README.md                   # This file
├── dashboard.js                # React dashboard component
├── rental_analysis_results.json # Generated results
└── rental_analysis_dashboard.png # Generated visualizations
```

## Integration with GitHub

1. **Fork/Clone**: Fork this repository or clone it to your local machine
2. **Customize Data**: Replace `rental_data.csv` with your actual rental data
3. **Run Analysis**: Execute the Python script to generate insights
4. **Deploy Dashboard**: Use the React component in your web application
5. **Automate**: Set up GitHub Actions for automated analysis

## Sample Results

The system identifies prospects like:
- **Sarah Johnson (Score: 85)**: High priority with excellent payment history
- **Michael Chen (Score: 92)**: Ready now with strong financials
- **Emily Rodriguez (Score: 68)**: Needs improvement but showing progress

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Contact

For questions or support, please open an issue on GitHub.

---
