import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;
let isInitialized = false

export const openDB = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('dryforest.db');
    // await resetDB();
    await createTables(db);
    isInitialized = true;
  }

  return db;
};

export const createTables = async (database: SQLite.SQLiteDatabase): Promise<void> => {
  await database.execAsync('PRAGMA foreign_keys = OFF');

  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS sync_meta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mode TEXT NOT NULL,
        last_sync TEXT NOT NULL,
        updated_at TEXT DEFAULT (datetime('now')),
        UNIQUE(mode)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS role (
        id_role INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS site (
        id_site INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS person (
        id_person INTEGER PRIMARY KEY,
        last_name TEXT NOT NULL,
        first_name TEXT NOT NULL,
        id_role INTEGER NOT NULL,
        id_site INTEGER,
        FOREIGN KEY (id_role) REFERENCES role(id_role),
        FOREIGN KEY (id_site) REFERENCES site(id_site)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id_user INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        token TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        id_person INTEGER NOT NULL UNIQUE,
        FOREIGN KEY (id_person) REFERENCES person(id_person)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS species_type (
        id_species_type INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS species (
        id_species INTEGER PRIMARY KEY,
        mg_name TEXT,
        fr_name TEXT,
        en_name TEXT,
        scientific_name TEXT,
        density REAL NOT NULL,
        id_species_type INTEGER NOT NULL,
        FOREIGN KEY (id_species_type) REFERENCES species_type(id_species_type)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS severity (
        id_severity INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    // reforstation
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS type_zone (
        id_type_zone INTEGER PRIMARY KEY,
        name TEXT NOT NULL
        )
      `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS zone (
        uuid_zone TEXT PRIMARY KEY,
        name TEXT,
        area REAL NOT NULL,
        geom TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER NOT NULL DEFAULT 0,
        id_type_zone INTEGER NOT NULL,
        FOREIGN KEY (id_type_zone) REFERENCES type_zone(id_type_zone)
      );
    `);
    
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS zone_need (
        uuid_zone_need TEXT PRIMARY KEY,
        uuid_zone TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER DEFAULT 0,
        FOREIGN KEY (uuid_zone) REFERENCES zone(uuid_zone)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS species_zone_need (
        uuid_species_zone_need TEXT PRIMARY KEY,
        id_species INTEGER,
        uuid_zone_need INTEGER,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER DEFAULT 0,
        FOREIGN KEY (id_species) REFERENCES species(id_species),
        FOREIGN KEY (uuid_zone_need) REFERENCES zone_need(uuid_zone_need)
      );  
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS reforestation (
        uuid_reforestation TEXT PRIMARY KEY,
        date_reforestation TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER NOT NULL DEFAULT 0,
        uuid_zone TEXT NOT NULL,
        FOREIGN KEY (uuid_zone) REFERENCES zone(uuid_zone)
      );
    `);
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS reforestation_detail (
      uuid_reforestation_detail TEXT PRIMARY KEY,
      quantity INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT,
      is_synced INTEGER NOT NULL DEFAULT 0,
      id_species INTEGER NOT NULL,
      uuid_reforestation TEXT NOT NULL,
      FOREIGN KEY (id_species) REFERENCES species(id_species),
      FOREIGN KEY (uuid_reforestation) REFERENCES reforestation(uuid_reforestation)
    );`);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS plantation_block (
        uuid_plantation_block TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        width REAL NOT NULL,
        height REAL NOT NULL,
        nb_sub_plot INTEGER NOT NULL DEFAULT 0,
        geom TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER NOT NULL DEFAULT 0,
        uuid_zone TEXT NOT NULL,
        FOREIGN KEY (uuid_zone) REFERENCES zone(uuid_zone)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS sub_plot (
        uuid_sub_plot TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        width REAL NOT NULL,
        height REAL NOT NULL,
        location TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER NOT NULL DEFAULT 0,
        uuid_plantation_block TEXT NOT NULL,
        FOREIGN KEY (uuid_plantation_block) REFERENCES plantation_block(uuid_plantation_block)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS plantation (
        uuid_plantation TEXT PRIMARY KEY,
        diameter REAL NOT NULL,
        height REAL NOT NULL,
        carbon_sequestered REAL NOT NULL,
        image TEXT,
        date_plantation TEXT NOT NULL,
        plant_number TEXT NOT NULL,
        status INTEGER NOT NULL DEFAULT 1,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER NOT NULL DEFAULT 0,
        id_species INTEGER NOT NULL,
        uuid_sub_plot TEXT NOT NULL,
        uuid_reforestation TEXT NOT NULL,
        FOREIGN KEY (id_species) REFERENCES species(id_species),
        FOREIGN KEY (uuid_sub_plot) REFERENCES sub_plot(uuid_sub_plot),
        FOREIGN KEY (uuid_reforestation) REFERENCES reforestation(uuid_reforestation)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS planting_monitoring (
        uuid_planting_monitoring TEXT PRIMARY KEY,
        diameter REAL NOT NULL,
        height REAL NOT NULL,
        carbon_sequestered REAL NOT NULL,
        image TEXT,
        date_planting_monitoring TEXT NOT NULL,
        auto_generation INTEGER DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER DEFAULT 0,
        uuid_plantation TEXT NOT NULL,
        FOREIGN KEY (uuid_plantation) REFERENCES plantation(uuid_plantation)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS patrol_group (
        id_patrol_group INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS incident_patrol_type (
        id_incident_patrol_type INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS incident_patrol (
        uuid_incident_patrol TEXT PRIMARY KEY,
        datetime_incident TEXT NOT NULL,
        location TEXT,
        description TEXT,
        image TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER NOT NULL DEFAULT 0,
        id_patrol_group INTEGER NOT NULL,
        id_user INTEGER NOT NULL,
        uuid_zone TEXT NOT NULL,
        uuid_plantation_block TEXT NOT NULL,
        id_severity INTEGER NOT NULL,
        id_incident_patrol_type INTEGER NOT NULL,
        FOREIGN KEY (id_patrol_group) REFERENCES patrol_group(id_patrol_group),
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (uuid_zone) REFERENCES zone(uuid_zone),
        FOREIGN KEY (uuid_plantation_block) REFERENCES plantation_block(uuid_plantation_block),
        FOREIGN KEY (id_severity) REFERENCES severity(id_severity),
        FOREIGN KEY (id_incident_patrol_type) REFERENCES incident_patrol_type(id_incident_patrol_type)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS observation_patrol_type (
        id_observation_patrol_type INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS observation_pat (
        uuid_observation_pat TEXT PRIMARY KEY,
        datetime_observation TEXT NOT NULL,
        location TEXT,
        description TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER NOT NULL DEFAULT 0,
        id_observation_patrol_type INTEGER NOT NULL,
        id_patrol_group INTEGER NOT NULL,
        id_user INTEGER NOT NULL,
        uuid_zone TEXT NOT NULL,
        FOREIGN KEY (id_observation_patrol_type) REFERENCES observation_patrol_type(id_observation_patrol_type),
        FOREIGN KEY (id_patrol_group) REFERENCES patrol_group(id_patrol_group),
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (uuid_zone) REFERENCES zone(uuid_zone)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS category_animal (
        id_category_animal INTEGER PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS animal (
        id_animal INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        id_category_animal INTEGER NOT NULL,
        FOREIGN KEY (id_category_animal) REFERENCES category_animal(id_category_animal)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS animal_tracking (
        uuid_animal_tracking TEXT PRIMARY KEY,
        date_tracking TEXT NOT NULL,
        description TEXT,
        location TEXT,
        uuid_plantation_block TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (uuid_plantation_block) REFERENCES plantation_block(uuid_plantation_block)
      );
    `);

    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS animal_tracking_detail (
        uuid_animal_tracking_detail TEXT PRIMARY KEY,
        have_seen INTEGER NOT NULL DEFAULT 0,
        id_animal INTEGER,
        uuid_animal_tracking TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT,
        is_synced INTEGER DEFAULT 0,
        FOREIGN KEY (id_animal) REFERENCES animal(id_animal),
        FOREIGN KEY (uuid_animal_tracking) REFERENCES animal_tracking(uuid_animal_tracking)
      );
    `);

    await database.execAsync(`
      INSERT INTO type_zone (id_type_zone, name) SELECT 1, 'VOI' WHERE NOT EXISTS (SELECT 1 FROM type_zone WHERE id_type_zone = 1);
      INSERT INTO type_zone (id_type_zone, name) SELECT 2, 'Peuple' WHERE NOT EXISTS (SELECT 2 FROM type_zone WHERE id_type_zone = 2);
      INSERT INTO type_zone (id_type_zone, name) SELECT 3, 'Dry Forest' WHERE NOT EXISTS (SELECT 3 FROM type_zone WHERE id_type_zone = 3);
    `);

    await database.execAsync(`
      INSERT INTO species_type(id_species_type, name) SELECT 1, 'autochtone' WHERE NOT EXISTS (SELECT 1 FROM species_type WHERE id_species_type = 1);
      INSERT INTO species_type(id_species_type, name) SELECT 2, 'non-autochtone' WHERE NOT EXISTS (SELECT 2 FROM species_type WHERE id_species_type = 2);
    `);

    await database.execAsync(`
      INSERT INTO species (id_species, mg_name, fr_name, en_name, density, scientific_name, id_species_type) SELECT 1, 'Baobab', 'Baobab de Madagascar', 'Madagascar Baobab', 0.8, 'Adansonia za', 1 WHERE NOT EXISTS (SELECT 1 FROM species WHERE id_species = 1);
      INSERT INTO species (id_species, mg_name, fr_name, en_name, density, scientific_name, id_species_type) SELECT 2, 'Katrafay', 'Katrafay', 'Katrafay', 1.2, 'Cedrelopsis grevei', 1 WHERE NOT EXISTS (SELECT 2 FROM species WHERE id_species = 2);
      INSERT INTO species (id_species, mg_name, fr_name, en_name, density, scientific_name, id_species_type) SELECT 3, 'Hazomalany', 'Bois de rose', 'Rosewood', 1.0, 'Dalbergia baronii', 1 WHERE NOT EXISTS (SELECT 3 FROM species WHERE id_species = 3);
      INSERT INTO species (id_species, mg_name, fr_name, en_name, density, scientific_name, id_species_type) SELECT 4, 'Acacia', 'Acacia', 'Acacia', 1.1, 'Acacia mangium', 2 WHERE NOT EXISTS (SELECT 4 FROM species WHERE id_species = 4);
      INSERT INTO species (id_species, mg_name, fr_name, en_name, density, scientific_name, id_species_type) SELECT 5, 'Eucalyptus', 'Eucalyptus', 'Eucalyptus', 1.3, 'Eucalyptus robusta',2 WHERE NOT EXISTS (SELECT 5 FROM species WHERE id_species = 5);
    `);

    await database.execAsync(`
      INSERT INTO category_animal (id_category_animal, name) SELECT 1, 'Mammifères' WHERE NOT EXISTS (SELECT 1 FROM category_animal WHERE id_category_animal = 1);
      INSERT INTO category_animal (id_category_animal, name) SELECT 2, 'Oiseaux' WHERE NOT EXISTS (SELECT 2 FROM category_animal WHERE id_category_animal = 2);
      INSERT INTO category_animal (id_category_animal, name) SELECT 3, 'Reptiles' WHERE NOT EXISTS (SELECT 3 FROM category_animal WHERE id_category_animal = 3);
    `);

    await database.execAsync(`
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 1, 'Singes', 1 WHERE NOT EXISTS (SELECT 1 FROM animal WHERE id_animal = 1);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 2, 'Souris', 1 WHERE NOT EXISTS (SELECT 2 FROM animal WHERE id_animal = 2);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 3, 'Renard', 1 WHERE NOT EXISTS (SELECT 3 FROM animal WHERE id_animal = 3);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 4, 'Lapin', 1 WHERE NOT EXISTS (SELECT 4 FROM animal WHERE id_animal = 4);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 5, 'Aigles', 2 WHERE NOT EXISTS (SELECT 5 FROM animal WHERE id_animal = 5);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 6, 'Hiboux', 2 WHERE NOT EXISTS (SELECT 6 FROM animal WHERE id_animal = 6);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 7, 'Perroquets', 2 WHERE NOT EXISTS (SELECT 7 FROM animal WHERE id_animal = 7);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 8, 'Agames', 3 WHERE NOT EXISTS (SELECT 8 FROM animal WHERE id_animal = 8);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 9, 'Caméléons', 3 WHERE NOT EXISTS (SELECT 9 FROM animal WHERE id_animal = 9);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 10, 'Serpents des blés', 3 WHERE NOT EXISTS (SELECT 10 FROM animal WHERE id_animal = 10);
      INSERT INTO animal (id_animal, name, id_category_animal) SELECT 11, 'Tortues terrestres', 3 WHERE NOT EXISTS (SELECT 11 FROM animal WHERE id_animal = 11);
    `);

    await database.execAsync(`
      INSERT INTO severity (id_severity, name) SELECT 1, 'Négligeable' WHERE NOT EXISTS (SELECT 1 FROM severity WHERE id_severity = 1);
      INSERT INTO severity (id_severity, name) SELECT 2, 'Modéré' WHERE NOT EXISTS (SELECT 2 FROM severity WHERE id_severity = 2);
      INSERT INTO severity (id_severity, name) SELECT 3, 'Grave' WHERE NOT EXISTS (SELECT 3 FROM severity WHERE id_severity = 3);
      INSERT INTO severity (id_severity, name) SELECT 4, 'Très grave' WHERE NOT EXISTS (SELECT 4 FROM severity WHERE id_severity = 4);
    `);

    await database.execAsync(`
      INSERT INTO patrol_group (id_patrol_group, name) SELECT 1, 'Goupe VOI' WHERE NOT EXISTS (SELECT 1 FROM patrol_group WHERE id_patrol_group = 1);
      INSERT INTO patrol_group (id_patrol_group, name) SELECT 2, 'Goupe DryForest' WHERE NOT EXISTS (SELECT 2 FROM patrol_group WHERE id_patrol_group = 2);
      INSERT INTO patrol_group (id_patrol_group, name) SELECT 3, 'Goupe Fokonolona' WHERE NOT EXISTS (SELECT 3 FROM patrol_group WHERE id_patrol_group = 3);
    `);

    await database.execAsync(`
      INSERT INTO incident_patrol_type (id_incident_patrol_type, name) SELECT 1, 'Incendies' WHERE NOT EXISTS (SELECT 1 FROM incident_patrol_type WHERE id_incident_patrol_type = 1);
      INSERT INTO incident_patrol_type (id_incident_patrol_type, name) SELECT 2, 'Sécheresses' WHERE NOT EXISTS (SELECT 2 FROM incident_patrol_type WHERE id_incident_patrol_type = 2);
      INSERT INTO incident_patrol_type (id_incident_patrol_type, name) SELECT 3, 'Maladies et nuisibles' WHERE NOT EXISTS (SELECT 3 FROM incident_patrol_type WHERE id_incident_patrol_type = 3);
      INSERT INTO incident_patrol_type (id_incident_patrol_type, name) SELECT 4, 'Dégradation des forêts' WHERE NOT EXISTS (SELECT 4 FROM incident_patrol_type WHERE id_incident_patrol_type = 4);
      INSERT INTO incident_patrol_type (id_incident_patrol_type, name) SELECT 4, 'Pollution' WHERE NOT EXISTS (SELECT 4 FROM incident_patrol_type WHERE id_incident_patrol_type = 4);
    `);

    await database.execAsync(`
      INSERT INTO observation_patrol_type (id_observation_patrol_type, name) SELECT 1, 'Activité et santé' WHERE NOT EXISTS (SELECT 1 FROM observation_patrol_type WHERE id_observation_patrol_type = 1);  
      INSERT INTO observation_patrol_type (id_observation_patrol_type, name) SELECT 2, 'État des arbres' WHERE NOT EXISTS (SELECT 2 FROM observation_patrol_type WHERE id_observation_patrol_type = 2);  
      INSERT INTO observation_patrol_type (id_observation_patrol_type, name) SELECT 3, 'Signes de braconnage' WHERE NOT EXISTS (SELECT 3 FROM observation_patrol_type WHERE id_observation_patrol_type = 3);  
    `);

    await database.execAsync(`
      INSERT INTO role (id_role, name) SELECT 1, 'Directeur general' WHERE NOT EXISTS (SELECT 1 FROM role WHERE id_role = 1);  
      INSERT INTO role (id_role, name) SELECT 2, 'Pepineriste general' WHERE NOT EXISTS (SELECT 2 FROM role WHERE id_role = 2);  
      INSERT INTO role (id_role, name) SELECT 3, 'Patrouilleur general' WHERE NOT EXISTS (SELECT 3 FROM role WHERE id_role = 3);  
    `);

    await database.execAsync(`
      INSERT INTO site (id_site, name) SELECT 1, 'Baobase' WHERE NOT EXISTS (SELECT 1 FROM site WHERE id_site = 1);  
      INSERT INTO site (id_site, name) SELECT 2, 'Ambararata' WHERE NOT EXISTS (SELECT 2 FROM site WHERE id_site = 2);
      INSERT INTO site (id_site, name) SELECT 3, 'Marofihitsy' WHERE NOT EXISTS (SELECT 3 FROM site WHERE id_site = 3);
      INSERT INTO site (id_site, name) SELECT 4, 'Ankevo' WHERE NOT EXISTS (SELECT 4 FROM site WHERE id_site = 4);
    `);

    await database.execAsync(`
      INSERT INTO person (id_person, last_name, first_name, id_role, id_site) SELECT 1, 'Voahary', 'Mihaja', 1, 1 WHERE NOT EXISTS (SELECT 1 FROM person WHERE id_person = 1);
      INSERT INTO person (id_person, last_name, first_name, id_role, id_site) SELECT 2, 'Badoda', 'Ltie', 2, 2 WHERE NOT EXISTS (SELECT 2 FROM person WHERE id_person = 2);
      INSERT INTO person (id_person, last_name, first_name, id_role, id_site) SELECT 3, 'Zany', 'Ary', 3, 3 WHERE NOT EXISTS (SELECT 3 FROM person WHERE id_person = 3);
    `);

    await database.execAsync(`
      INSERT OR IGNORE INTO users (id_user, username, token, expires_at, id_person) VALUES (1, 'ADM0001', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBRE0wMDAxIiwiaWF0IjoxNzYxMzM5OTE2LCJleHAiOjE3NjE0MjYzMTZ9.9GyBVsU4SqbmSwYHvz5svincWORIjdoGJeC1awR9wNM', '2025-10-26T00:05:16', 1);
    `);

    console.log('Toutes les tables ont été créées avec succès');
  }
  catch (error) {
    console.error('Erreur lors de la création des tables:', error);
    throw error;
  } 
  finally {
    await database.execAsync('PRAGMA foreign_keys = ON');
  }

};

export const closeDB = async (): Promise<void> => {
  if (db) {
    await db.closeAsync();
    db = null;
    isInitialized = false;
  }
};

export const resetDB = async (): Promise<void> => {
  const database = await openDB();
  let transactionActive = false;
  
  try {
    await database.execAsync('PRAGMA foreign_keys = OFF');
    await database.execAsync('BEGIN TRANSACTION');
    transactionActive = true;

    const tables = [
      'role','site','person','users',
      'species_type','species','severity',
      'type_zone','zone','zone_need',
      'reforestation','reforestation_detail',
      'plantation_block','sub_plot','plantation',
      'planting_monitoring','patrol_group',
      'incident_patrol_type','incident_patrol',
      'observation_patrol_type','observation_pat',
      'category_animal','animal',
      'animal_tracking','animal_tracking_detail'
    ];

    for (const table of tables) {
      await database.execAsync(`DROP TABLE IF EXISTS ${table}`);
    }

    await database.execAsync('COMMIT TRANSACTION');

    transactionActive = false;
    isInitialized = false;
    
    console.log('Base de données réinitialisée avec succès');
  } catch (error) {
    if (transactionActive) {
      await database.execAsync('ROLLBACK TRANSACTION');
    }
    console.error('Erreur lors de la réinitialisation:', error);
    throw error;
  } finally {
    await database.execAsync('PRAGMA foreign_keys = ON');
  }
};

export const getDBStatus = (): { isOpen: boolean; isInitialized: boolean } => {
  return {
    isOpen: db !== null,
    isInitialized
  };
};
