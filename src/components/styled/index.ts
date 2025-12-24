"use client";

import styled, { keyframes } from "styled-components";

// ============= Colors & Theme =============
export const colors = {
  primary: "#1a2744",
  primaryLight: "#2d4263",
  accent: "#e94560",
  accentHover: "#ff6b6b",
  background: "#0f1624",
  backgroundLight: "#1a2744",
  cardBg: "#1e2d47",
  cardHover: "#253754",
  text: "#e8e8e8",
  textMuted: "#8b99ae",
  border: "#2d4263",
  success: "#4ade80",
  warning: "#fbbf24",
  error: "#ef4444",
};

// ============= Animations =============
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// ============= Layout =============
export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${colors.background} 0%, ${colors.backgroundLight} 100%);
  color: ${colors.text};
`;

export const Header = styled.header`
  background: linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    width: 40px;
    height: 40px;
    fill: ${colors.accent};
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${colors.text};
  margin: 0;
  
  span {
    color: ${colors.accent};
  }
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${colors.textMuted};
  margin: 0;
`;

export const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

// ============= Filters Section =============
export const FiltersContainer = styled.section`
  background: ${colors.cardBg};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
`;

export const FiltersTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 20px;
    height: 20px;
    fill: ${colors.accent};
  }
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr auto;
    align-items: end;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${colors.textMuted};
`;

export const Input = styled.input`
  background: ${colors.background};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${colors.text};
  font-size: 0.95rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${colors.accent};
    box-shadow: 0 0 0 3px rgba(233, 69, 96, 0.2);
  }
  
  &::placeholder {
    color: ${colors.textMuted};
  }
`;

export const SearchButton = styled.button`
  background: linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentHover} 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

// ============= Stats Bar =============
export const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const TotalCount = styled.div`
  font-size: 1rem;
  color: ${colors.textMuted};
  
  strong {
    color: ${colors.accent};
    font-weight: 600;
  }
`;

export const PageInfo = styled.div`
  font-size: 0.9rem;
  color: ${colors.textMuted};
`;

// ============= Bike Card =============
export const BikeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BikeCard = styled.article<{ $index: number }>`
  background: ${colors.cardBg};
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 180px 1fr;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${({ $index }) => $index * 0.05}s;
  animation-fill-mode: backwards;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    background: ${colors.cardHover};
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const BikeImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 140px;
  background: ${colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 640px) {
    height: 200px;
  }
`;

export const BikeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.textMuted};
  
  svg {
    width: 60px;
    height: 60px;
    opacity: 0.5;
  }
`;

export const BikeDetails = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const BikeTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
  line-height: 1.3;
  
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${colors.accent};
    }
  }
`;

export const BikeDescription = styled.p`
  font-size: 0.9rem;
  color: ${colors.textMuted};
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const BikeMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const BikeMeta = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-top: 2px;
    fill: ${colors.accent};
  }
`;

export const MetaLabel = styled.span`
  color: ${colors.textMuted};
`;

export const MetaValue = styled.span`
  color: ${colors.text};
  font-weight: 500;
`;

export const StolenBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(239, 68, 68, 0.2);
  color: ${colors.error};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
`;

// ============= Pagination =============
export const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

export const PaginationButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? colors.accent : colors.cardBg)};
  color: ${({ $active }) => ($active ? "white" : colors.text)};
  border: 1px solid ${({ $active }) => ($active ? colors.accent : colors.border)};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${({ $active }) => ($active ? colors.accentHover : colors.cardHover)};
    border-color: ${colors.accent};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PaginationEllipsis = styled.span`
  color: ${colors.textMuted};
  padding: 0.5rem;
`;

// ============= States =============
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid ${colors.border};
  border-top-color: ${colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const LoadingText = styled.p`
  color: ${colors.textMuted};
  font-size: 1rem;
`;

export const SkeletonCard = styled.div`
  background: ${colors.cardBg};
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 180px 1fr;
  animation: ${pulse} 1.5s ease-in-out infinite;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const SkeletonImage = styled.div`
  background: ${colors.background};
  height: 140px;
  
  @media (max-width: 640px) {
    height: 200px;
  }
`;

export const SkeletonContent = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SkeletonLine = styled.div<{ $width?: string }>`
  background: ${colors.background};
  height: 16px;
  border-radius: 4px;
  width: ${({ $width }) => $width || "100%"};
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  gap: 1rem;
  
  svg {
    width: 64px;
    height: 64px;
    fill: ${colors.error};
  }
`;

export const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
`;

export const ErrorMessage = styled.p`
  color: ${colors.textMuted};
  font-size: 1rem;
  max-width: 400px;
`;

export const RetryButton = styled(SearchButton)`
  background: ${colors.error};
  
  &:hover {
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  gap: 1rem;
  
  svg {
    width: 80px;
    height: 80px;
    fill: ${colors.textMuted};
    opacity: 0.5;
  }
`;

export const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${colors.text};
  margin: 0;
`;

export const EmptyMessage = styled.p`
  color: ${colors.textMuted};
  font-size: 1rem;
  max-width: 400px;
`;

// ============= Date Filter Notice =============
export const DateFilterNotice = styled.div`
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid ${colors.warning};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${colors.warning};
  
  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

// ============= Footer =============
export const Footer = styled.footer`
  background: ${colors.primary};
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
`;

export const FooterText = styled.p`
  color: ${colors.textMuted};
  font-size: 0.9rem;
  margin: 0;
  
  a {
    color: ${colors.accent};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

