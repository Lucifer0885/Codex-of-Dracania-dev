import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router'
import Home from '@pages/Home'
import MainLayout from '@layouts/MainLayout'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MainLayout>
  </HashRouter>
)
