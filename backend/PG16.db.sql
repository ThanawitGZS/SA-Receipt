BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "ranks" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"discount"	real,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "genders" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "positions" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "employees" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"first_name"	text,
	"last_name"	text,
	"email"	text,
	"password"	text,
	"profile"	longtext,
	"gender_id"	integer,
	"position_id"	integer,
	CONSTRAINT "fk_positions_employees" FOREIGN KEY("position_id") REFERENCES "positions"("id"),
	CONSTRAINT "fk_genders_employees" FOREIGN KEY("gender_id") REFERENCES "genders"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "members" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"first_name"	text,
	"last_name"	text,
	"phone_number"	text,
	"rank_id"	integer,
	"employee_id"	integer,
	CONSTRAINT "fk_employees_members" FOREIGN KEY("employee_id") REFERENCES "employees"("id"),
	CONSTRAINT "fk_ranks_members" FOREIGN KEY("rank_id") REFERENCES "ranks"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "coupons" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"code"	text,
	"discount_coupon"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "packages" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"price"	integer,
	"point"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "table_statuses" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"status"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "tables" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"table_type"	text,
	"price"	integer,
	"table_status_id"	integer,
	CONSTRAINT "fk_table_statuses_tables" FOREIGN KEY("table_status_id") REFERENCES "table_statuses"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "bookings" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"number_of_customer"	integer,
	"package_id"	integer,
	"table_id"	integer,
	"member_id"	integer,
	"employee_id"	integer,
	CONSTRAINT "fk_bookings_package" FOREIGN KEY("package_id") REFERENCES "packages"("id"),
	CONSTRAINT "fk_bookings_table" FOREIGN KEY("table_id") REFERENCES "tables"("id"),
	CONSTRAINT "fk_bookings_employee" FOREIGN KEY("employee_id") REFERENCES "employees"("id"),
	CONSTRAINT "fk_bookings_member" FOREIGN KEY("member_id") REFERENCES "members"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "receipts" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"date"	datetime,
	"totalprice"	real,
	"coupon_id"	integer,
	"employee_id"	integer,
	"member_id"	integer,
	"booking_id"	integer,
	CONSTRAINT "fk_receipts_employee" FOREIGN KEY("employee_id") REFERENCES "employees"("id"),
	CONSTRAINT "fk_receipts_member" FOREIGN KEY("member_id") REFERENCES "members"("id"),
	CONSTRAINT "fk_bookings_receipt" FOREIGN KEY("booking_id") REFERENCES "bookings"("id"),
	CONSTRAINT "fk_coupons_receipt" FOREIGN KEY("coupon_id") REFERENCES "coupons"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "booking_soups" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"booking_id"	integer,
	"soup_id"	integer,
	"quantity"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "soups" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"name"	text,
	"price"	integer,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_ranks_deleted_at" ON "ranks" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_genders_deleted_at" ON "genders" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_positions_deleted_at" ON "positions" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_employees_deleted_at" ON "employees" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_members_deleted_at" ON "members" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_coupons_deleted_at" ON "coupons" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_packages_deleted_at" ON "packages" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_table_statuses_deleted_at" ON "table_statuses" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_tables_deleted_at" ON "tables" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_bookings_deleted_at" ON "bookings" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_receipts_deleted_at" ON "receipts" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_booking_soups_deleted_at" ON "booking_soups" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_soups_deleted_at" ON "soups" (
	"deleted_at"
);
COMMIT;
