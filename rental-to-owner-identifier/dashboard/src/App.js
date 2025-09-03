import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, Home, Mail, Phone } from 'lucide-react';

// Mock comprehensive dataset
const mockRenterData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 123-4567",
    currentRent: 1850,
    monthsAsRenter: 28,
    paymentHistory: [
      { month: "2023-01", onTime: true, amount: 1800, daysLate: 0 },
      { month: "2023-02", onTime: true, amount: 1800, daysLate: 0 },
      { month: "2023-03", onTime: false, amount: 1800, daysLate: 5 },
      { month: "2023-04", onTime: true, amount: 1850, daysLate: 0 },
      { month: "2023-05", onTime: true, amount: 1850, daysLate: 0 },
      { month: "2023-06", onTime: true, amount: 1850, daysLate: 0 },
      { month: "2023-07", onTime: true, amount: 1850, daysLate: 0 },
      { month: "2023-08", onTime: true, amount: 1850, daysLate: 0 },
      { month: "2023-09", onTime: true, amount: 1850, daysLate: 0 },
      { month: "2023-10", onTime: true, amount: 1850, daysLate: 0 },
      { month: "2023-11", onTime: true, amount: 1850, daysLate: 0 },
      { month: "2023-12", onTime: true, amount: 1850, daysLate: 0 }
    ],
    creditHistory: [
      { date: "2023-01", score: 640, utilization: 0.68 },
      { date: "2023-04", score: 655, utilization: 0.62 },
      { date: "2023-07", score: 672, utilization: 0.58 },
      { date: "2023-10", score: 695, utilization: 0.52 },
      { date: "2024-01", score: 715, utilization: 0.45 }
    ],
    income: 78000,
    savings: 15000,
    debts: 12000,
    employmentYears: 3.2,
    readinessScore: 85,
    recommendation: "High Priority",
    estimatedDownPayment: 14000,
    maxAffordableHome: 280000
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "(555) 234-5678",
    currentRent: 2200,
    monthsAsRenter: 36,
    paymentHistory: [
      { month: "2023-01", onTime: true, amount: 2100, daysLate: 0 },
      { month: "2023-02", onTime: true, amount: 2100, daysLate: 0 },
      { month: "2023-03", onTime: true, amount: 2100, daysLate: 0 },
      { month: "2023-04", onTime: true, amount: 2200, daysLate: 0 },
      { month: "2023-05", onTime: true, amount: 2200, daysLate: 0 },
      { month: "2023-06", onTime: true, amount: 2200, daysLate: 0 },
      { month: "2023-07", onTime: false, amount: 2200, daysLate: 3 },
      { month: "2023-08", onTime: true, amount: 2200, daysLate: 0 },
      { month: "2023-09", onTime: true, amount: 2200, daysLate: 0 },
      { month: "2023-10", onTime: true, amount: 2200, daysLate: 0 },
      { month: "2023-11", onTime: true, amount: 2200, daysLate: 0 },
      { month: "2023-12", onTime: true, amount: 2200, daysLate: 0 }
    ],
    creditHistory: [
      { date: "2023-01", score: 720, utilization: 0.42 },
      { date: "2023-04", score: 725, utilization: 0.38 },
      { date: "2023-07", score: 730, utilization: 0.35 },
      { date: "2023-10", score: 745, utilization: 0.28 },
      { date: "2024-01", score: 760, utilization: 0.22 }
    ],
    income: 95000,
    savings: 32000,
    debts: 8500,
    employmentYears: 4.8,
    readinessScore: 92,
    recommendation: "Ready Now",
    estimatedDownPayment: 25000,
    maxAffordableHome: 380000
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "(555) 345-6789",
    currentRent: 1650,
    monthsAsRenter: 18,
    paymentHistory: [
      { month: "2023-01", onTime: false, amount: 1600, daysLate: 8 },
      { month: "2023-02", onTime: false, amount: 1600, daysLate: 12 },
      { month: "2023-03", onTime: true, amount: 1600, daysLate: 0 },
      { month: "2023-04", onTime: true, amount: 1650, daysLate: 0 },
      { month: "2023-05", onTime: true, amount: 1650, daysLate: 0 },
      { month: "2023-06", onTime: false, amount: 1650, daysLate: 4 },
      { month: "2023-07", onTime: true, amount: 1650, daysLate: 0 },
      { month: "2023-08", onTime: true, amount: 1650, daysLate: 0 },
      { month: "2023-09", onTime: true, amount: 1650, daysLate: 0 },
      { month: "2023-10", onTime: true, amount: 1650, daysLate: 0 },
      { month: "2023-11", onTime: true, amount: 1650, daysLate: 0 },
      { month: "2023-12", onTime: true, amount: 1650, daysLate: 0 }
    ],
    creditHistory: [
      { date: "2023-01", score: 580, utilization: 0.85 },
      { date: "2023-04", score: 595, utilization: 0.78 },
      { date: "2023-07", score: 615, utilization: 0.72 },
      { date: "2023-10", score: 640, utilization: 0.65 },
      { date: "2024-01", score: 665, utilization: 0.58 }
    ],
    income: 62000,
    savings: 8500,
    debts: 18000,
    employmentYears: 2.1,
    readinessScore: 68,
    recommendation: "Needs Improvement",
    estimatedDownPayment: 8000,
    maxAffordableHome: 220000
  },
  {
    id: 4,
    name: "David Williams",
    email: "d.williams@email.com",
    phone: "(555) 456-7890",
    currentRent: 1950,
    monthsAsRenter: 24,
    paymentHistory: [
      { month: "2023-01", onTime: true, amount: 1900, daysLate: 0 },
      { month: "2023-02", onTime: true, amount: 1900, daysLate: 0 },
      { month: "2023-03", onTime: true, amount: 1900, daysLate: 0 },
      { month: "2023-04", onTime: true, amount: 1950, daysLate: 0 },
      { month: "2023-05", onTime: true, amount: 1950, daysLate: 0 },
      { month: "2023-06", onTime: true, amount: 1950, daysLate: 0 },
      { month: "2023-07", onTime: true, amount: 1950, daysLate: 0 },
      { month: "2023-08", onTime: true, amount: 1950, daysLate: 0 },
      { month: "2023-09", onTime: true, amount: 1950, daysLate: 0 },
      { month: "2023-10", onTime: true, amount: 1950, daysLate: 0 },
      { month: "2023-11", onTime: true, amount: 1950, daysLate: 0 },
      { month: "2023-12", onTime: true, amount: 1950, daysLate: 0 }
    ],
    creditHistory: [
      { date: "2023-01", score: 690, utilization: 0.45 },
      { date: "2023-04", score: 705, utilization: 0.40 },
      { date: "2023-07", score: 720, utilization: 0.35 },
      { date: "2023-10", score: 735, utilization: 0.30 },
      { date: "2024-01", score: 750, utilization: 0.25 }
    ],
    income: 85000,
    savings: 22000,
    debts: 15000,
    employmentYears: 3.8,
    readinessScore: 88,
    recommendation: "High Priority",
    estimatedDownPayment: 20000,
    maxAffordableHome: 340000
  }
];

