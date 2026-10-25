export const TAGLINE = 'Building intelligent AI systems — from climate-risk models to paper-publishability predictors.';

export const TICKER_ITEMS = [
    'PYTHON', 'MACHINE LEARNING', 'GENERATIVE AI', 'DATA SCIENCE', 'FASTAPI',
    'NLP', 'XGBOOST', 'LANGGRAPH', 'STREAMLIT', 'SQL', 'N8N', 'SHAP', 'RAG', 'PYTORCH-FREE VIBES',
];

export const ACHIEVEMENTS = {
    'first-window': { title: 'HELLO WORLD', desc: 'Open your first window' },
    night: { title: 'NIGHT OWL', desc: 'Discover night mode' },
    trash: { title: 'CLEAN SLATE', desc: 'Empty the rejected concepts' },
    girl: { title: 'NEW FRIEND', desc: 'Say hi to pixel Stuti' },
    cat: { title: 'CAT PERSON', desc: 'Find the pixel cat' },
    saver: { title: 'TOASTER TIME', desc: 'Let the desktop idle for 45s' },
    konami: { title: 'KONAMI MASTER', desc: '↑↑↓↓←→←→ B A' },
};

export const PROJECTS = [
    {
        id: 'climate-guardian',
        title: 'Climate Guardian AI',
        subtitle: 'Agent-driven climate risk intelligence platform',
        tag: 'AutoML • Climate Risk • GenAI',
        metric: '5-model AutoML benchmark, best-performer auto-selected',
        icon: 'earth',
        description:
            'A full-stack platform that ingests environmental telemetry (temperature, humidity, precipitation) and predicts regional outbreak/hazard risk levels. An AutoML pipeline orchestrator trains and benchmarks five models — Logistic Regression, Decision Tree, Random Forest, XGBoost, LightGBM — and auto-selects the best performer.',
        highlights: [
            'Interactive Streamlit command-center: KPI dashboards, correlation heatmaps, 3D cluster visualization, SHAP explainability charts',
            'Conversational AI Risk Assistant via n8n workflow calling a local Ollama LLM',
            'Live weather lookups with the Open-Meteo API and a bcrypt-authenticated SQLite user store',
        ],
        stack: ['Python', 'FastAPI', 'Streamlit', 'Plotly', 'XGBoost', 'LightGBM', 'SHAP', 'n8n', 'Ollama', 'SQLite'],
    },
    {
        id: 'ai-assistant',
        title: 'Personal AI Assistant',
        subtitle: 'End-to-end agentic assistant with tool calling',
        tag: 'ReAct Agent • n8n • LLMs',
        metric: '6 tool categories orchestrated by one ReAct agent',
        icon: 'robot',
        description:
            'An end-to-end agentic personal assistant with a Streamlit chat UI and an n8n webhook-triggered AI agent, supporting session-aware multi-turn conversations via window memory. Six tool categories are wired into a single ReAct agent.',
        highlights: [
            'Tools: web search (SerpAPI), Gmail read/fetch, Google Calendar CRUD, Google Tasks, Google Docs, expense tracking via Sheets',
            'Dual LLM backends — Ollama (local) and Groq (cloud) — with hot-swap capability',
            'REST webhook consumed by the Streamlit frontend for a clean client-server split',
        ],
        stack: ['n8n', 'Ollama', 'Groq', 'Streamlit', 'SerpAPI', 'Google Calendar', 'Gmail', 'Google Tasks', 'Sheets'],
    },
    {
        id: 'publishability-predictor',
        title: 'Research Predictor AI',
        subtitle: 'Research paper publishability prediction',
        tag: 'NLP • XGBoost • Feature Engineering',
        metric: '94.4% test accuracy with XGBoost',
        icon: 'flask',
        description:
            'An ML pipeline that predicts whether a research paper is publishable using 16 engineered features spanning readability, structural indicators, and citation quality.',
        highlights: [
            '94.4% test accuracy achieved with XGBoost',
            'Figures-to-Text Ratio (21.8%) and Title-Abstract Consistency (11.4%) identified as top predictors',
            'Feature extraction pipeline built with PyMuPDF, spaCy, NLTK, and KeyBERT',
        ],
        stack: ['Python', 'XGBoost', 'scikit-learn', 'spaCy', 'NLTK', 'KeyBERT', 'PyMuPDF', 'pandas', 'NumPy'],
    },
];

export const DESKTOP_ICONS = PROJECTS.map((p, i) => ({
    id: p.id,
    title: p.title,
    icon: p.icon,
    x: 32,
    y: 64 + i * 118,
}));

export const DOCK_ITEMS = [
    { id: 'about', label: 'About Me', icon: 'avatar' },
    { id: 'skills', label: 'Skills & Stack', icon: 'terminal' },
    { id: 'projects', label: 'All Projects', icon: 'rocket' },
    { id: 'experience', label: 'Experience', icon: 'briefcase' },
    { id: 'contact', label: 'Contact', icon: 'mail' },
    { id: 'trophy', label: 'Trophy Room', icon: 'trophy' },
    { id: 'trash', label: 'Rejected Concepts', icon: 'trash' },
];

