import HeroActions from "./HeroActions";
import { heroContent } from "@/data/hero";

const STAT_NUMBERS = {
  experience: "1+",
  projects: "5+",
} as const;

const HeroSection = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">
              <span className="greeting-text" data-lang="en">
                {heroContent.en.greeting}
              </span>
              <span className="greeting-text" data-lang="id">
                {heroContent.id.greeting}
              </span>
            </div>

            <h1 className="hero-title">
              <span className="title-name">Arizal</span>
              <span className="title-role" data-lang="en">
                {heroContent.en.role}
              </span>
              <span className="title-role" data-lang="id">
                {heroContent.id.role}
              </span>
              <span className="title-specialization">
                <span data-lang="en">
                  {heroContent.en.specialization}
                </span>{" "}
                <span className="accent-text" data-lang="en">
                  {heroContent.en.aiWorkflows}
                </span>
                <span data-lang="id">
                  {heroContent.id.specialization}{" "}
                  <span className="accent-text">{heroContent.id.aiWorkflows}</span>
                </span>
              </span>
            </h1>

            <p className="hero-description" data-lang="en">
              {heroContent.en.description}
            </p>
            <p className="hero-description" data-lang="id">
              {heroContent.id.description}
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{STAT_NUMBERS.experience}</span>
                <span className="stat-label" data-lang="en">
                  {heroContent.en.stats.experience}
                </span>
                <span className="stat-label" data-lang="id">
                  {heroContent.id.stats.experience}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{STAT_NUMBERS.projects}</span>
                <span className="stat-label" data-lang="en">
                  {heroContent.en.stats.projects}
                </span>
                <span className="stat-label" data-lang="id">
                  {heroContent.id.stats.projects}
                </span>
              </div>
            </div>

            <HeroActions />
          </div>

          <div className="hero-image">
            <div className="image-container">
              <div className="profile-image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-avatar">
                    <span>AW</span>
                  </div>
                  <div className="floating-elements" aria-hidden="true">
                    <div className="floating-element element-1"></div>
                    <div className="floating-element element-2"></div>
                    <div className="floating-element element-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
