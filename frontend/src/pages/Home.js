import HomeBackgroundImage from '../components/HomeBackgroundImage'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Stage, PresentationControls } from '@react-three/drei'
import About from '../components/About'
import { motion } from 'framer-motion'

function Model(props) {
  const { scene } = useGLTF("/alarm_clock.glb");
  return <primitive object={scene} {...props}/>
}

const Home = () => {
  return (
    <motion.div initial={{width: 0}} animate={{width: '100%'}} exit={{x: window.innerWidth}}>
      <div className="absolute right-[12rem] top-0 h-screen w-[45rem] z-10">
      <Canvas dpr={[1,2]} shadows camera={{fov:80}}> 
        <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI/4]}>
          <Stage environment={"warehouse"}>
            <Model scale={0.12}/>
          </Stage>
        </PresentationControls>
      </Canvas>
      </div>
      <HomeBackgroundImage/>  
      <About/>
    </motion.div> 
  );
}

export default Home;