// Styles object
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '24px'
  },
  maxWidth: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#6b7280'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  statContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '32px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  cardHeader: {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb'
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '16px'
  },
  filterGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  select: {
    width: '100%',
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  renterList: {
    maxHeight: '400px',
    overflowY: 'auto'
  },
  renterItem: {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  renterItemHover: {
    backgroundColor: '#f9fafb'
  },
  renterItemSelected: {
    backgroundColor: '#eff6ff',
    borderLeft: '4px solid #3b82f6'
  },
  renterName: {
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: '8px'
  },
  badge: {
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '9999px',
    fontWeight: '500'
  },
  badgeReady: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  badgeHigh: {
    backgroundColor: '#fef3c7',
    color: '#92400e'
  },
  badgeImprovement: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  },
  renterInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#6b7280'
  },
  profileSection: {
    marginBottom: '24px'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px'
  },
  profileName: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    color: '#6b7280',
    marginTop: '8px',
    fontSize: '14px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  scoreDisplay: {
    textAlign: 'right'
  },
  scoreNumber: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#2563eb'
  },
  scoreLabel: {
    fontSize: '14px',
    color: '#6b7280'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  metricCard: {
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  metricValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937'
  },
  metricLabel: {
    fontSize: '12px',
    color: '#6b7280'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  detailSection: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#1f2937'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px'
  },
  detailLabel: {
    color: '#6b7280'
  },
  detailValue: {
    fontWeight: '500',
    color: '#1f2937'
  },
  chartContainer: {
    height: '200px',
    marginBottom: '24px'
  },
  paymentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gap: '4px',
    marginBottom: '8px'
  },
  paymentCell: {
    height: '32px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '500'
  },
  paymentOnTime: {
    backgroundColor: '#dcfce7',
    color: '#166534'
  },
  paymentLate: {
    backgroundColor: '#fee2e2',
    color: '#991b1b'
  },
  paymentLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '8px'
  },
  outreachSection: {
    marginBottom: '24px'
  },
  outreachHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  button: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  messageBox: {
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '8px'
  },
  messageText: {
    fontSize: '14px',
    color: '#374151',
    lineHeight: '1.5'
  }
};

