import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardChart({ data }) {
  const chartData = {
    labels: ['Total Bookings', 'Active', 'Revenue ($)', 'Utilization (%)'],
    datasets: [
      {
        label: 'Analytics',
        data: [
          data.totalBookings,
          data.activeBookings,
          data.totalRevenue,
          data.utilizationRate
        ],
        backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'System Analytics' },
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default DashboardChart;
