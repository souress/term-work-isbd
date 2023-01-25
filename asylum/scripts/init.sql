-- TABLES

-- CREATE TYPE med_type AS ENUM('HARD', 'SOFT', 'LIQUID', 'GAS');

CREATE TABLE "medicine"
(
    "id"          serial    PRIMARY KEY,
    "name"        varchar   NOT NULL,
    "med_type"    varchar   NOT NULL,
    "action_type" varchar   NOT NULL,
    "country"     varchar   NOT NULL
);

CREATE TABLE "supplier"
(
    "id"      serial    PRIMARY KEY,
    "name"    varchar   NOT NULL,
    "address" varchar   NOT NULL,
    "email"   varchar   NOT NULL
);

CREATE TABLE "med_storage"
(
    "id"          serial    PRIMARY KEY,
    "medicine_id" int       REFERENCES "medicine" ("id") ON DELETE CASCADE,
    "supplier_id" int       REFERENCES "supplier" ("id") ON DELETE CASCADE,
    "quantity"    int       NOT NULL CHECK ("quantity" >= 0)
);

CREATE TABLE "treatment_program"
(
    "id"          serial    PRIMARY KEY,
    "diagnosis"   varchar   NOT NULL,
    "medicine_id" int       REFERENCES "medicine" ("id") ON DELETE CASCADE
);

-- CREATE TYPE product_type AS ENUM('MEAT', 'FISH', 'DAIRY', 'GROCERY', 'VEGETABLE', 'FRUIT', 'DRINK', 'OTHER');

CREATE TABLE "product"
(
    "id"              serial        PRIMARY KEY,
    "name"            varchar       NOT NULL,
    "calories"        int           NOT NULL CHECK ("calories" >= 0),
    "product_type"    varchar       NOT NULL
);

CREATE TABLE "diet"
(
    "product_id"           int REFERENCES "product" ("id") ON DELETE CASCADE,
    "treatment_program_id" int REFERENCES "treatment_program" ("id") ON DELETE CASCADE
);

-- CREATE TYPE person_role AS ENUM('DOCTOR', 'CONCERT_MODERATOR', 'PATIENT');

CREATE TABLE "person"
(
    "id"        serial      PRIMARY KEY,
    "full_name" varchar     NOT NULL,
    "role"      varchar     NOT NULL,
    "balance"   int         NOT NULL CHECK ("balance" >= 0)
);

-- CREATE TYPE room_type AS ENUM('HOSPITAL_CHAMBER', 'CAFETERIA', 'DOCTORS_OFFICE');

CREATE TABLE "room"
(
    "id"            serial      PRIMARY KEY,
    "room_type"     varchar     NOT NULL
);

CREATE TABLE "log"
(
    "id"                   serial       PRIMARY KEY,
    "person_id"            int          REFERENCES "person" ("id"),
    "treatment_program_id" int          REFERENCES "treatment_program" ("id"),
    "room_id"              int          REFERENCES "room" ("id"),
    "treatment_begin_date" timestamp    NOT NULL,
    "treatment_end_date"   timestamp    NOT NULL
);

CREATE TABLE "label"
(
    "id"   serial   PRIMARY KEY,
    "name" varchar  NOT NULL
);

CREATE TABLE "artist"
(
    "id"       serial   PRIMARY KEY,
    "name"     varchar  NOT NULL,
    "label_id" int      REFERENCES "label" ("id")
);

CREATE TABLE "schedule"
(
    "id"             serial     PRIMARY KEY,
    "artist_id"      int        REFERENCES "artist" ("id"),
    "place_id"       int        REFERENCES "room" ("id"),
    "price"          int        NOT NULL CHECK ("price" >= 0),
    "begin_datetime" timestamp  NOT NULL,
    "duration"       int        NOT NULL CHECK ("duration" >= 0)
);

CREATE TABLE "personal_schedule"
(
    "person_id"   int REFERENCES "person" ("id"),
    "schedule_id" int REFERENCES "schedule" ("id")
);

