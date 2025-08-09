import React, { useEffect, useMemo, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router';

// Hook: user’s reduced motion preference
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(!!mq?.matches);
    update();
    if (!mq) return;
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update);
    };
  }, []);
  return reduced;
};

const ErrorElement = React.memo(function ErrorElement({
  title = "Oops! Something went wrong",
  message = "We couldn’t find what you’re looking for or an unexpected error occurred.",
  homeTo = "/",
  supportEmail = "support@truenest.com",
  onRetry, // optional: custom retry handler
}) {
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Lazy-load Lottie JSON for better performance
  const [animData, setAnimData] = useState(null);
  useEffect(() => {
    let active = true;
    // Update the path if your JSON lives elsewhere
    import('../assets/Error.json')
      .then((mod) => {
        if (active) setAnimData(mod.default || mod);
      })
      .catch(() => setAnimData(null));
    return () => {
      active = false;
    };
  }, []);

  // Control play/pause based on visibility
  const containerRef = useRef(null);
  const lottieRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!lottieRef.current) return;
        if (entry.isIntersecting) {
          lottieRef.current.play();
        } else {
          lottieRef.current.pause();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Slightly slower speed to reduce CPU usage
  useEffect(() => {
    if (lottieRef.current) {
      try {
        lottieRef.current.setSpeed(0.9);
      } catch {}
    }
  }, [animData]);

  const handleRetry = () => {
    if (typeof onRetry === 'function') {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  // Static icon for reduced motion users
  const StaticIcon = useMemo(
    () => (
      <div className="grid h-40 w-40 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-xl">
        <svg
          width="72"
          height="72"
          viewBox="0 0 24 24"
          className="text-rose-300"
          aria-hidden="true"
        >
          <path
            d="M12 2L2 20h20L12 2z"
            fill="currentColor"
            opacity="0.2"
          />
          <path
            d="M12 8v6m0 3h.01"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    []
  );

  return (
    <section
      ref={containerRef}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className="relative w-11/12 max-w-3xl mx-auto my-10 rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8 backdrop-blur-xl text-slate-100 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)]"
    >
      {/* Subtle background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-rose-500/30 via-fuchsia-500/30 to-indigo-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-500/25 via-sky-500/25 to-emerald-500/25 blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-4 md:gap-6">
        {/* Illustration */}
        <div className="flex items-center justify-center">
          {prefersReducedMotion ? (
            StaticIcon
          ) : animData ? (
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl">
              <Lottie
                lottieRef={lottieRef}
                animationData={animData}
                loop
                autoplay
                className="h-44 w-44 md:h-56 md:w-56"
                aria-label="Error illustration"
                rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
              />
            </div>
          ) : (
            // Skeleton while JSON loads
            <div className="h-44 w-44 md:h-56 md:w-56 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
          )}
        </div>

        {/* Copy */}
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="max-w-prose text-slate-300">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
          >
            Try again
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 5l7 7-7 7M5 12h14" />
            </svg>
          </button>

          <Link
            to={homeTo}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 shadow-lg/10 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Go Home
          </Link>

          <Link
            to={`/help`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 shadow-lg/10 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Help Center
          </Link>
        </div>
      </div>
    </section>
  );
});

export default ErrorElement;