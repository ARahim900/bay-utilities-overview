import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    description: string;
  };
  color?: 'primary' | 'success' | 'warning' | 'error' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function MetricCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  color = 'primary',
  size = 'md'
}: MetricCardProps) {
  const colorClasses = {
    primary: 'border-bay-200 bg-bay-50',
    success: 'border-emerald-200 bg-emerald-50',
    warning: 'border-yellow-200 bg-yellow-50',
    error: 'border-red-200 bg-red-50',
    secondary: 'border-blue-200 bg-blue-50'
  };

  const iconColorClasses = {
    primary: 'text-bay-600',
    success: 'text-emerald-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    secondary: 'text-blue-600'
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up': return 'text-emerald-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className={cn('border shadow-md hover:shadow-lg transition-shadow', colorClasses[color])}>
      <CardContent className={sizeClasses[size]}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                'font-bold text-gray-900',
                size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-xl'
              )}>
                {value}
              </span>
              {unit && (
                <span className="text-sm font-medium text-gray-500">{unit}</span>
              )}
            </div>
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span className={cn('text-sm font-medium', getTrendColor(trend.direction))}>
                  {trend.value}
                </span>
                <span className="text-xs text-gray-500">{trend.description}</span>
              </div>
            )}
          </div>
          <div className={cn('p-3 rounded-lg', colorClasses[color])}>
            <Icon className={cn('h-6 w-6', iconColorClasses[color])} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}