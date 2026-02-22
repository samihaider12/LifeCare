import Hero from "./HeroSection";
import Certification from './Certification';
import MedicalTeam from './MedicalTeam';
import VoiceOfTrust from './VoiceOfTrust';
import { Box } from "@mui/material";
// import { useMedicalStore } from '../../store/useMedicalStore';


const Home = () => {
  // const { doctors } = useMedicalStore();

  return (
    <>
      <Hero />
      <Certification />
        <Box>
          <MedicalTeam  />
        </Box>
      <VoiceOfTrust />
    </>
  )
}

export default Home;
