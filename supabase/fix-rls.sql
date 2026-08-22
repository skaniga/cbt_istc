-- Fix RLS Policies because we bypassed Supabase Auth (Anon user needs access)
DROP POLICY IF EXISTS "participants_select_auth" ON public.participants;
CREATE POLICY "participants_select_auth" ON public.participants FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "exam_sessions_all_auth" ON public.exam_sessions;
CREATE POLICY "exam_sessions_all_auth" ON public.exam_sessions FOR ALL TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "answers_all_auth" ON public.answers;
CREATE POLICY "answers_all_auth" ON public.answers FOR ALL TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "system_config_update_auth" ON public.system_config;
CREATE POLICY "system_config_update_auth" ON public.system_config FOR UPDATE TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "questions_all_auth" ON public.questions;
CREATE POLICY "questions_all_auth" ON public.questions FOR ALL TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "documents_all_auth" ON public.documents;
CREATE POLICY "documents_all_auth" ON public.documents FOR ALL TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "winners_all_auth" ON public.winners;
CREATE POLICY "winners_all_auth" ON public.winners FOR ALL TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "venues_all_auth" ON public.venues;
CREATE POLICY "venues_all_auth" ON public.venues FOR ALL TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "annual_events_all_auth" ON public.annual_events;
CREATE POLICY "annual_events_all_auth" ON public.annual_events FOR ALL TO anon, authenticated USING (true);
