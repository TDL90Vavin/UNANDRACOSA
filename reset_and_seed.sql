drop view if exists classifica;
drop table if exists pronostici cascade;
drop table if exists partite cascade;
create table partite(id bigint generated always as identity primary key,giornata int,casa text,trasferta text,risultato_reale text,over_under_reale text);
create table pronostici(id bigint generated always as identity primary key,nickname text,partita_id bigint references partite(id),pronostico text,over_under text,unique(nickname,partita_id));
create view classifica as select p.nickname,sum((p.pronostico=m.risultato_reale)::int+(p.over_under=m.over_under_reale)::int) punti from pronostici p join partite m on m.id=p.partita_id group by p.nickname;
alter table partite enable row level security;alter table pronostici enable row level security;
create policy psel on partite for select using(true);
create policy prsel on pronostici for select using(true);
create policy prin on pronostici for insert with check(true);
create policy prup on pronostici for update using(true);
insert into partite(giornata,casa,trasferta)values
(8,'Cremonese','Atalanta'),(8,'Fiorentina','Bologna'),(8,'Lazio','Juventus'),(8,'Milan','Pisa'),(8,'Napoli','Inter'),(8,'Parma','Como'),(8,'Sassuolo','Roma'),(8,'Torino','Genoa'),(8,'Udinese','Lecce'),(8,'Verona','Cagliari'),
(9,'Atalanta','Milan'),(9,'Bologna','Torino'),(9,'Cagliari','Sassuolo'),(9,'Como','Verona'),(9,'Genoa','Cremonese'),(9,'Inter','Fiorentina'),(9,'Juventus','Udinese'),(9,'Lecce','Napoli'),(9,'Pisa','Lazio'),(9,'Roma','Parma');
