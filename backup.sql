PGDMP                         w           wifi_experience    9.6.11    11.1     [           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            \           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            ]           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            ^           1262    16385    wifi_experience    DATABASE     �   CREATE DATABASE wifi_experience WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE wifi_experience;
             postgres    false            _           0    0    DATABASE wifi_experience    ACL     /   GRANT ALL ON DATABASE wifi_experience TO node;
                  postgres    false    2142                        2615    16386    wifi_experience    SCHEMA        CREATE SCHEMA wifi_experience;
    DROP SCHEMA wifi_experience;
             node    false            �            1255    16414    notify_event()    FUNCTION     }  CREATE FUNCTION public.notify_event() RETURNS trigger
    LANGUAGE plpgsql
    AS $$    DECLARE 
        data json;
        notification json;
    
    BEGIN
        -- Contruct the notification as a JSON string.
        notification = json_build_object(
                          'table',TG_TABLE_NAME,
                          'action', TG_OP,
                          'data', data);
        
                        
        -- Execute pg_notify(channel, notification)
        PERFORM pg_notify('live_update',notification::text);
        
        -- Result is ignored since this is an AFTER trigger
		RETURN data;
    END;
    
$$;
 %   DROP FUNCTION public.notify_event();
       public       postgres    false            �            1259    16387    ssid    TABLE     �   CREATE TABLE wifi_experience.ssid (
    "ID" integer NOT NULL,
    ssid jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
 !   DROP TABLE wifi_experience.ssid;
       wifi_experience         node    false    5            �            1259    16417    realtime_view    VIEW     �  CREATE VIEW public.realtime_view AS
 WITH devices AS (
         SELECT (ssid.ssid -> 'mac'::text) AS mac,
            ssid.created_at,
            (ssid.ssid -> 'ssid'::text) AS wireless
           FROM wifi_experience.ssid
        )
 SELECT DISTINCT ON (devices.mac) devices.mac,
    devices.created_at,
    devices.wireless
   FROM devices
  ORDER BY devices.mac, devices.created_at DESC, devices.wireless;
     DROP VIEW public.realtime_view;
       public       postgres    false    186    186            �            1259    16393    ssid_ID_seq    SEQUENCE        CREATE SEQUENCE wifi_experience."ssid_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE wifi_experience."ssid_ID_seq";
       wifi_experience       node    false    5    186            `           0    0    ssid_ID_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE wifi_experience."ssid_ID_seq" OWNED BY wifi_experience.ssid."ID";
            wifi_experience       node    false    187            �           2604    16395    ssid ID    DEFAULT     x   ALTER TABLE ONLY wifi_experience.ssid ALTER COLUMN "ID" SET DEFAULT nextval('wifi_experience."ssid_ID_seq"'::regclass);
 A   ALTER TABLE wifi_experience.ssid ALTER COLUMN "ID" DROP DEFAULT;
       wifi_experience       node    false    187    186            �           2606    16403    ssid ssid_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY wifi_experience.ssid
    ADD CONSTRAINT ssid_pkey PRIMARY KEY ("ID");
 A   ALTER TABLE ONLY wifi_experience.ssid DROP CONSTRAINT ssid_pkey;
       wifi_experience         node    false    186            �           2620    16415    ssid live_notify_event    TRIGGER     �   CREATE TRIGGER live_notify_event AFTER INSERT OR UPDATE ON wifi_experience.ssid FOR EACH STATEMENT EXECUTE PROCEDURE public.notify_event();
 8   DROP TRIGGER live_notify_event ON wifi_experience.ssid;
       wifi_experience       node    false    186    189           