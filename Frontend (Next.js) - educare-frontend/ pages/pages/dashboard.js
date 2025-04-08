import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Dashboard() {
  const { data: recommendations, error } = useSWR('/api/recommendations');
  const [learningStyle, setLearningStyle] = useState(null);

  // Adaptive UI based on learning style
  if (learningStyle === 'visual') {
    return <VisualDashboard recommendations={recommendations} />;
  }
  if (learningStyle === 'auditory') {
    return <AudioDashboard recommendations={recommendations} />;
  }
  return <DefaultDashboard recommendations={recommendations} />;
}

function VisualDashboard({ recommendations }) {
  return (
    <div className="visual-layout">
      {recommendations.map(item => (
        <Card key={item.id} 
              image={item.thumbnail} 
              title={item.title}
              progress={item.matchScore} />
      ))}
    </div>
  );
}
