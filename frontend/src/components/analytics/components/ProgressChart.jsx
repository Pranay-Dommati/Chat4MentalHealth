import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ProgressChart({ data }) {
  const chartData = data.mood.map((value, index) => ({
    name: `Day ${index + 1}`,
    mood: value,
    sleep: data.sleep[index] * 10,
    meditation: data.meditation[index],
    stress: data.stress[index]
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="mood" stroke="#3B82F6" />
        <Line type="monotone" dataKey="sleep" stroke="#8B5CF6" />
        <Line type="monotone" dataKey="meditation" stroke="#10B981" />
        <Line type="monotone" dataKey="stress" stroke="#EF4444" />
      </LineChart>
    </ResponsiveContainer>
  );
}import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ProgressChart({ data }) {
  const chartData = data.mood.map((value, index) => ({
    name: `Day ${index + 1}`,
    mood: value,
    sleep: data.sleep[index] * 10,
    meditation: data.meditation[index],
    stress: data.stress[index]
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="mood" stroke="#3B82F6" />
        <Line type="monotone" dataKey="sleep" stroke="#8B5CF6" />
        <Line type="monotone" dataKey="meditation" stroke="#10B981" />
        <Line type="monotone" dataKey="stress" stroke="#EF4444" />
      </LineChart>
    </ResponsiveContainer>
  );
}