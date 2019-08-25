-- View: audio_view

-- DROP VIEW audio_view;

CREATE OR REPLACE VIEW audio_view AS 
  SELECT audio.id,
    audio.owner,
    audio.access,
    audio.audio_type,
    audio.audio_seq,
    audio.name,
    LENGTH(COALESCE(audio.webm, '')) AS webmlen,
    LENGTH(COALESCE(audio.audio, '')) AS audiolen,
    audio.created,
    audio.updated
  FROM audio
;
