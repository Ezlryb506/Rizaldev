const description =
  "Portfolio of Arizal Winangun, a fullstack/frontend developer delivering fast, SEO-friendly websites built with Next.js, React, and TypeScript. Available for company profile, landing page, ecommerce, and custom web app projects.";

const keywords = [
  "Arizal Winangun",
  "Fullstack Developer",
  "Frontend Developer",
  "Jasa pembuatan website",
  "Web developer Indonesia",
  "Next.js",
  "React",
  "TypeScript",
  "Portfolio",
].join(", ");

export default function Head() {
  return (
    <>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </>
  );
}