const RentalToOwnerIdentifier = () => {
  const [selectedRenter, setSelectedRenter] = useState(mockRenterData[0]);
  const [sortBy, setSortBy] = useState('readinessScore');
  const [filterBy, setFilterBy] = useState('all');

  // Calculate statistics
  const stats = {
    totalRenters: mockRenterData.length,
    readyNow: mockRenterData.filter(r => r.readinessScore >= 90).length,
    highPriority: mockRenterData.filter(r => r.readinessScore >= 80 && r.readinessScore < 90).length,
    needsImprovement: mockRenterData.filter(r => r.readinessScore < 80).length,
    avgCreditImprovement: mockRenterData.reduce((acc, renter) => {
      const firstScore = renter.creditHistory[0].score;
      const lastScore = renter.creditHistory[renter.creditHistory.length - 1].score;
      return acc + (lastScore - firstScore);
    }, 0) / mockRenterData.length
  };

  // Filter and sort renters
  const filteredRenters = mockRenterData
    .filter(renter => {
      if (filterBy === 'all') return true;
      if (filterBy === 'ready') return renter.readinessScore >= 90;
      if (filterBy === 'priority') return renter.readinessScore >= 80 && renter.readinessScore < 90;
      if (filterBy === 'needs-improvement') return renter.readinessScore < 80;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'readinessScore') return b.readinessScore - a.readinessScore;
      if (sortBy === 'creditScore') return b.creditHistory[b.creditHistory.length - 1].score - a.creditHistory[a.creditHistory.length - 1].score;
      if (sortBy === 'savings') return b.savings - a.savings;
      if (sortBy === 'income') return b.income - a.income;
      return 0;
    });

  // Calculate payment reliability
  const calculatePaymentReliability = (paymentHistory) => {
    const onTimePayments = paymentHistory.filter(p => p.onTime).length;
    return (onTimePayments / paymentHistory.length * 100).toFixed(1);
  };

  // Generate outreach message
  const generateOutreachMessage = (renter) => {
    if (renter.readinessScore >= 90) {
      return `Hi ${renter.name}! Based on your excellent rental payment history and improved credit score of ${renter.creditHistory[renter.creditHistory.length - 1].score}, you're ready to become a homeowner! We have special first-time buyer programs with down payments as low as ${((renter.estimatedDownPayment / renter.maxAffordableHome) * 100).toFixed(1)}%. Let's schedule a consultation!`;
    } else if (renter.readinessScore >= 80) {
      return `Hello ${renter.name}, your consistent rental payments and credit improvement show you're nearly ready for homeownership! With a few small steps, we can help you qualify for a home up to $${renter.maxAffordableHome.toLocaleString()}. Would you like to learn about our preparation programs?`;
    } else {
      return `Hi ${renter.name}, we've noticed your improving payment pattern! While you're building toward homeownership, we'd love to help you with credit counseling and savings strategies. Let's create a personalized roadmap to get you ready!`;
    }
  };

  const getBadgeStyle = (recommendation) => {
    const baseStyle = { ...styles.badge };
    if (recommendation === 'Ready Now') return { ...baseStyle, ...styles.badgeReady };
    if (recommendation === 'High Priority') return { ...baseStyle, ...styles.badgeHigh };
    return { ...baseStyle, ...styles.badgeImprovement };
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Rental-to-Owner Identifier</h1>
          <p style={styles.subtitle}>Identify renters ready to transition to homeownership</p>
        </div>

        {/* Stats Dashboard */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Total Renters</p>
                <p style={styles.statNumber}>{stats.totalRenters}</p>
              </div>
              <User size={32} color="#3b82f6" />
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Ready Now</p>
                <p style={{ ...styles.statNumber, color: '#059669' }}>{stats.readyNow}</p>
              </div>
              <Home size={32} color="#10b981" />
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>High Priority</p>
                <p style={{ ...styles.statNumber, color: '#d97706' }}>{stats.highPriority}</p>
              </div>
              <TrendingUp size={32} color="#f59e0b" />
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div>
                <p style={styles.statLabel}>Avg Credit Gain</p>
                <p style={{ ...styles.statNumber, color: '#2563eb' }}>+{stats.avgCreditImprovement.toFixed(0)}</p>
              </div>
              <TrendingUp size={32} color="#3b82f6" />
            </div>
          </div>
        </div>

        <div style={styles.mainGrid}>
          {/* Renter List */}
          <div>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Rental Candidates</h2>
                
                {/* Filters */}
                <div>
                  <div style={styles.filterGroup}>
                    <label style={styles.label}>Sort by</label>
                    <select 
                      style={styles.select}
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="readinessScore">Readiness Score</option>
                      <option value="creditScore">Credit Score</option>
                      <option value="savings">Savings</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                  
                  <div style={styles.filterGroup}>
                    <label style={styles.label}>Filter by</label>
                    <select 
                      style={styles.select}
                      value={filterBy} 
                      onChange={(e) => setFilterBy(e.target.value)}
                    >
                      <option value="all">All Renters</option>
                      <option value="ready">Ready Now (90+)</option>
                      <option value="priority">High Priority (80-89)</option>
                      <option value="needs-improvement">Needs Improvement (&lt;80)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div style={styles.renterList}>
                {filteredRenters.map((renter) => (
                  <div
                    key={renter.id}
                    onClick={() => setSelectedRenter(renter)}
                    style={{
                      ...styles.renterItem,
                      ...(selectedRenter.id === renter.id ? styles.renterItemSelected : {})
                    }}
                    onMouseEnter={(e) => {
                      if (selectedRenter.id !== renter.id) {
                        e.target.style.backgroundColor = '#f9fafb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedRenter.id !== renter.id) {
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h3 style={styles.renterName}>{renter.name}</h3>
                      <span style={getBadgeStyle(renter.recommendation)}>
                        {renter.recommendation}
                      </span>
                    </div>
                    <div style={styles.renterInfo}>
                      <span>Score: {renter.readinessScore}</span>
                      <span>${renter.currentRent}/mo</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
                      {calculatePaymentReliability(renter.paymentHistory)}% on-time payments
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div>
            <div style={{ ...styles.card, marginBottom: '24px' }}>
              <div style={{ padding: '24px' }}>
                {/* Renter Profile */}
                <div style={styles.profileHeader}>
                  <div>
                    <h2 style={styles.profileName}>{selectedRenter.name}</h2>
                    <div style={styles.contactInfo}>
                      <span style={styles.contactItem}>
                        <Mail size={16} />
                        {selectedRenter.email}
                      </span>
                      <span style={styles.contactItem}>
                        <Phone size={16} />
                        {selectedRenter.phone}
                      </span>
                    </div>
                  </div>
                  <div style={styles.scoreDisplay}>
                    <div style={styles.scoreNumber}>{selectedRenter.readinessScore}</div>
                    <div style={styles.scoreLabel}>Readiness Score</div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div style={styles.metricsGrid}>
                  <div style={styles.metricCard}>
                    <div style={styles.metricValue}>${selectedRenter.currentRent}</div>
                    <div style={styles.metricLabel}>Current Rent</div>
                  </div>
                  <div style={styles.metricCard}>
                    <div style={styles.metricValue}>
                      {selectedRenter.creditHistory[selectedRenter.creditHistory.length - 1].score}
                    </div>
                    <div style={styles.metricLabel}>Credit Score</div>
                  </div>
                  <div style={styles.metricCard}>
                    <div style={styles.metricValue}>${selectedRenter.savings.toLocaleString()}</div>
                    <div style={styles.metricLabel}>Savings</div>
                  </div>
                  <div style={styles.metricCard}>
                    <div style={styles.metricValue}>{calculatePaymentReliability(selectedRenter.paymentHistory)}%</div>
                    <div style={styles.metricLabel}>On-Time Rate</div>
                  </div>
                </div>

                {/* Financial Profile */}
                <div style={styles.detailsGrid}>
                  <div>
                    <h3 style={styles.sectionTitle}>Financial Profile</h3>
                    <div style={{ fontSize: '14px' }}>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Annual Income:</span>
                        <span style={styles.detailValue}>${selectedRenter.income.toLocaleString()}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Total Savings:</span>
                        <span style={styles.detailValue}>${selectedRenter.savings.toLocaleString()}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Total Debts:</span>
                        <span style={styles.detailValue}>${selectedRenter.debts.toLocaleString()}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Employment Years:</span>
                        <span style={styles.detailValue}>{selectedRenter.employmentYears}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 style={styles.sectionTitle}>Homeownership Potential</h3>
                    <div style={{ fontSize: '14px' }}>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Est. Down Payment:</span>
                        <span style={styles.detailValue}>${selectedRenter.estimatedDownPayment.toLocaleString()}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Max Home Price:</span>
                        <span style={styles.detailValue}>${selectedRenter.maxAffordableHome.toLocaleString()}</span>
                      </div>
                      <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>Renting Duration:</span>
                        <span style={styles.detailValue}>{selectedRenter.monthsAsRenter} months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Improvement Chart */}
            <div style={{ ...styles.card, marginBottom: '24px' }}>
              <div style={{ padding: '24px' }}>
                <h3 style={styles.sectionTitle}>Credit Score Improvement</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={selectedRenter.creditHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 20', 'dataMax + 20']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment History */}
            <div style={{ ...styles.card, marginBottom: '24px' }}>
              <div style={{ padding: '24px' }}>
                <h3 style={styles.sectionTitle}>Payment History (Last 12 Months)</h3>
                <div style={styles.paymentGrid}>
                  {selectedRenter.paymentHistory.map((payment, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.paymentCell,
                        ...(payment.onTime ? styles.paymentOnTime : styles.paymentLate)
                      }}
                      title={`${payment.month}: ${payment.onTime ? 'On Time' : `${payment.daysLate} days late`}`}
                    >
                      {payment.onTime ? '✓' : payment.daysLate}
                    </div>
                  ))}
                </div>
                <div style={styles.paymentLabels}>
                  <span>Jan 2023</span>
                  <span>Dec 2023</span>
                </div>
              </div>
            </div>

            {/* Outreach Message */}
            <div style={styles.card}>
              <div style={{ padding: '24px' }}>
                <div style={styles.outreachHeader}>
                  <h3 style={styles.sectionTitle}>Personalized Outreach</h3>
                  <button style={styles.button}>
                    <Mail size={16} />
                    Send Message
                  </button>
                </div>
                <div style={styles.messageBox}>
                  <p style={styles.messageText}>
                    {generateOutreachMessage(selectedRenter)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalToOwnerIdentifier;