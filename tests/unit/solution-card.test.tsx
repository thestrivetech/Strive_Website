import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SolutionCard from '@/components/ui/solution-card';
import { Star } from 'lucide-react';

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('SolutionCard', () => {
  beforeEach(() => {
    mockLocation.href = '';
  });

  it('renders with all required props', () => {
    render(
      <SolutionCard
        icon={<Star data-testid="icon" />}
        title="Test Solution"
        description="This is a test solution description"
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('text-title-test-solution')).toHaveTextContent('Test Solution');
    expect(screen.getByTestId('text-description-test-solution')).toHaveTextContent('This is a test solution description');
    expect(screen.getByTestId('link-learn-more-test-solution')).toHaveTextContent('Learn more');
  });

  it('applies custom className correctly', () => {
    render(
      <SolutionCard
        icon={<Star />}
        title="Test Solution"
        description="Test description"
        className="custom-class"
      />
    );

    const card = screen.getByTestId('card-solution-test-solution');
    expect(card).toHaveClass('custom-class');
  });

  it('navigates to href when clicked', () => {
    const testHref = '/test-solution';
    
    render(
      <SolutionCard
        icon={<Star />}
        title="Test Solution"
        description="Test description"
        href={testHref}
      />
    );

    const card = screen.getByTestId('card-solution-test-solution');
    fireEvent.click(card);

    expect(mockLocation.href).toBe(testHref);
  });

  it('does not navigate when href is not provided', () => {
    render(
      <SolutionCard
        icon={<Star />}
        title="Test Solution"
        description="Test description"
      />
    );

    const card = screen.getByTestId('card-solution-test-solution');
    fireEvent.click(card);

    expect(mockLocation.href).toBe('');
  });

  it('handles titles with special characters correctly', () => {
    render(
      <SolutionCard
        icon={<Star />}
        title="AI & Machine Learning"
        description="Test description"
      />
    );

    expect(screen.getByTestId('card-solution-ai-&-machine-learning')).toBeInTheDocument();
    expect(screen.getByTestId('text-title-ai-&-machine-learning')).toHaveTextContent('AI & Machine Learning');
  });

  it('has proper accessibility attributes', () => {
    render(
      <SolutionCard
        icon={<Star />}
        title="Accessible Solution"
        description="This solution is accessible"
      />
    );

    const card = screen.getByTestId('card-solution-accessible-solution');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toBeVisible();
  });

  it('displays the arrow icon in learn more section', () => {
    render(
      <SolutionCard
        icon={<Star />}
        title="Test Solution"
        description="Test description"
      />
    );

    const learnMore = screen.getByTestId('link-learn-more-test-solution');
    const arrow = learnMore.parentElement?.querySelector('svg');
    expect(arrow).toBeInTheDocument();
  });

  it('has hover effects applied', () => {
    render(
      <SolutionCard
        icon={<Star />}
        title="Hover Test"
        description="Test hover effects"
      />
    );

    const card = screen.getByTestId('card-solution-hover-test');
    expect(card).toHaveClass('card-hover');
    expect(card).toHaveClass('transition-all');
    expect(card).toHaveClass('duration-300');
    expect(card).toHaveClass('hover:shadow-lg');
  });
});