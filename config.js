window.APP_CONFIG = {
  SUPABASE_URL: 'https://gjmanyvncnezurkximxt.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbWFueXZuY25lenVya3hpbXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NjE3MzYsImV4cCI6MjA3NjIzNzczNn0.n1KMgjZCUe2OcGiWl5W6DZEzY_bGh31AMAtS1pHmH6s'
};

window._supaClient = () => {
  if (!window.__s)
    window.__s = supabase.createClient(
      window.APP_CONFIG.SUPABASE_URL,
      window.APP_CONFIG.SUPABASE_ANON_KEY
    );
  return window.__s;
};
