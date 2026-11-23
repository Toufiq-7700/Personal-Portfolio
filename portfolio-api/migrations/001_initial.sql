-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Admin users
-- ============================================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Sessions (server-side, stored in DB)
-- ============================================================
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_admin_id ON sessions(admin_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- ============================================================
-- Projects
-- ============================================================
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_desc TEXT,
    long_desc TEXT,
    category VARCHAR(100),
    badge VARCHAR(100),
    github_url TEXT,
    demo_url TEXT,
    thumbnail_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_sort_order ON projects(sort_order);

CREATE TABLE project_tags (
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL,
    PRIMARY KEY (project_id, tag)
);

CREATE TABLE project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT,
    sort_order INT NOT NULL DEFAULT 0
);

-- ============================================================
-- Skill categories
-- ============================================================
CREATE TABLE skill_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    sort_order INT NOT NULL DEFAULT 0
);

-- ============================================================
-- Skills
-- ============================================================
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES skill_categories(id) ON DELETE SET NULL,
    tag VARCHAR(100),
    description TEXT,
    level SMALLINT NOT NULL DEFAULT 0 CHECK (level BETWEEN 0 AND 100),
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_skills_category ON skills(category_id);
CREATE INDEX idx_skills_published ON skills(is_published);

-- ============================================================
-- Achievements
-- ============================================================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE,
    icon TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Education
-- ============================================================
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field VARCHAR(255),
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    gpa VARCHAR(20),
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Experience
-- ============================================================
CREATE TABLE experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN NOT NULL DEFAULT false,
    description TEXT,
    location VARCHAR(255),
    exp_type VARCHAR(50) DEFAULT 'work' CHECK (exp_type IN ('work','internship','volunteer','activity')),
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Research / Publications
-- ============================================================
CREATE TABLE research (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    authors TEXT,
    publication VARCHAR(255),
    year INT,
    url TEXT,
    doi TEXT,
    abstract_text TEXT,
    status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('published','preprint','under_review','in_progress')),
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Certifications
-- ============================================================
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    issue_date DATE,
    expiry_date DATE,
    credential_id VARCHAR(255),
    credential_url TEXT,
    image_url TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Media assets
-- ============================================================
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    url TEXT NOT NULL,
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    bucket VARCHAR(255),
    key TEXT,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Seed initial skill categories
-- ============================================================
INSERT INTO skill_categories (name, sort_order) VALUES
    ('Languages', 0),
    ('Web & DB', 1),
    ('Python Libraries', 2),
    ('Core Strength', 3);

-- ============================================================
-- Seed sample data from existing portfolio
-- ============================================================
-- Skills
INSERT INTO skills (name, category_id, tag, description, level, sort_order, is_published) VALUES
    ('Rust', (SELECT id FROM skill_categories WHERE name='Languages'), 'Systems', 'Systems programming, memory safety, WebAssembly compilation, and high-performance backend development.', 80, 0, true),
    ('Python', (SELECT id FROM skill_categories WHERE name='Languages'), 'AI/ML', 'Data science, machine learning, automation, scripting, and AI model development.', 88, 1, true),
    ('C/C++', (SELECT id FROM skill_categories WHERE name='Languages'), 'Systems', 'Competitive programming, algorithms, data structures, and low-level systems programming.', 82, 2, true),
    ('Java', (SELECT id FROM skill_categories WHERE name='Languages'), 'OOP', 'Object-oriented programming, algorithms, and enterprise application development.', 75, 3, true),
    ('JavaScript', (SELECT id FROM skill_categories WHERE name='Web & DB'), 'Frontend', 'DOM manipulation, ES6+, async programming, and interactive web interfaces.', 85, 0, true),
    ('TypeScript', (SELECT id FROM skill_categories WHERE name='Web & DB'), 'Typed JS', 'Type-safe JavaScript for scalable, maintainable web applications and backends.', 78, 1, true),
    ('PHP', (SELECT id FROM skill_categories WHERE name='Web & DB'), 'Backend', 'Server-side scripting, REST APIs, and backend web application development.', 82, 2, true),
    ('HTML & CSS', (SELECT id FROM skill_categories WHERE name='Web & DB'), 'Markup', 'Semantic HTML5, modern CSS3, flexbox/grid layouts, and responsive design.', 90, 3, true),
    ('MySQL', (SELECT id FROM skill_categories WHERE name='Web & DB'), 'Database', 'Relational database design, queries, indexing, and data management.', 83, 4, true),
    ('NumPy', (SELECT id FROM skill_categories WHERE name='Python Libraries'), 'Data', 'Numerical computing, array operations, linear algebra, and mathematical computations.', 85, 0, true),
    ('Pandas', (SELECT id FROM skill_categories WHERE name='Python Libraries'), 'Data', 'Data manipulation, cleaning, analysis and working with structured datasets.', 83, 1, true),
    ('scikit-learn', (SELECT id FROM skill_categories WHERE name='Python Libraries'), 'ML', 'Machine learning models, classification, regression, clustering, and model evaluation.', 78, 2, true),
    ('Problem Solving & DSA', (SELECT id FROM skill_categories WHERE name='Core Strength'), 'Competitive', 'Algorithmic thinking, data structures, complexity analysis, and competitive programming.', 90, 0, true),
    ('Figma', (SELECT id FROM skill_categories WHERE name='Core Strength'), 'Design', 'UI/UX design, prototyping, component design and wireframing for web applications.', 72, 1, true);

