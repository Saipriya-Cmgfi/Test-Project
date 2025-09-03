#!/usr/bin/env python3
"""
Rental-to-Owner Identifier Analysis Script
Analyzes rental payment history and credit improvements to identify renters ready to buy.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import json
import warnings
warnings.filterwarnings('ignore')

class RentalToOwnerAnalyzer:
    def __init__(self, csv_file='rental_data.csv'):
        """Initialize the analyzer with rental data."""
        self.data = pd.read_csv(csv_file)
        self.prepare_data()
    
    def prepare_data(self):
        """Prepare and clean the data for analysis."""
        # Calculate derived metrics
        self.data['credit_improvement'] = (
            self.data['credit_score_current'] - self.data['credit_score_initial']
        )
        self.data['debt_to_income_ratio'] = self.data['debts'] / self.data['income']
        self.data['savings_to_income_ratio'] = self.data['savings'] / self.data['income']
        self.data['rent_to_income_ratio'] = (self.data['current_rent'] * 12) / self.data['income']
        
        # Calculate readiness categories
        self.data['readiness_category'] = pd.cut(
            self.data['readiness_score'],
            bins=[0, 70, 85, 90, 100],
            labels=['Needs Improvement', 'Moderate', 'High Priority', 'Ready Now']
        )
    
    def calculate_readiness_score(self, row):
        """Calculate comprehensive readiness score (0-100)."""
        score = 0
        
        # Credit score component (0-30 points)
        if row['credit_score_current'] >= 760:
            score += 30
        elif row['credit_score_current'] >= 700:
            score += 25
        elif row['credit_score_current'] >= 650:
            score += 20
        elif row['credit_score_current'] >= 600:
            score += 15
        else:
            score += 10
        
        # Payment reliability (0-25 points)
        score += min(25, row['payment_reliability_percent'] / 4)
        
        # Savings adequacy (0-20 points)
        down_payment_ratio = row['savings'] / (row['income'] * 2.5)  # Assuming 2.5x income home
        score += min(20, down_payment_ratio * 100)
        
        # Employment stability (0-10 points)
        score += min(10, row['employment_years'] * 2)
        
        # Debt management (0-10 points)
        debt_ratio = row['debts'] / row['income']
        if debt_ratio < 0.1:
            score += 10
        elif debt_ratio < 0.2:
            score += 7
        elif debt_ratio < 0.3:
            score += 5
        else:
            score += 2
        
        # Credit improvement (0-5 points)
        credit_gain = row['credit_score_current'] - row['credit_score_initial']
        score += min(5, credit_gain / 20)
        
        return min(100, max(0, score))
    
    def generate_summary_stats(self):
        """Generate summary statistics."""
        stats = {
            'total_renters': len(self.data),
            'ready_now': len(self.data[self.data['readiness_score'] >= 90]),
            'high_priority': len(self.data[(self.data['readiness_score'] >= 80) & 
                                         (self.data['readiness_score'] < 90)]),
            'needs_improvement': len(self.data[self.data['readiness_score'] < 80]),
            'avg_credit_improvement': self.data['credit_improvement'].mean(),
            'avg_payment_reliability': self.data['payment_reliability_percent'].mean(),
            'avg_savings': self.data['savings'].mean(),
            'avg_income': self.data['income'].mean()
        }
        return stats
    
    def identify_top_prospects(self, n=10):
        """Identify top prospects for homeownership."""
        top_prospects = self.data.nlargest(n, 'readiness_score')[
            ['name', 'email', 'phone', 'readiness_score', 'recommendation', 
             'credit_score_current', 'savings', 'income', 'max_affordable_home']
        ]
        return top_prospects
    
    def generate_outreach_messages(self):
        """Generate personalized outreach messages."""
        messages = []
        for _, row in self.data.iterrows():
            if row['readiness_score'] >= 90:
                message = f"Hi {row['name']}! Based on your excellent rental payment history and improved credit score of {row['credit_score_current']}, you're ready to become a homeowner! We have special first-time buyer programs with down payments as low as {(row['estimated_down_payment'] / row['max_affordable_home'] * 100):.1f}%. Let's schedule a consultation!"
            elif row['readiness_score'] >= 80:
                message = f"Hello {row['name']}, your consistent rental payments and credit improvement show you're nearly ready for homeownership! With a few small steps, we can help you qualify for a home up to ${row['max_affordable_home']:,.0f}. Would you like to learn about our preparation programs?"
            else:
                message = f"Hi {row['name']}, we've noticed your improving payment pattern! While you're building toward homeownership, we'd love to help you with credit counseling and savings strategies. Let's create a personalized roadmap to get you ready!"
            
            messages.append({
                'name': row['name'],
                'email': row['email'],
                'phone': row['phone'],
                'message': message,
                'priority': row['recommendation']
            })
        
        return messages
    
    def create_visualizations(self):
        """Create comprehensive visualizations."""
        plt.style.use('seaborn-v0_8')
        fig, axes = plt.subplots(2, 3, figsize=(18, 12))
        
        # 1. Readiness Score Distribution
        axes[0,0].hist(self.data['readiness_score'], bins=20, color='skyblue', alpha=0.7)
        axes[0,0].axvline(self.data['readiness_score'].mean(), color='red', linestyle='--', 
                         label=f'Mean: {self.data["readiness_score"].mean():.1f}')
        axes[0,0].set_title('Readiness Score Distribution')
        axes[0,0].set_xlabel('Readiness Score')
        axes[0,0].set_ylabel('Count')
        axes[0,0].legend()
        
        # 2. Credit Score Improvement
        axes[0,1].scatter(self.data['credit_score_initial'], self.data['credit_score_current'], 
                         c=self.data['readiness_score'], cmap='viridis', alpha=0.6)
        axes[0,1].plot([500, 800], [500, 800], 'r--', alpha=0.5)
        axes[0,1].set_title('Credit Score Improvement')
        axes[0,1].set_xlabel('Initial Credit Score')
        axes[0,1].set_ylabel('Current Credit Score')
        
        # 3. Payment Reliability vs Readiness
        axes[0,2].scatter(self.data['payment_reliability_percent'], self.data['readiness_score'],
                         c=self.data['credit_score_current'], cmap='plasma', alpha=0.6)
        axes[0,2].set_title('Payment Reliability vs Readiness Score')
        axes[0,2].set_xlabel('Payment Reliability (%)')
        axes[0,2].set_ylabel('Readiness Score')
        
        # 4. Income vs Savings
        axes[1,0].scatter(self.data['income'], self.data['savings'],
                         c=self.data['readiness_score'], cmap='coolwarm', alpha=0.6)
        axes[1,0].set_title('Income vs Savings')
        axes[1,0].set_xlabel('Annual Income ($)')
        axes[1,0].set_ylabel('Savings ($)')
        
        # 5. Readiness Categories
        category_counts = self.data['readiness_category'].value_counts()
        axes[1,1].pie(category_counts.values, labels=category_counts.index, autopct='%1.1f%%')
        axes[1,1].set_title('Readiness Categories Distribution')
        
        # 6. Debt-to-Income vs Credit Score
        axes[1,2].scatter(self.data['debt_to_income_ratio'], self.data['credit_score_current'],
                         c=self.data['readiness_score'], cmap='RdYlGn', alpha=0.6)
        axes[1,2].set_title('Debt-to-Income Ratio vs Credit Score')
        axes[1,2].set_xlabel('Debt-to-Income Ratio')
        axes[1,2].set_ylabel('Current Credit Score')
        
        plt.tight_layout()
        plt.savefig('rental_analysis_dashboard.png', dpi=300, bbox_inches='tight')
        plt.show()
    
    def export_results(self, filename='rental_analysis_results.json'):
        """Export analysis results to JSON."""
        results = {
            'summary_stats': self.generate_summary_stats(),
            'top_prospects': self.identify_top_prospects().to_dict('records'),
            'outreach_messages': self.generate_outreach_messages(),
            'analysis_date': datetime.now().isoformat()
        }
        
        with open(filename, 'w') as f:
            json.dump(results, f, indent=2, default=str)
        
        print(f"Results exported to {filename}")
        return results
    
    def generate_report(self):
        """Generate a comprehensive analysis report."""
        stats = self.generate_summary_stats()
        top_prospects = self.identify_top_prospects(5)
        
        report = f"""
