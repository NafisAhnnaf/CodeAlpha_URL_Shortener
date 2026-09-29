CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    url TEXT UNIQUE, 
    created_at TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),
    expires_at TIMESTAMP
);


CREATE OR REPLACE FUNCTION expire_url()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expires_at <= CURRENT_TIMESTAMP THEN
        DELETE FROM urls WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER expire_url_trig
AFTER INSERT ON urls
FOR EACH ROW EXECUTE FUNCTION expire_url(); 


CREATE OR REPLACE FUNCTION insert_url(p_url TEXT, p_expires_in INTEGER)
RETURNS urls AS $$
DECLARE
    entry urls%ROWTYPE;
    expiry TIMESTAMP;
BEGIN
    expiry := NOW()+ ( p_expires_in * INTERVAL '1 hour');
    INSERT INTO urls(url, expires_at) VALUES(p_url, expiry)
    ON CONFLICT (url) 
    DO UPDATE SET url = EXCLUDED.url
    RETURNING * INTO entry;
    RETURN entry; 
END;
$$ LANGUAGE plpgsql;
