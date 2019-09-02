-- View: visual_view

-- DROP VIEW visual_view;

CREATE OR REPLACE VIEW visual_view AS 
  SELECT visual.id,
    visual.mediaset_id,
    visual.owner,
    visual.access,
    visual.visual_type,
    visual.visual_seq,
    visual.orientation,
    visual.name,
    LENGTH(COALESCE(visual.image, '')) AS imagelen,
    visual.content_type,
    visual.created,
    visual.updated
  FROM visual
;