-- CREATE TYPE user_role AS ENUM('DOCTOR', 'CONCERT_MODERATOR', 'PATIENT');

CREATE TABLE "user"
(
    "id"        serial      PRIMARY KEY,
    "login"     varchar     NOT NULL CHECK (char_length("login") >= 5 AND char_length("login") <= 15),
    "password"  varchar     NOT NULL,
    "role"      varchar     NOT NULL
);

-- FUNCTIONS

CREATE OR REPLACE FUNCTION get_balance_by_person_id(p_id int)
    returns INT as
$$
begin
    return (select balance
            from person
            where person.id = p_id);
end;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION get_treatment_program_id_by_person_id(p_id int)
    returns INT as
$$
begin
    return (select treatment_program_id
            from "log"
            where "log".person_id = p_id);
end;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION get_diet_by_person_id(p_id int)
    returns INT[] as
$$
declare
    treatment_id int := 0;
begin
    select treatment_program_id
    into treatment_id
    from "log"
    where "log".person_id = p_id;
    return array(select product_id from diet where diet.treatment_program_id = treatment_id);
end;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION get_schedule_ids_by_person_id(p_id int)
    returns INT[] as
$$
begin
    return array(select schedule_id from personal_schedule where personal_schedule.person_id = p_id);
end;
$$ language 'plpgsql';

CREATE OR REPLACE PROCEDURE buy_ticket(p_id int, sch_id int)
as
$$
declare
    p_balance int := 0;
    t_price   int := 0;
begin
    select balance
    into p_balance
    from person
    where person.id = p_id;
    select price
    into t_price
    from schedule
    where schedule.id = sch_id;
    if (p_balance >= t_price) then
        p_balance = reduce_balance_by_person_id(p_id, t_price);
        insert into personal_schedule values (p_id, sch_id);
    end if;
end;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION reduce_balance_by_person_id(p_id int, amount int)
    returns INT as
$$
declare
    person_balance_after int := 0;
begin
    update person
    set balance = balance - amount
    where person.id = p_id;
    select balance
    into person_balance_after
    from person
    where person.id = p_id;
    return person_balance_after;
end;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION extend_balance_by_person_id(p_id int, amount int)
    returns INT as
$$
declare
    person_balance_after int := 0;
begin
    update person
    set balance = balance + amount
    where person.id = p_id;
    select balance
    into person_balance_after
    from person
    where person.id = p_id;
    return person_balance_after;
end;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION get_schedule_ids_from_now()
    returns INT[] as
$$
begin
    return array(select "id" from schedule s where DATE(s.begin_datetime) > DATE(now()));
end;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION get_schedule_ids_from_date(tmstmp timestamp)
    returns INT[] as
$$
begin
    return array(select "id" from schedule s where DATE(s.begin_datetime) > DATE(tmstmp));
end;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION get_schedule_ids_for_today()
    returns INT[] as
$$
begin
    return array(select "id" from schedule s where DATE(s.begin_datetime) = DATE(now()));
end;
$$ language 'plpgsql';


-- TRIGGERS

CREATE OR REPLACE FUNCTION add_medicine_in_storage()
    RETURNS TRIGGER AS
$$
begin
    INSERT INTO med_storage(medicine_id, supplier_id, quantity)
    VALUES (new.id, null, 0);
    RETURN NEW;
end;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER push_medicine_to_storage
    AFTER INSERT
    ON medicine
    FOR EACH ROW
EXECUTE PROCEDURE add_medicine_in_storage();


-- INDEXES

CREATE INDEX log_hash_index ON "log" USING
    hash ("person_id");

CREATE INDEX schedule_index ON schedule USING
    hash ("id");

CREATE INDEX schedule_artist_index ON schedule USING
    hash ("artist_id");

CREATE INDEX log_btree_index ON "log" USING
    btree ("treatment_begin_date", "treatment_end_date");
