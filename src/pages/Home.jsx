import Hero from '../components/hero/Hero';
import SatelliteTimeline from '../components/hero/SatelliteTimeline';
import MissionSection from '../components/mission/MissionSection';
import ProjectsShowcase from '../components/projects/ProjectsShowcase';
import TeamShowcase from '../components/team/TeamShowcase';
import InsightsSection from '../components/insights/InsightsSection';
import SponsorshipSection from '../components/sponsorship/SponsorshipSection';

export default function Home() {
  return (
    <>
      <Hero />
      <SatelliteTimeline />
      <MissionSection />
      <ProjectsShowcase />
      <TeamShowcase />
      <InsightsSection />
      <SponsorshipSection />
    </>
  );
}
