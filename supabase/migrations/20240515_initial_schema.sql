-- Migration: Initial Schema for Mathematical Modeling AI Workbench

-- Profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  avatar_url text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
do $$ begin
  create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
exception when others then null; end $$;
do $$ begin
  create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
exception when others then null; end $$;
do $$ begin
  create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);
exception when others then null; end $$;

-- Modeling Projects table
create table if not exists public.modeling_projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  status text default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.modeling_projects enable row level security;
do $$ begin
  create policy "Users can manage their own projects." on public.modeling_projects
    for all using (auth.uid() = user_id);
exception when others then null; end $$;

-- Modeling Messages table
create table if not exists public.modeling_messages (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.modeling_projects(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  role text check (role in ('user', 'assistant')) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.modeling_messages enable row level security;
do $$ begin
  create policy "Users can manage their own messages." on public.modeling_messages
    for all using (auth.uid() = user_id);
exception when others then null; end $$;

-- Modeling Outputs (Variables, Formulas, etc.)
create table if not exists public.modeling_outputs (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.modeling_projects(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- 'latex', 'mermaid', 'echarts', 'python', 'matlab'
  label text,
  content text not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.modeling_outputs enable row level security;
do $$ begin
  create policy "Users can manage their own outputs." on public.modeling_outputs
    for all using (auth.uid() = user_id);
exception when others then null; end $$;

-- AI Usage Logs
create table if not exists public.ai_usage_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  feature text,
  tokens_used int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.ai_usage_logs enable row level security;
do $$ begin
  create policy "Users can view their own usage." on public.ai_usage_logs
    for select using (auth.uid() = user_id);
exception when others then null; end $$;

-- Trigger for profile creation on sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security modeller;

do $$ begin
  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
exception when others then null; end $$;
