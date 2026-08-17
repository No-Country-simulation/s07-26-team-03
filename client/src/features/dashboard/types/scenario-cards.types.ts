export interface ScenarioCardMetrics {
  stranded: string;
  wasted: string;
  financial: string;
}

export interface ScenarioCardData {
  id: number;
  topBorderColor: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  title: string;
  subtitle: string;
  metricsColor: string;
  metrics: ScenarioCardMetrics;
  score: string;
  scoreStatus: string;
  scoreBadgeBg: string;
  scoreBadgeTextColor: string;
}