// Frontend/src/components/Dashboard/DashboardStats.tsx
import { TrendingUp, Users, Zap, Shield } from 'lucide-react';

const DashboardStats = () => {
    const stats = [
        {
            icon: TrendingUp,
            label: 'Total Requests',
            value: '1,247',
            change: '+12.5%',
            positive: true
        },
        {
            icon: Users,
            label: 'Active Users',
            value: '342',
            change: '+8.2%',
            positive: true
        },
        {
            icon: Zap,
            label: 'Avg Response Time',
            value: '124ms',
            change: '-5.3%',
            positive: true
        },
        {
            icon: Shield,
            label: 'Success Rate',
            value: '99.8%',
            change: '+0.2%',
            positive: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-surface-container-low p-6 rounded-2xl shadow-ambient hover:shadow-ambient-hover transition-shadow"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <stat.icon className="w-6 h-6 text-primary" />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.positive ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
                            }`}>
                            {stat.change}
                        </span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-on-surface mb-1">{stat.value}</h3>
                    <p className="text-sm text-secondary">{stat.label}</p>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;
