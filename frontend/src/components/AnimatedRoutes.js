import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Home from '../pages/Home'
import Stats from '../pages/Stats'

const AnimatedRoutes = () => {

    const location = useLocation()

    return(
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={<Home />}
                    />
                <Route
                    path="/Stats"
                    element={<Stats />}
                    />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes