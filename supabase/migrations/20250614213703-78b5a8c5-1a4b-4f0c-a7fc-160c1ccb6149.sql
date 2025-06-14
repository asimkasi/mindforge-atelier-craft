
-- Table for storing app ideas submitted by users
create table if not exists public.app_ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamp with time zone not null default now()
);

-- Table for storing structured outputs for each agent and phase
create table if not exists public.agent_outputs (
  id uuid primary key default gen_random_uuid(),
  app_idea_id uuid references app_ideas(id) on delete cascade,
  agent_name text not null,
  phase text not null,
  content text not null,
  created_at timestamp with time zone not null default now()
);

-- Table for application/project event logs
create table if not exists public.project_logs (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  log_level text not null default 'info',
  created_at timestamp with time zone not null default now()
);

-- (Optional) Enable row level security (RLS) if you plan to add auth:
-- alter table app_ideas enable row level security;
-- alter table agent_outputs enable row level security;
-- alter table project_logs enable row level security;