export const SKILLS = [
    { group: 'Languages', items: ['C++', 'Python', 'SQL', 'R', 'Java', 'JavaScript', 'HTML', 'CSS'] },
    { group: 'ML & DL', items: ['Scikit-learn', 'XGBoost', 'LightGBM', 'TensorFlow', 'Feature Engineering', 'NLP', 'SHAP'] },
    { group: 'Data Science', items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Statistical Analysis', 'EDA'] },
    { group: 'GenAI & LLMs', items: ['LLMs', 'Transformers', 'RAG', 'Prompt Engineering', 'ReAct', 'LangChain', 'LangGraph', 'Vector DBs', 'Ollama'] },
    { group: 'Backend & APIs', items: ['FastAPI', 'Pydantic', 'REST APIs', 'Webhooks', 'JSON', 'Streamlit'] },
    { group: 'Automation', items: ['n8n', 'Workflow Automation', 'API Integrations'] },
    { group: 'Databases & Cloud', items: ['SQLite', 'PostgreSQL', 'MySQL', 'AWS Fundamentals'] },
    { group: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Google Colab', 'VS Code', 'Jupyter'] },
];

export const EXPERIENCE = [
    {
        role: 'Design Team Member',
        org: 'Wakhra Punjab Club — VIT Chennai',
        period: '2024 — 2025',
        bullets: [
            'Designed and executed artistic installations for Vibrance 2025, VIT\u2019s annual cultural fest with 30,000+ attendees',
            'Led stage decor and branding in collaboration with cross-functional teams',
        ],
    },
];

export const EDUCATION = {
    school: 'Vellore Institute of Technology, Chennai',
    degree: 'B.Tech — Computer Science & Engineering (Data Science)',
    period: '2023 — 2027',
    cgpa: '8.3 / 10',
};

export const CERTS = [
    'AI-102: Microsoft Azure AI Engineer Associate',
    'Responsive Web Design — freeCodeCamp',
];

export const ABOUT = {
    name: 'Stuti Handa',
    role: 'Data Science Student & AI Builder',
    summary:
        'Data Science B.Tech student at VIT Chennai, passionate about building intelligent AI systems, climate analytics, and predictive ML models with high accuracy and practical impact.',
};

export const PROJECT_GITHUB = {
    'climate-guardian': 'https://github.com/Stutihanda/proj_1',
    'ai-assistant': 'https://github.com/Stutihanda/Personal-AI-Assistant',
    'publishability-predictor': 'https://github.com/Stutihanda/AnalyzeProject',
};

export const CONTACT = {
    email: 'stutihanda6@gmail.com',
    phone: '+91 6239847492',
    linkedin: 'https://www.linkedin.com/in/stuti-handa-a53064290/',
    github: 'https://github.com/Stutihanda',
    location: 'Chennai, Tamil Nadu, India',
};

export const TRASH_ITEMS = [
    { name: 'AI Dog Bark Translator', reason: 'Rejected — the bark dataset was too ruff to label.' },
    { name: 'Quantum Coffee Brewing Predictor', reason: 'Scrapped — overfitted to espresso.' },
    { name: 'Overfitting Prevention Hat', reason: 'Scrapped — the neural nets refused to wear it.' },
    { name: 'Automated Exam Nap Detector', reason: 'Rejected — accuracy dropped during 8 AM lectures.' },
    { name: 'Portfolio v1: Comic Sans Edition', reason: 'Deleted in self-defence.' },
];

export const STUTIOS_INFO = {
    version: '2.4 — pastel edition',
    credit: 'Designed & coded by Stuti Handa',
    specs: ['640K RAM (more than enough)', '100% recycled pixels', 'Zero clouds were harmed', 'Runs on coffee & XGBoost'],
};

export const WINDOW_META = {
    'climate-guardian': { title: 'Climate Guardian AI', icon: 'earth' },
    'ai-assistant': { title: 'Personal AI Assistant', icon: 'robot' },
    'publishability-predictor': { title: 'Research Predictor AI', icon: 'flask' },
    about: { title: 'About Me', icon: 'avatar' },
    skills: { title: 'Skills & Stack', icon: 'terminal' },
    projects: { title: 'All Projects', icon: 'rocket' },
    experience: { title: 'Experience & Education', icon: 'briefcase' },
    contact: { title: 'Contact', icon: 'mail' },
    trophy: { title: 'Trophy Room', icon: 'trophy' },
    stutios: { title: 'About StutiOS', icon: 'heart' },
    trash: { title: 'Rejected Concepts', icon: 'trash' },
};

export const WINDOW_POS = {
    'climate-guardian': { x: 150, y: 60 },
    'ai-assistant': { x: 220, y: 100 },
    'publishability-predictor': { x: 290, y: 80 },
    about: { x: 340, y: 70 },
    skills: { x: 190, y: 80 },
    projects: { x: 260, y: 60 },
    experience: { x: 310, y: 80 },
    contact: { x: 380, y: 100 },
    trophy: { x: 330, y: 90 },
    stutios: { x: 420, y: 120 },
    trash: { x: 430, y: 90 },
};
