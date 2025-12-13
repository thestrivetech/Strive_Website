#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { pageSEO } from '../client/src/lib/seo-config';

interface SEOValidationResult {
  page: string;
  title: string;
  titleLength: number;
  titleValid: boolean;
  description: string;
  descriptionLength: number;
  descriptionValid: boolean;
  keywordCount: number;
  issues: string[];
  score: number;
}

// SEO validation rules
const SEO_RULES = {
  title: {
    minLength: 30,
    maxLength: 60,
    shouldIncludeBrand: true
  },
  description: {
    minLength: 120,
    maxLength: 160
  },
  keywords: {
    minCount: 5,
    maxCount: 15
  }
};

async function validatePageSEO(): Promise<SEOValidationResult[]> {
  const results: SEOValidationResult[] = [];
  
  // Get all configured pages
  const pages = Object.keys(pageSEO);
  
  for (const page of pages) {
    const config = pageSEO[page];
    const issues: string[] = [];
    let score = 100;
    
    // Validate title
    const titleLength = config.title.length;
    const titleValid = titleLength >= SEO_RULES.title.minLength && 
                      titleLength <= SEO_RULES.title.maxLength;
    
    if (!titleValid) {
      if (titleLength < SEO_RULES.title.minLength) {
        issues.push(`Title too short (${titleLength} chars, min ${SEO_RULES.title.minLength})`);
        score -= 15;
      } else {
        issues.push(`Title too long (${titleLength} chars, max ${SEO_RULES.title.maxLength})`);
        score -= 10;
      }
    }
    
    if (!config.title.toLowerCase().includes('strive')) {
      issues.push('Title should include brand name "Strive"');
      score -= 5;
    }
    
    // Validate description
    const descriptionLength = config.description.length;
    const descriptionValid = descriptionLength >= SEO_RULES.description.minLength && 
                           descriptionLength <= SEO_RULES.description.maxLength;
    
    if (!descriptionValid) {
      if (descriptionLength < SEO_RULES.description.minLength) {
        issues.push(`Description too short (${descriptionLength} chars, min ${SEO_RULES.description.minLength})`);
        score -= 15;
      } else {
        issues.push(`Description too long (${descriptionLength} chars, max ${SEO_RULES.description.maxLength})`);
        score -= 10;
      }
    }
    
    // Validate keywords
    const keywordCount = config.keywords?.length || 0;
    if (keywordCount < SEO_RULES.keywords.minCount) {
      issues.push(`Not enough keywords (${keywordCount}, min ${SEO_RULES.keywords.minCount})`);
      score -= 10;
    } else if (keywordCount > SEO_RULES.keywords.maxCount) {
      issues.push(`Too many keywords (${keywordCount}, max ${SEO_RULES.keywords.maxCount})`);
      score -= 5;
    }
    
    // Check for duplicate keywords
    if (config.keywords) {
      const uniqueKeywords = new Set(config.keywords.map(k => k.toLowerCase()));
      if (uniqueKeywords.size !== config.keywords.length) {
        issues.push('Duplicate keywords found');
        score -= 5;
      }
    }
    
    results.push({
      page,
      title: config.title,
      titleLength,
      titleValid,
      description: config.description,
      descriptionLength,
      descriptionValid,
      keywordCount,
      issues,
      score: Math.max(0, score)
    });
  }
  
  return results;
}

async function validateTechnicalSEO(): Promise<{ file: string; exists: boolean; valid: boolean; issues: string[] }[]> {
  const technicalFiles = [
    {
      file: 'public/robots.txt',
      validator: (content: string) => {
        const issues: string[] = [];
        if (!content.includes('User-agent:')) {
          issues.push('Missing User-agent directive');
        }
        if (!content.includes('Sitemap:')) {
          issues.push('Missing Sitemap directive');
        }
        if (!content.includes('Allow:') && !content.includes('Disallow:')) {
          issues.push('Missing Allow/Disallow directives');
        }
        return issues;
      }
    }
    // Note: sitemap.xml is now served dynamically via /api/sitemap.xml
  ];
  
  const results = [];
  
  for (const { file, validator } of technicalFiles) {
    const filePath = path.join(process.cwd(), file);
    const exists = fs.existsSync(filePath);
    let valid = false;
    let issues: string[] = [];
    
    if (exists) {
      const content = fs.readFileSync(filePath, 'utf-8');
      issues = validator(content);
      valid = issues.length === 0;
    } else {
      issues = ['File does not exist'];
    }
    
    results.push({ file, exists, valid, issues });
  }
  
  return results;
}

async function generateSEOReport() {
  console.log('\n🔍 Strive Tech SEO Validation Report');
  console.log('=====================================\n');
  
  // Validate page-specific SEO
  console.log('📄 Page-Specific SEO Analysis:');
  console.log('-'.repeat(50));
  
  const pageResults = await validatePageSEO();
  let totalScore = 0;
  let pageCount = 0;
  
  for (const result of pageResults) {
    pageCount++;
    totalScore += result.score;
    
    const scoreColor = result.score >= 90 ? '🟢' : result.score >= 70 ? '🟡' : '🔴';
    console.log(`\n${scoreColor} ${result.page} (Score: ${result.score}/100)`);
    
    if (result.issues.length > 0) {
      console.log('   Issues:');
      result.issues.forEach(issue => console.log(`   - ${issue}`));
    } else {
      console.log('   ✅ All checks passed');
    }
  }
  
  const averageScore = Math.round(totalScore / pageCount);
  console.log(`\n📊 Average Page Score: ${averageScore}/100`);
  
  // Validate technical SEO
  console.log('\n\n🔧 Technical SEO Analysis:');
  console.log('-'.repeat(50));
  
  const technicalResults = await validateTechnicalSEO();
  
  for (const result of technicalResults) {
    const statusIcon = result.valid ? '✅' : '❌';
    console.log(`\n${statusIcon} ${result.file}`);
    
    if (result.issues.length > 0) {
      console.log('   Issues:');
      result.issues.forEach(issue => console.log(`   - ${issue}`));
    }
  }
  
  // Overall SEO Health Score
  const technicalScore = technicalResults.filter(r => r.valid).length / technicalResults.length * 100;
  const overallScore = Math.round((averageScore + technicalScore) / 2);
  
  console.log('\n\n🎯 Overall SEO Health Score:');
  console.log('-'.repeat(50));
  console.log(`Page SEO: ${averageScore}/100`);
  console.log(`Technical SEO: ${Math.round(technicalScore)}/100`);
  console.log(`\n🏆 Overall Score: ${overallScore}/100`);
  
  if (overallScore >= 95) {
    console.log('🎉 Excellent! Your SEO is in great shape.');
  } else if (overallScore >= 85) {
    console.log('👍 Good SEO health with room for minor improvements.');
  } else if (overallScore >= 70) {
    console.log('⚠️  Moderate SEO health. Address the issues above.');
  } else {
    console.log('🚨 Poor SEO health. Immediate attention required.');
  }
  
  console.log('\n=====================================\n');
}

// Run the validation
generateSEOReport().catch(console.error);

export { validatePageSEO, validateTechnicalSEO, generateSEOReport };