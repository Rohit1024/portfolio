# Rohit Kharche — Personal Portfolio & Blog

A high-performance, modern, and beautifully designed personal portfolio and blog site built with Astro, React, TypeScript, and Tailwind CSS. 

---

## 📌 GitHub Repository Configuration

To optimize your repository on GitHub, configure the repository metadata as follows:

* **Repository Description**: 
  > Personal portfolio and blog website featuring DevOps, Cloud Architecture, GKE, CI/CD, and web engineering. Built with Astro, React, TypeScript, and Tailwind CSS.
* **Topics (Keywords)**: 
  `astro`, `react`, `typescript`, `tailwindcss`, `portfolio`, `blog`, `gcp`, `gke`, `cloud-build`, `devops`, `cicd`, `firebase-hosting`

---

## 🚀 Key Features

* **Advanced Markdown & MDX**: Full MDX compilation supporting custom Astro/React components, math equations ($\LaTeX$ via KaTeX), checklists, and responsive layouts.
* **Premium Code Blocks (Expressive Code)**: Custom editor frames featuring file title tabs, interactive code collapsing, syntax highlighting, line focus, and copy-to-clipboard actions.
* **Interactive Mermaid Diagrams**: Native workflows and flowcharts rendered dynamically using `astro-mermaid`.
* **Dynamic Tech Icons**: Automatically maps blog and project tags (e.g. `gcp`, `gke`, `react`, `tailwindcss`) to Devicon stylesheet CSS classes to display visual tags.
* **Sleek Custom Brand Identity**: Custom vector flower SVG logo (`favicon.svg`) and high-resolution `favicon-96x96.png` assets.
* **CI/CD Pipeline**: Cloud Build setup (`cloudbuild.yaml`) for automated static compilation and deployment to Firebase Hosting.

---

## 🛠️ Technology Stack

* **Core Framework**: [Astro v5](https://astro.build/) (Static Site Generation)
* **UI Components**: [React v19](https://react.dev/) & [shadcn/ui](https://ui.shadcn.com/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS variables
* **Icons**: [Devicon font-awesome pack](https://devicon.dev/) & [Lucide icons](https://lucide.dev/)
* **Package Manager / Runtime**: [Bun](https://bun.sh/)
* **Hosting**: [Firebase Hosting](https://firebase.google.com/docs/hosting)
* **CI/CD**: [Google Cloud Build](https://cloud.google.com/build)

---

## 💻 Local Development

### 1. Install Dependencies
```bash
bun install
```

### 2. Start the Development Server
```bash
bun run dev
```

### 3. Run Static Type Checking
```bash
bun run typecheck
```

### 4. Build for Production
Compiles the static files and writes the output to the `dist/` directory:
```bash
bun run build
```

### 5. Preview Production Build Locally
```bash
bun run preview
```

---

## 📦 Deployment Configuration

* **Firebase Configuration**: Set up via [firebase.json](file:///Users/rohitkharche/Astro/portfolio/firebase.json) and [.firebaserc](file:///Users/rohitkharche/Astro/portfolio/.firebaserc), directing deployments to the `rohitkharche` hosting target within the `sidekick-1024` GCP project.
* **Build Pipeline**: Specified in [cloudbuild.yaml](file:///Users/rohitkharche/Astro/portfolio/cloudbuild.yaml) which executes dependency installation, compiles the Astro static distribution, and deploys it automatically on commit.
