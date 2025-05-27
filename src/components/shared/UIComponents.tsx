import React from 'react';
import { LucideIcon } from 'lucide-react';
import { MUSCAT_BAY_THEME } from '@/lib/theme';

// Common Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md',
  shadow = 'md',
  hover = false
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div className={`
      bg-white rounded-xl border border-gray-200 
      ${paddingClasses[padding]} 
      ${shadowClasses[shadow]}
      ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    description?: string;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  color = 'primary',
  size = 'md'
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary-600',
      iconBg: 'bg-primary-100',
    },
    secondary: {
      bg: 'bg-secondary-50',
      icon: 'text-secondary-600',
      iconBg: 'bg-secondary-100',
    },
    success: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    warning: {
      bg: 'bg-yellow-50',
      icon: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
    },
    error: {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      iconBg: 'bg-red-100',
    },
  };

  const sizeClasses = {
    sm: {
      padding: 'p-4',
      title: 'text-sm',
      value: 'text-2xl',
      icon: 16,
    },
    md: {
      padding: 'p-6',
      title: 'text-base',
      value: 'text-3xl',
      icon: 20,
    },
    lg: {
      padding: 'p-8',
      title: 'text-lg',
      value: 'text-4xl',
      icon: 24,
    },
  };

  const colors = colorClasses[color];
  const sizes = sizeClasses[size];

  const getTrendColor = () => {
    if (!trend) return '';
    switch (trend.direction) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend.direction) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  return (
    <Card className={`${sizes.padding} hover:shadow-lg transition-shadow duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`font-medium text-gray-600 ${sizes.title}`}>
            {title}
          </h3>
        </div>
        <div className={`p-3 rounded-full ${colors.iconBg}`}>
          <Icon size={sizes.icon} className={colors.icon} />
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex items-baseline gap-2">
          <span className={`font-bold text-gray-900 ${sizes.value}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && (
            <span className="text-sm font-medium text-gray-500">{unit}</span>
          )}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1">
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {getTrendIcon()} {trend.value}
          </span>
          {trend.description && (
            <span className="text-xs text-gray-500">{trend.description}</span>
          )}
        </div>
      )}
    </Card>
  );
};

// Chart Wrapper Component
interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: string;
  tools?: React.ReactNode;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  subtitle,
  children,
  height = '400px',
  tools
}) => {
  return (
    <Card>
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          {tools && <div className="flex gap-2">{tools}</div>}
        </div>
      </div>
      
      <div style={{ height }}>{children}</div>
    </Card>
  );
};

// Section Header Component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// Filter Bar Component
interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  filters: {
    id: string;
    label: string;
    value: string;
    options: FilterOption[];
    onChange: (value: string) => void;
    icon?: LucideIcon;
  }[];
  onReset?: () => void;
  actions?: React.ReactNode;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onReset,
  actions
}) => {
  return (
    <Card className="mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-gray-700">Filters:</span>
        
        {filters.map((filter) => (
          <div key={filter.id} className="flex items-center gap-2">
            {filter.icon && <filter.icon size={16} className="text-gray-500" />}
            <label className="text-sm text-gray-600">{filter.label}:</label>
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        {onReset && (
          <button
            onClick={onReset}
            className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            Reset
          </button>
        )}

        {actions && <div className="ml-auto flex gap-2">{actions}</div>}
      </div>
    </Card>
  );
};

// Loading Component
interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div 
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${sizeClasses[size]}`}
      />
      <p className="mt-4 text-sm text-gray-600">{message}</p>
    </div>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  children, 
  size = 'sm' 
}) => {
  const statusClasses = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${statusClasses[status]} 
      ${sizeClasses[size]}
    `}>
      {children}
    </span>
  );
};
