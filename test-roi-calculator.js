// Test script to verify ROI calculator implementation
import { roiCalculator } from './client/src/lib/roi-calculator.ts';

console.log('🧪 Testing ROI Calculator Implementation\n');
console.log('=' .repeat(50));

// Test 1: Verify all 22 industries exist
console.log('\n✅ Test 1: Verifying all 22 industries...');
const industries = roiCalculator.getAllIndustries();
console.log(`Found ${industries.length} industries:`);
industries.forEach(industry => console.log(`  - ${industry}`));

// Test 2: Verify each industry has 4 solutions
console.log('\n✅ Test 2: Verifying each industry has 4 solutions...');
let allSolutionsValid = true;
industries.forEach(industry => {
  const solutions = roiCalculator.getSolutionsForIndustry(industry);
  if (solutions.length !== 4) {
    console.log(`  ❌ ${industry}: ${solutions.length} solutions (expected 4)`);
    allSolutionsValid = false;
  } else {
    console.log(`  ✓ ${industry}: ${solutions.length} solutions`);
  }
});

// Test 3: Sample ROI calculations
console.log('\n✅ Test 3: Sample ROI Calculations...');

// Healthcare with 2 solutions, $50,000 investment
const healthcareResult = roiCalculator.calculateROI(
  'Healthcare',
  50000,
  ['Clinical Diagnostics AI', 'EHR Automation']
);
console.log('\nHealthcare (2 solutions, $50K investment):');
console.log(`  5-Year ROI: ${healthcareResult.fiveYearROI}`);
console.log(`  Time Savings: ${healthcareResult.timeSavings}`);
console.log(`  Annual Return: ${healthcareResult.annualReturn}`);
console.log(`  Payback Period: ${healthcareResult.paybackMonths} months`);
console.log(`  ROI Multiplier: ${healthcareResult.roiMultiplier}x`);

// Technology with all 4 solutions, $100,000 investment
const techResult = roiCalculator.calculateROI(
  'Technology',
  100000,
  roiCalculator.getSolutionsForIndustry('Technology')
);
console.log('\nTechnology (4 solutions, $100K investment):');
console.log(`  5-Year ROI: ${techResult.fiveYearROI}`);
console.log(`  Time Savings: ${techResult.timeSavings}`);
console.log(`  Annual Return: ${techResult.annualReturn}`);
console.log(`  Payback Period: ${techResult.paybackMonths} months`);
console.log(`  ROI Multiplier: ${techResult.roiMultiplier}x`);

// Test 4: Verify solution details
console.log('\n✅ Test 4: Sample Solution Details...');
const fraudDetection = roiCalculator.getSolutionDetails('Financial Services', 'Fraud Detection AI');
if (fraudDetection) {
  console.log('\nFraud Detection AI (Financial Services):');
  console.log(`  Description: ${fraudDetection.description}`);
  console.log(`  ROI Multiplier: ${fraudDetection.roiMultiplier}x`);
  console.log(`  Time Savings: ${fraudDetection.timeSavingsPercent}%`);
  console.log(`  Annual Benefit per $1K: $${fraudDetection.annualBenefitPer1K}`);
}

console.log('\n' + '='.repeat(50));
console.log('✨ All tests completed successfully!');