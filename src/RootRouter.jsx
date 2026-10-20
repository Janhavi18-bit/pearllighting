import React, { useState, useEffect, useRef } from 'react'
import AppleSeripLuxuryLanding from './components/AppleSeripLuxuryLanding.jsx'
import PearlEditorialHomepage from './editorial_reference/PearlEditorialHomepage.jsx'
import PearlExperienceApp from './experience/PearlExperienceApp.jsx'
import FestiveLightingPage from './components/FestiveLightingPage.jsx'

export default function RootRouter() {
  const getRoute = () => {
    const path = window.location.pathname.toLowerCase()
    const search = new URLSearchParams(window.location.search)

    if (path.includes('/collage') || search.has('collage')) {
      return 'collage'
    }
    if (path.includes('/dark-experience') || search.has('dark')) {
      return 'dark-experience'
    }
    if (path.includes('/festive') || search.has('festive') || path.includes('/festive-collection')) {
      return 'festive'
    }
    return 'luxury-landing'
  }

  const [currentRoute, setCurrentRoute] = useState(getRoute)
  const savedHomeScrollRef = useRef(null)
  const pendingRestoreScrollRef = useRef(null)
  const activeRestorationCancelRef = useRef(null)

  // Robust multi-pass scroll restoration helper that handles React paint & image loading
  const restoreScrollPosition = (targetY) => {
    if (targetY === null || targetY === undefined || isNaN(targetY) || targetY < 0) return

    // Cancel any previous restoration in flight
    if (activeRestorationCancelRef.current) {
      activeRestorationCancelRef.current()
      activeRestorationCancelRef.current = null
    }

    let cancelled = false
    const cancel = () => {
      cancelled = true
      cleanup()
    }

    let resizeObserver = null

    const cleanup = () => {
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
      window.removeEventListener('touchmove', cancel)
      window.removeEventListener('keydown', onKeyDown)
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }
      if (activeRestorationCancelRef.current === cancel) {
        activeRestorationCancelRef.current = null
      }
    }

    const onKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End'].includes(e.code)) {
        cancel()
      }
    }

    activeRestorationCancelRef.current = cancel

    window.addEventListener('wheel', cancel, { passive: true })
    window.addEventListener('touchstart', cancel, { passive: true })
    window.addEventListener('touchmove', cancel, { passive: true })
    window.addEventListener('keydown', onKeyDown, { passive: true })

    try {
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          if (!cancelled) {
            applyScroll()
          }
        })
        resizeObserver.observe(document.documentElement)
      }
    } catch (e) {}

    let attempts = 0
    let stableFrames = 0
    const maxAttempts = 30

    const applyScroll = () => {
      if (cancelled) return
      attempts++

      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const clampedTarget = Math.min(targetY, maxScroll)

      window.scrollTo({ top: clampedTarget, left: 0, behavior: 'instant' })

      if (maxScroll >= targetY) {
        stableFrames++
        if (stableFrames >= 3) {
          cleanup()
          return
        }
      }

      if (attempts < maxAttempts) {
        if (maxScroll < targetY) {
          setTimeout(applyScroll, 50)
        } else {
          requestAnimationFrame(applyScroll)
        }
      } else {
        cleanup()
      }
    }

    requestAnimationFrame(applyScroll)

    // Handle asynchronous image loading on landing page
    const pendingImages = Array.from(document.querySelectorAll('img')).filter(img => !img.complete)
    pendingImages.forEach(img => {
      const onImgFinish = () => {
        if (!cancelled) {
          const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
          window.scrollTo({ top: Math.min(targetY, maxScroll), left: 0, behavior: 'instant' })
        }
      }
      img.addEventListener('load', onImgFinish, { once: true })
      img.addEventListener('error', onImgFinish, { once: true })
    })

    setTimeout(cleanup, 2000)
  }

  // Manage browser scrollRestoration and popstate navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handlePopState = (event) => {
      if (activeRestorationCancelRef.current) {
        activeRestorationCancelRef.current()
        activeRestorationCancelRef.current = null
      }

      const nextRoute = getRoute()
      setCurrentRoute(nextRoute)

      if (nextRoute === 'luxury-landing') {
        let targetY = null
        if (event?.state?.homeScrollY !== undefined && event.state.homeScrollY !== null) {
          targetY = event.state.homeScrollY
        } else if (savedHomeScrollRef.current !== null && savedHomeScrollRef.current !== undefined) {
          targetY = savedHomeScrollRef.current
        } else {
          try {
            const raw = sessionStorage.getItem('pearl_home_scroll_pos')
            if (raw !== null && raw !== '' && !isNaN(Number(raw))) {
              targetY = Number(raw)
            }
          } catch (e) {}
        }

        if (targetY !== null && targetY !== undefined && targetY >= 0 && !window.location.hash) {
          pendingRestoreScrollRef.current = targetY
          restoreScrollPosition(targetY)
        }
      } else if (nextRoute === 'festive') {
        if (!window.location.hash) {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Whenever returning to luxury-landing with a pending restoration target
  useEffect(() => {
    if (currentRoute === 'luxury-landing' && pendingRestoreScrollRef.current !== null) {
      const targetY = pendingRestoreScrollRef.current
      pendingRestoreScrollRef.current = null
      restoreScrollPosition(targetY)
    }
  }, [currentRoute])

  const navigateToLanding = (anchor = '') => {
    if (activeRestorationCancelRef.current) {
      activeRestorationCancelRef.current()
      activeRestorationCancelRef.current = null
    }

    if (anchor) {
      savedHomeScrollRef.current = null
      pendingRestoreScrollRef.current = null
      try {
        sessionStorage.removeItem('pearl_home_scroll_pos')
      } catch (e) {}

      window.history.pushState({}, '', '/' + `#${anchor}`)
      setCurrentRoute('luxury-landing')
      setTimeout(() => {
        const el = document.getElementById(anchor)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    }

    // Retrieve saved scroll position
    let targetY = savedHomeScrollRef.current
    if (targetY === null || targetY === undefined) {
      try {
        const raw = sessionStorage.getItem('pearl_home_scroll_pos')
        if (raw !== null && raw !== '' && !isNaN(Number(raw))) {
          targetY = Number(raw)
        }
      } catch (e) {}
    }

    // Consume the saved position for subsequent navigations
    savedHomeScrollRef.current = null
    try {
      sessionStorage.removeItem('pearl_home_scroll_pos')
    } catch (e) {}

    window.history.pushState(
      targetY !== null && targetY !== undefined ? { homeScrollY: targetY } : {},
      '',
      '/'
    )
    setCurrentRoute('luxury-landing')

    if (targetY !== null && targetY !== undefined && targetY >= 0) {
      pendingRestoreScrollRef.current = targetY
      restoreScrollPosition(targetY)
    } else {
      pendingRestoreScrollRef.current = null
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  const navigateToFestive = () => {
    if (activeRestorationCancelRef.current) {
      activeRestorationCancelRef.current()
      activeRestorationCancelRef.current = null
    }

    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
    savedHomeScrollRef.current = scrollY
    try {
      sessionStorage.setItem('pearl_home_scroll_pos', String(scrollY))
      window.history.replaceState(
        { ...window.history.state, homeScrollY: scrollY },
        '',
        window.location.href
      )
    } catch (e) {}

    window.history.pushState({ festive: true }, '', '/festive-collection')
    setCurrentRoute('festive')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const navigateToCollage = () => {
    window.history.pushState({}, '', '/collage')
    setCurrentRoute('collage')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {currentRoute === 'collage' ? (
        <PearlEditorialHomepage onBackToModern={navigateToLanding} />
      ) : currentRoute === 'dark-experience' ? (
        <PearlExperienceApp onSwitchToOriginal={navigateToLanding} />
      ) : currentRoute === 'festive' ? (
        <FestiveLightingPage onNavigateToLanding={navigateToLanding} />
      ) : (
        /* The Modern Luxury Landing Page: Apple Minimalism x Serip Organic Elegance */
        <AppleSeripLuxuryLanding
          onSwitchToCollage={navigateToCollage}
          onNavigateToFestive={navigateToFestive}
        />
      )}
    </>
  )
}
