// src/pages/FraudBlocked.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router';

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { y: 14, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const FraudBlocked = () => {
  const navigate = useNavigate();
  const supportEmail = 'support@truenest.com';

  return (
    <main className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden bg-slate-950 text-slate-100">
      {/* Animated gradient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-rose-500/40 via-fuchsia-500/40 to-indigo-500/40 blur-3xl"
        animate={{ x: [0, 10, -10, 0], y: [0, 10, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-cyan-500/30 via-sky-500/30 to-violet-500/30 blur-3xl"
        animate={{ x: [0, -12, 12, 0], y: [0, -8, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px, 32px 32px',
          backgroundPosition: '-1px -1px, -1px -1px',
        }}
      />

      {/* Content */}
      <section className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-6xl items-center justify-center px-4 py-16">
        <motion.div
          className="relative w-full max-w-2xl rounded-3xl p-[1px] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          style={{
            background:
              'linear-gradient(120deg, rgba(244,63,94,.5), rgba(99,102,241,.35), rgba(20,184,166,.45))',
          }}
        >
          {/* Glass card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl">
            {/* Shimmer line */}
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                className="absolute -left-1/2 top-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-50%', '50%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="relative z-10 px-8 py-10 md:px-12 md:py-12"
            >
              {/* Icon */}
              <motion.div
                variants={item}
                className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-2xl"
                animate={{
                  rotate: [-2.5, 2.5, -2.5],
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
                    fill="url(#g1)"
                    opacity="0.18"
                  />
                  <path
                    d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
                    stroke="url(#g2)"
                    strokeWidth="1.4"
                    fill="none"
                  />
                  <path
                    d="M9 9l6 6M15 9l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity=".9" />
                      <stop offset="100%" stopColor="#fff" stopOpacity=".5" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Badge */}
              <motion.div variants={item} className="mb-3 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-rose-400/10 px-3 py-1 text-[12px] font-medium tracking-wide text-rose-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
                  </span>
                  Access restricted
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={item}
                className="text-center text-2xl font-bold tracking-tight text-white md:text-3xl"
              >
                You can’t add properties right now
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={item}
                className="mx-auto mt-3 max-w-lg text-center text-slate-300/90"
              >
                Your account is currently marked as fraud. If you believe this is a mistake,
                please contact support or your admin to request a review.
              </motion.p>

              {/* Status chips */}
              <motion.div
                variants={item}
                className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2"
              >
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  Fraud flag: Active
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  Add Property: Disabled
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  Appeal available
                </span>
              </motion.div>

              {/* Actions */}
              <motion.div
                variants={item}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                {/* Replaced <a> with <Link> */}
                <Link
                  to={`mailto:${supportEmail}?subject=Appeal%20Fraud%20Decision&body=Hello%20TrueNest%20Team%2C%0D%0A%0D%0AMy%20account%20seems%20to%20be%20flagged%20as%20fraud.%20Please%20review%20my%20status.%0D%0A%0D%0AThanks.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
                  aria-label="Contact support via email"
                >
                  Contact support
                  <svg
                    className="transition-transform group-hover:translate-x-0.5"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13 5l7 7-7 7M5 12h14" />
                  </svg>
                </Link>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 shadow-lg/10 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  Back to dashboard
                </button>
              </motion.div>

              {/* Help text */}
              <motion.p
                variants={item}
                className="mt-6 text-center text-xs text-slate-400"
              >
                Need help urgently? Visit our
                <Link
                  to="/help"
                  className="ml-1 underline decoration-rose-400/60 underline-offset-4 hover:text-slate-200"
                >
                  Help Center
                </Link>
                .
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default FraudBlocked;