-- View: audio_view

-- DROP VIEW audio_view;

CREATE OR REPLACE VIEW audio_view AS 
  SELECT audio.id,
    audio.owner,
    audio.access,
    audio.type,
    audio.name,
    length(audio.webm) AS webmlen,
    length(audio.audio) AS audiolen,
    audio.created,
    audio.updated
  FROM audio
;
