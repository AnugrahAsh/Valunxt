/**
 * The section's footer.
 */
import { rurl } from '@/lib/region';
import { BRAND } from '../data/site';
import type { Locale } from '../lib/types';
import { SocialIcon } from './icons';

const SOCIAL = ['linkedin', 'x', 'youtube', 'instagram'] as const;

export default function Footer({ region }: { region: Locale }) {
  return (
    <footer className="vxn-re-foot new-footer-design">
      <div className="new-footer-wrap">
        {/* Top Section */}
        <div className="new-footer-top">
          <img src="/real-estate/img/brand/valunxt-white.svg" alt="VALUNXT" className="new-footer-logo" />
          <nav className="new-footer-nav">
            <a href={rurl(region, '/real-estate/services')}>Services</a>
            <a href={rurl(region, '/real-estate/about')}>About us</a>
            <a href={rurl(region, '/real-estate/industries')}>Industries</a>
            <a href={rurl(region, '/real-estate/network')}>Network</a>
            <a href={rurl(region, '/real-estate/insights')}>Insights</a>
          </nav>
        </div>

        {/* Separator */}
        <hr className="new-footer-divider" />

        {/* Middle Section */}
        <div className="new-footer-middle">
          <p className="new-footer-text">
            We are a senior team of accountants, tax advisers and valuers bringing accounting and tax, transactions, mortgages, valuation, research and technology together under one accountable partner — so every number you act on holds up to scrutiny.
          </p>
          <div className="new-footer-social">
            {SOCIAL.map((n) => (
              <a key={n} href={`#${n}`} aria-label={n}>
                <SocialIcon network={n} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="new-footer-bottom-links">
          <a href={rurl(region, '/real-estate/terms')}>Terms &amp; conditions</a>
          <a href={rurl(region, '/real-estate/privacy')}>Privacy policy</a>
          <a href={rurl(region, '/real-estate/disclaimer')}>Disclaimer</a>
          <a href={rurl(region, '/real-estate/contact')}>Contact us</a>
          <a href="mailto:contact@valunxt.com">contact@valunxt.com</a>
        </div>

        {/* Bottom-most Section */}
        <div className="new-footer-bottom">
          <p className="new-footer-copyright">
            © {new Date().getFullYear()} VALUNXT. All rights reserved.
          </p>
          <a
            href="#"
            className="new-footer-scroll-top"
            aria-label="Scroll to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        .new-footer-design {
          background-color: #1436D8;
          color: #fff;
          padding: 120px 0 40px;
          font-family: "Helvetica", system-ui, -apple-system, sans-serif;
        }
        .new-footer-wrap {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 40px clamp(20px, 4vw, 52px);
          display: flex;
          flex-direction: column;
        }
        .new-footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 35px;
        }
        .new-footer-logo {
          height: 38px;
          width: auto;
        }
        .new-footer-nav {
          display: flex;
          gap: 40px;
        }
        .new-footer-nav a {
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: opacity 0.3s ease;
        }
        .new-footer-nav a:hover {
          opacity: 0.8;
        }
        .new-footer-divider {
          border: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.25);
          margin: 0 0 40px 0;
          width: 100%;
        }
        .new-footer-middle {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 70px;
          gap: 40px;
        }
        .new-footer-text {
          max-width: 820px;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
        }
        .new-footer-social {
          display: flex;
          gap: 25px;
          margin-top: 5px;
        }
        .new-footer-social a {
          color: #fff;
          transition: transform 0.3s ease, opacity 0.3s ease;
          display: grid;
          place-items: center;
        }
        .new-footer-social a:hover {
          transform: translateY(-2px);
          opacity: 0.8;
        }
        .new-footer-social svg {
          width: 24px;
          height: 24px;
        }
        .new-footer-bottom-links {
          display: flex;
          gap: 45px;
          margin-bottom: 40px;
        }
        .new-footer-bottom-links a {
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          opacity: 0.9;
          transition: opacity 0.3s ease;
        }
        .new-footer-bottom-links a:hover {
          opacity: 1;
          text-decoration: underline;
        }
        .new-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .new-footer-copyright {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }
        .new-footer-scroll-top {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          color: #1436D8;
          text-decoration: none;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .new-footer-scroll-top:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
        @media (max-width: 900px) {
          .new-footer-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 35px;
          }
          .new-footer-nav {
            flex-wrap: wrap;
            gap: 24px;
          }
          .new-footer-middle {
            flex-direction: column;
          }
          .new-footer-bottom-links {
            flex-wrap: wrap;
            gap: 20px;
          }
        }
      `}} />
    </footer>
  );
}

