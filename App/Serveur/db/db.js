import knex from "knex";

const db = knex({
	client: "sqlite3",
	connection: {
		filename: "./db/db.sqlite3",
	},
	useNullAsDefault: true,
});

async function createTBL_admin() {
	const exists = await db.schema.hasTable("admin");
	if (!exists) {
		await db.schema.createTable("admin", (table) => {
			table.increments("id_admin").primary();
			table.string("nom").notNullable();
			table.string("prenom").notNullable();
			table.string("courriel").notNullable();
			table.integer("telephone").notNullable();
			table.string("MDP").notNullable();
			table.date("date_creation").notNullable();
		});
		console.log('Table "admin" created successfully.');
	}
}

async function createTBL_utilisateur() {
	const exists = await db.schema.hasTable("utilisateur");
	if (!exists) {
		await db.schema.createTable("utilisateur", (table) => {
			table.increments("id_utilisateur").primary();
			table.string("nom").notNullable();
			table.string("prenom").notNullable();
			table.string("courriel").notNullable();
			table.integer("telephone").notNullable();
			table.string("MDP").notNullable();
			table.date("date_creation").notNullable();
		});
		console.log('Table "utilisateur" created successfully.');
	}
}

async function createTBL_client() {
	const exists = await db.schema.hasTable("client");
	if (!exists) {
		await db.schema.createTable("client", (table) => {
			table.increments("id_client").primary();
			table.string("nom").notNullable();
			table.string("prenom").notNullable();
			table.string("courriel").notNullable();
			table.integer("telephone").notNullable();
			table.string("MDP").notNullable();
			table.date("date_creation").notNullable();
		});
		console.log('Table "client" created successfully.');
	}
}

async function createTBL_dossier() {
	const exists = await db.schema.hasTable("dossier");
	if (!exists) {
		await db.schema.createTable("dossier", (table) => {
			table.increments("id_dossier").primary();
			table
				.integer("id_client")
				.unsigned()
				.references("id_client")
				.inTable("client");
		});
		console.log('Table "dossier" created successfully.');
	}
}

async function createTBL_Type_Demande() {
	const exists = await db.schema.hasTable("type_demande");
	if (!exists) {
		await db.schema.createTable("type_demande", (table) => {
			table.increments("id_demande").primary();
			table.string("Type_Demande").notNullable();
			table
				.integer("id_dossier")
				.unsigned()
				.references("id_dossier")
				.inTable("dossier");
		});
		console.log('Table "type_demande" created successfully.');
	}
}

async function createTBL_Note() {
	const exists = await db.schema.hasTable("note");
	if (!exists) {
		await db.schema.createTable("note", (table) => {
			table.increments("id_note").primary();
			table.string("note").notNullable();
			table
				.integer("id_dossier")
				.unsigned()
				.references("id_dossier")
				.inTable("dossier");
		});
		console.log('Table "note" created successfully.');
	}
}

async function createTBL_Facture() {
	const exists = await db.schema.hasTable("facture");
	if (!exists) {
		await db.schema.createTable("facture", (table) => {
			table.increments("id_facture").primary();
			table.string("description").notNullable();
			table.float("montant").notNullable();
			table.date("date_emission").notNullable();
			table.date("date_echeance").notNullable();
			table.string("statut").notNullable(); 
			table
				.integer("id_dossier")
				.unsigned()
				.references("id_dossier")
				.inTable("dossier");
		});
		console.log('Table "facture" created successfully.');
	}
}

async function createTBL_Documents() {
	const exists = await db.schema.hasTable("documents");
	if (!exists) {
		await db.schema.createTable("documents", (table) => {
			table.increments("id_document").primary();
			table.string("nom_document").notNullable();
			table.string("type_document").notNullable();
			table.binary("contenu").notNullable();
			table
				.integer("id_dossier")
				.unsigned()
				.references("id_dossier")
				.inTable("dossier");
		});
		console.log('Table "documents" created successfully.');
	}
}

async function initializeDatabase() {
	await createTBL_admin();
	await createTBL_utilisateur();
	await createTBL_client();
	await createTBL_dossier();
	await createTBL_Type_Demande();
	await createTBL_Note();
	await createTBL_Facture();
	await createTBL_Documents();
	console.log("All tables created successfully.");
}

initializeDatabase().catch((err) => {
	console.error("Error initializing database:", err.message);
});

export { db, initializeDatabase };