DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'go_next_api') THEN
    SET TIME ZONE 'Asia/Tokyo';
    CREATE DATABASE go_next_api;
  END IF;
END $$;