RENTAL-TO-OWNER ANALYSIS REPORT
=====================================
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

SUMMARY STATISTICS:
- Total Renters Analyzed: {stats['total_renters']}
- Ready Now (Score ≥90): {stats['ready_now']} ({stats['ready_now']/stats['total_renters']*100:.1f}%)
- High Priority (Score 80-89): {stats['high_priority']} ({stats['high_priority']/stats['total_renters']*100:.1f}%)
- Needs Improvement (Score <80): {stats['needs_improvement']} ({stats['needs_improvement']/stats['total_renters']*100:.1f}%)

PERFORMANCE METRICS:
- Average Credit Improvement: +{stats['avg_credit_improvement']:.0f} points
- Average Payment Reliability: {stats['avg_payment_reliability']:.1f}%
- Average Savings: ${stats['avg_savings']:,.0f}
- Average Income: ${stats['avg_income']:,.0f}

TOP 5 PROSPECTS:
"""
        for idx, prospect in top_prospects.iterrows():
            report += f"""
{prospect['name']} - Score: {prospect['readiness_score']:.0f}
  Email: {prospect['email']}
  Credit Score: {prospect['credit_score_current']}
  Savings: ${prospect['savings']:,.0f}
  Max Home Price: ${prospect['max_affordable_home']:,.0f}
"""
        
        print(report)
        return report

def main():
    """Main execution function."""
    print("🏠 Rental-to-Owner Identifier Analysis")
    print("=" * 50)
    
    # Initialize analyzer
    analyzer = RentalToOwnerAnalyzer('rental_data.csv')
    
    # Generate comprehensive report
    analyzer.generate_report()
    
    # Create visualizations
    print("\n📊 Generating visualizations...")
    analyzer.create_visualizations()
    
    # Export results
    print("\n💾 Exporting results...")
    results = analyzer.export_results()
    
    # Generate outreach campaigns
    print("\n📧 Sample outreach messages generated:")
    messages = analyzer.generate_outreach_messages()
    for i, msg in enumerate(messages[:3]):  # Show first 3 messages
        print(f"\n{i+1}. {msg['name']} ({msg['priority']}):")
        print(f"   {msg['message'][:100]}...")
    
    print(f"\n✅ Analysis complete! Check 'rental_analysis_results.json' for full results.")
    print("📈 Dashboard visualization saved as 'rental_analysis_dashboard.png'")

if __name__ == "__main__":
    main()