-- Projects
INSERT INTO projects (title, slug, short_desc, long_desc, category, badge, github_url, demo_url, thumbnail_url, is_featured, status, sort_order) VALUES
    ('AuraLink', 'auralink', 'A web platform focused on emotional expression and connection.', 'AuraLink enables users to share moods, build empathetic communities, and visualise emotional trends. Features mood tracking, community forums, and analytics dashboards.', 'Full-Stack', 'Web Platform', 'https://github.com/Toufiq-7700/AuraLink', NULL, '/assets/projects/P1.webp', true, 'published', 0),
    ('CompeteX', 'competex', 'A competitive programming and exam platform.', 'CompeteX is built to handle advanced competitive programming tasks. Features real-time contest management, automated grading, and leaderboard analytics.', 'Full-Stack', 'Platform', 'https://github.com/Toufiq-7700/CompeteX', NULL, '/assets/projects/P2.webp', true, 'published', 1),
    ('UIU Research Hub', 'uiu-research-hub', 'A web platform for centralizing university research activities.', 'UIU Research Hub streamlines paper submissions, faculty collaboration, and research tracking for United International University.', 'Full-Stack', 'Academic', 'https://github.com/Toufiq-7700/UIU-Research-Hub', NULL, '/assets/projects/P3.webp', false, 'published', 2),
    ('SmartWallet', 'smartwallet', 'A personal finance app to track monthly expenses and manage budgets.', 'SmartWallet provides visual analytics, category breakdowns, and monthly summaries to help users manage personal finances effectively.', 'Full-Stack', 'Finance App', 'https://github.com/Toufiq-7700/toufiq', 'https://myfreewallet.infinityfree.me/', '/assets/projects/P4.webp', false, 'published', 3);

-- Project tags
INSERT INTO project_tags (project_id, tag) VALUES
    ((SELECT id FROM projects WHERE slug='auralink'), 'HTML'),
    ((SELECT id FROM projects WHERE slug='auralink'), 'CSS'),
    ((SELECT id FROM projects WHERE slug='auralink'), 'JavaScript'),
    ((SELECT id FROM projects WHERE slug='auralink'), 'PHP'),
    ((SELECT id FROM projects WHERE slug='auralink'), 'MySQL'),
    ((SELECT id FROM projects WHERE slug='competex'), 'TypeScript'),
    ((SELECT id FROM projects WHERE slug='competex'), 'PHP'),
    ((SELECT id FROM projects WHERE slug='competex'), 'MySQL'),
    ((SELECT id FROM projects WHERE slug='uiu-research-hub'), 'HTML'),
    ((SELECT id FROM projects WHERE slug='uiu-research-hub'), 'CSS'),
    ((SELECT id FROM projects WHERE slug='uiu-research-hub'), 'JavaScript'),
    ((SELECT id FROM projects WHERE slug='uiu-research-hub'), 'PHP'),
    ((SELECT id FROM projects WHERE slug='smartwallet'), 'PHP'),
    ((SELECT id FROM projects WHERE slug='smartwallet'), 'SQL'),
    ((SELECT id FROM projects WHERE slug='smartwallet'), 'JavaScript'),
    ((SELECT id FROM projects WHERE slug='smartwallet'), 'HTML'),
    ((SELECT id FROM projects WHERE slug='smartwallet'), 'CSS');

-- Education
INSERT INTO education (institution, degree, field, start_date, is_current, description, sort_order, is_published) VALUES
    ('United International University', 'B.Sc.', 'Computer Science and Engineering', '2022-01-01', true, 'Studying Computer Science and Engineering with focus on AI, Machine Learning, and Software Development. Expected graduation 2027.', 0, true);

-- Achievements
INSERT INTO achievements (title, description, sort_order, is_published) VALUES
    ('25th Place — Coders Combat', 'Achieved 25th place in Coders Combat competitive programming contest.', 0, true),
    ('7th Place — Book Reading Competition', 'Ranked 7th among 300+ participants in university book reading competition.', 1, true);
