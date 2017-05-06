-- View: image_view

-- DROP VIEW image_view;

CREATE OR REPLACE VIEW image_view AS 
  SELECT image.id,
    image.owner,
    image.access,
    image.type,
    image.name,
    image.description,
    LENGTH(COALESCE(image.image, '')) AS imagelen,
    image.content_type,
    image.created,
    image.updated
  FROM image
;
